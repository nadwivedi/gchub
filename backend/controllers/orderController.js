const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const GiftCardListing = require('../models/GiftCardListing');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, addressId, customerNotes, paymentMethod = 'cod', userId } = req.body;

    // For logged-in users, get customer info from user data
    let customerInfo = {};
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      customerInfo = {
        name: user.fullName,
        email: user.email,
        phone: user.phone
      };
    } else {
      return res.status(401).json({
        success: false,
        message: 'User must be logged in to create an order'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one item is required'
      });
    }

    // Handle address - get from user's saved addresses
    let finalShippingAddress = shippingAddress;
    
    if (addressId) {
      // User is using a saved address (user is already fetched above)
      const selectedAddress = user.addresses.find(addr => addr._id.toString() === addressId);
      if (!selectedAddress) {
        return res.status(404).json({
          success: false,
          message: 'Selected address not found'
        });
      }
      
      // Convert user address to order format
      finalShippingAddress = {
        fullAddress: `${selectedAddress.addressLine1}, ${selectedAddress.addressLine2 ? selectedAddress.addressLine2 + ', ' : ''}${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postalCode}`,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.postalCode
      };
      
      if (!customerInfo.phone && selectedAddress.phone) {
        customerInfo.phone = selectedAddress.phone;
      }
    }
    
    // For digital products, use provided address or fall back to a placeholder
    if (!finalShippingAddress || !finalShippingAddress.fullAddress) {
      finalShippingAddress = {
        fullAddress: 'Digital Delivery',
        city: 'Digital',
        state: 'Digital',
        pincode: '000000'
      };
    }

    // Validate and process items
    let totalAmount = 0;
    let totalItems = 0;
    const processedItems = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have a valid productId and quantity'
        });
      }

      let subtotal = 0;
      let processedItem = null;

      if (String(item.productId).match(/^[0-9a-fA-F]{24}$/)) {
        // Fetch product details for database items
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product with ID ${item.productId} not found`
          });
        }

        // Check stock availability
        if (product.stockQuantity < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}, Requested: ${item.quantity}`
          });
        }

        subtotal = product.price * item.quantity;
        processedItem = {
          productId: product._id.toString(),
          productName: product.name || product.seoTitle,
          productBrand: product.brand || 'Unknown',
          productImage: product.images?.[0] || product.imageUrl || '',
          productPrice: product.price,
          originalPrice: product.originalPrice || product.price,
          quantity: item.quantity,
          subtotal: subtotal
        };
      } else {
        // Trust frontend data for hardcoded items (like google play vouchers)
        subtotal = (item.price || item.productPrice || 0) * item.quantity;
        processedItem = {
          productId: item.productId,
          productName: item.name || item.productName || item.productId,
          productBrand: item.brand || item.productBrand || 'Digital Goods',
          productImage: item.imageUrl || item.productImage || '',
          productPrice: item.price || item.productPrice || 0,
          originalPrice: item.originalPrice || item.price || item.productPrice || 0,
          quantity: item.quantity,
          subtotal: subtotal
        };
      }

      totalAmount += subtotal;
      totalItems += item.quantity;
      processedItems.push(processedItem);
    }

    // Create order
    const newOrder = new Order({
      customerInfo,
      items: processedItems,
      totalAmount,
      totalItems,
      shippingAddress: finalShippingAddress,
      customerNotes: customerNotes || '',
      paymentMethod,
      userId: userId || null,
      status: paymentMethod === 'online' ? 'pending' : 'confirmed',
      paymentStatus: 'pending'
    });

    const savedOrder = await newOrder.save();

    // Update product stock quantities
    for (const item of processedItems) {
      if (item.productId.match(/^[0-9a-fA-F]{24}$/)) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stockQuantity: -item.quantity } },
          { new: true }
        );
      }
    }

    let razorpayOrder = null;
    if (paymentMethod === 'online') {
      const amountInPaise = Math.round(totalAmount * 100);
      if (amountInPaise < 100) {
        // Restore stock
        for (const item of processedItems) {
          if (item.productId.match(/^[0-9a-fA-F]{24}$/)) {
            await Product.findByIdAndUpdate(
              item.productId,
              { $inc: { stockQuantity: item.quantity } }
            );
          }
        }
        await Order.findByIdAndDelete(savedOrder._id);
        return res.status(400).json({
          success: false,
          message: 'Amount must be at least ₹1 (100 paise)'
        });
      }

      try {
        razorpayOrder = await razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: savedOrder._id.toString()
        });
        savedOrder.razorpayOrderId = razorpayOrder.id;
        await savedOrder.save();
      } catch (rzpErr) {
        console.error('Razorpay order creation error:', rzpErr);
        // Restore stock
        for (const item of processedItems) {
          if (item.productId.match(/^[0-9a-fA-F]{24}$/)) {
            await Product.findByIdAndUpdate(
              item.productId,
              { $inc: { stockQuantity: item.quantity } }
            );
          }
        }
        await Order.findByIdAndDelete(savedOrder._id);
        return res.status(500).json({
          success: false,
          message: 'Failed to initiate online payment with Razorpay',
          error: rzpErr.message
        });
      }
    }



    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: savedOrder._id,
        totalAmount: savedOrder.totalAmount,
        status: savedOrder.status,
        estimatedDelivery: savedOrder.estimatedDelivery,
        razorpayOrderId: razorpayOrder ? razorpayOrder.id : null,
        razorpayKeyId: razorpayOrder ? process.env.RAZORPAY_KEY_ID : null
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const { identifier, orderId } = req.params; // Order ID - can come from either parameter
    const id = identifier || orderId;

    let order;

    // Check if id is a valid ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// Get orders by customer email
const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ 'customerInfo.email': email })
      .sort({ orderDate: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Error fetching orders by email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
      });
    }

    const updateData = { status };
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }
    if (status === 'delivered') {
      updateData.deliveryDate = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      startDate, 
      endDate,
      sortBy = 'orderDate',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.orderDate = {};
      if (startDate) {
        query.orderDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.orderDate.$lte = new Date(endDate);
      }
    }

    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortDirection };

    const orders = await Order.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};



// Verify payment signature
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields for signature verification'
      });
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      order.paymentStatus = 'paid';
      order.status = 'confirmed';
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;

      // Assign gift card redeem codes for digital gift card items
      const giftCodes = [];
      for (const item of order.items) {
        // Detect gift card items by productId pattern (e.g. 'google-play-10')
        if (!String(item.productId).match(/^[0-9a-fA-F]{24}$/)) {
          // Parse brand and balance from productId like 'google-play-10'
          const parts = item.productId.split('-');
          const balance = parseFloat(parts[parts.length - 1]);
          // Build brand name: e.g. 'google-play' -> 'Google Play'
          const brandSlug = parts.slice(0, parts.length - 1).join(' ');
          const brandName = brandSlug
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

          // Find an available admin-listed gift card for this brand & balance
          const availableListing = await GiftCardListing.findOne({
            brand: brandName,
            balance: balance,
            status: 'active',
            listedBy: 'admin'
          });

          if (availableListing) {
            // Mark as sold
            availableListing.status = 'sold';
            await availableListing.save();

            giftCodes.push({
              productId: item.productId,
              brand: availableListing.brand,
              code: availableListing.code,
              pin: availableListing.pin || null,
              balance: availableListing.balance,
              listingId: availableListing._id
            });
          }
        }
      }

      if (giftCodes.length > 0) {
        order.giftCodes = giftCodes;
      }

      await order.save();



      return res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'failed';
        await order.save();
      }
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Signature mismatch'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getOrdersByEmail,
  updateOrderStatus,
  getAllOrders,
  verifyPayment
};
