const nodemailer = require('nodemailer');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: String(process.env.EMAIL_PORT) === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Helper to determine brand icon / tag
const getBrandColor = (brand) => {
  const b = (brand || '').toLowerCase();
  if (b.includes('google') || b.includes('play')) return { bg: '#01875f', light: '#ecfdf5', text: '#065f46', border: '#a7f3d0' };
  if (b.includes('amazon')) return { bg: '#ff9900', light: '#fffbeb', text: '#92400e', border: '#fde68a' };
  if (b.includes('flipkart')) return { bg: '#2874f0', light: '#eff6ff', text: '#1e40af', border: '#bfdbfe' };
  if (b.includes('steam')) return { bg: '#171a21', light: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
  if (b.includes('myntra')) return { bg: '#ff3f6c', light: '#fdf2f8', text: '#9d174d', border: '#fbcfe8' };
  return { bg: '#f59e0b', light: '#fffbeb', text: '#92400e', border: '#fde68a' };
};

/**
 * Send Voucher Delivery Email to the user who signed in / recipient
 * @param {Object} params
 * @param {Object} params.order - The order document
 * @param {Array} params.giftCodes - The list of gift codes to deliver
 * @param {Boolean} [params.isManualAssignment=false] - Whether triggered by admin manual assign
 * @param {String} [params.customNote] - Optional note to include
 */
const sendVoucherDeliveryEmail = async ({ order, giftCodes, isManualAssignment = false, customNote = '' }) => {
  try {
    if (!order) {
      console.warn('sendVoucherDeliveryEmail called without order object');
      return { success: false, message: 'Order not provided' };
    }

    const codes = giftCodes && giftCodes.length > 0 ? giftCodes : (order.giftCodes || []);
    if (!codes || codes.length === 0) {
      console.warn('sendVoucherDeliveryEmail called with no gift codes to send');
      return { success: false, message: 'No gift codes to send' };
    }

    // Resolve user's registered email and name
    let signedInUserEmail = '';
    let signedInUserName = '';
    if (order.userId) {
      try {
        const user = await User.findById(order.userId);
        if (user) {
          signedInUserEmail = user.email;
          signedInUserName = user.fullName;
        }
      } catch (err) {
        console.error('Error fetching user for email delivery:', err);
      }
    }

    // Determine primary recipient email
    const recipientEmail = (order.recipientInfo && order.recipientInfo.email)
      ? order.recipientInfo.email
      : (order.customerInfo && order.customerInfo.email ? order.customerInfo.email : signedInUserEmail);

    const recipientName = (order.recipientInfo && order.recipientInfo.name)
      ? order.recipientInfo.name
      : (order.customerInfo && order.customerInfo.name ? order.customerInfo.name : (signedInUserName || 'Valued Customer'));

    if (!recipientEmail) {
      console.error(`Cannot send voucher email: No recipient email found for order ${order._id}`);
      return { success: false, message: 'No recipient email found' };
    }

    // CC the signed-in user if different from recipient (e.g. gifted order)
    const ccEmails = [];
    if (signedInUserEmail && signedInUserEmail.toLowerCase() !== recipientEmail.toLowerCase()) {
      ccEmails.push(signedInUserEmail);
    }
    if (order.customerInfo?.email && order.customerInfo.email.toLowerCase() !== recipientEmail.toLowerCase() && !ccEmails.includes(order.customerInfo.email)) {
      ccEmails.push(order.customerInfo.email);
    }

    const frontendUrl = process.env.FRONTEND_URL || 'https://gchub.in';
    const logoUrl = `${frontendUrl}/favicon.png`;
    const orderViewUrl = `${frontendUrl}/order/${order._id}`;
    const orderFormattedId = `#${order._id.toString().slice(-8).toUpperCase()}`;

    // Build codes HTML blocks
    let codesHtml = '';
    let hasGooglePlay = false;

    codes.forEach((item, index) => {
      const brand = item.brand || 'Digital Voucher';
      const balance = item.balance ? `₹${item.balance}` : '';
      const codeValue = item.code || '';
      const pinValue = item.pin || '';
      const isPlay = brand.toLowerCase().includes('google') || brand.toLowerCase().includes('play');
      if (isPlay) hasGooglePlay = true;
      const brandColors = getBrandColor(brand);

      const googlePlayRedeemUrl = `https://play.google.com/redeem?code=${encodeURIComponent(codeValue.trim())}`;

      codesHtml += `
        <div style="margin-bottom: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
          <!-- Voucher Card Header -->
          <div style="background: ${brandColors.light}; padding: 14px 20px; border-bottom: 1px solid ${brandColors.border}; display: flex; align-items: center; justify-content: space-between;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="text-align: left;">
                  <strong style="font-size: 16px; color: ${brandColors.text}; font-weight: 700;">${brand}</strong>
                </td>
                <td style="text-align: right;">
                  ${balance ? `<span style="display: inline-block; background: #ffffff; color: #0f172a; font-weight: 700; font-size: 14px; padding: 4px 12px; border-radius: 20px; border: 1px solid ${brandColors.border};">Balance: ${balance}</span>` : ''}
                </td>
              </tr>
            </table>
          </div>

          <!-- Code Box -->
          <div style="padding: 20px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 1px;">Digital Redeem Code</p>
            
            <div style="background: #fffdf5; border: 2px dashed #f59e0b; border-radius: 10px; padding: 16px 12px; margin: 0 auto 12px auto; max-width: 480px;">
              <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: 2.5px; word-break: break-all; -webkit-user-select: all; -moz-user-select: all; -ms-user-select: all; user-select: all;">
                ${codeValue}
              </div>
            </div>

            <p style="margin: 0 0 14px 0; font-size: 11px; color: #94a3b8;">
              💡 <em>Tap & hold or double-click code to copy</em>
            </p>

            ${pinValue ? `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 16px; display: inline-block; margin-bottom: 14px;">
                <span style="font-size: 12px; color: #64748b; font-weight: 600;">PIN: </span>
                <strong style="font-family: monospace; font-size: 15px; color: #0f172a; letter-spacing: 2px; -webkit-user-select: all; user-select: all;">${pinValue}</strong>
              </div>
            ` : ''}

            <!-- Action Buttons for this code -->
            <div style="margin-top: 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    ${isPlay ? `
                      <a href="${googlePlayRedeemUrl}" target="_blank" style="display: inline-block; background: #01875f; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 4px; box-shadow: 0 2px 4px rgba(1, 135, 95, 0.25);">
                        ▶️ Redeem on Google Play
                      </a>
                    ` : ''}
                    <a href="${orderViewUrl}" target="_blank" style="display: inline-block; background: #f1f5f9; color: #0f172a; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; margin: 4px; border: 1px solid #cbd5e1;">
                      📋 View & 1-Click Copy in GCHub
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      `;
    });

    const emailSubject = isManualAssignment
      ? `🎉 Your Gift Card Code is Ready! Order ${orderFormattedId} - GCHub`
      : `🎉 Your Digital Voucher Codes - Order ${orderFormattedId} - GCHub`;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailSubject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9; padding: 30px 10px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
                    <img src="${logoUrl}" alt="GCHub" style="width: 54px; height: 54px; border-radius: 12px; margin-bottom: 12px; border: 2px solid #f59e0b;" onerror="this.style.display='none'" />
                    <h1 style="margin: 0 0 6px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">GCHub Digital Delivery</h1>
                    <p style="margin: 0; color: #f59e0b; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Order ${orderFormattedId} • Instant Delivery</p>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 30px 24px;">
                    <p style="margin: 0 0 14px 0; font-size: 16px; line-height: 1.5; color: #0f172a;">
                      Hello <strong>${recipientName}</strong>,
                    </p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                      Thank you for your purchase from <strong>GCHub</strong>! Your digital voucher code${codes.length > 1 ? 's are' : ' is'} ready. You can easily copy your code below or redeem it directly.
                    </p>

                    ${customNote ? `
                      <div style="margin-bottom: 20px; padding: 14px 18px; border-radius: 10px; background: #eff6ff; border-left: 4px solid #3b82f6; font-size: 13px; color: #1e40af;">
                        <strong>Note from GCHub:</strong> ${customNote}
                      </div>
                    ` : ''}

                    <!-- Codes Section -->
                    ${codesHtml}

                    <!-- How to Redeem Guide -->
                    <div style="background: #f8fafc; border-radius: 12px; padding: 18px 20px; margin-top: 20px; border: 1px solid #e2e8f0;">
                      <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                        📖 Quick Redemption Guide:
                      </h4>
                      <ol style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.7; color: #475569;">
                        <li><strong>Copy Code:</strong> Tap and hold the code above, or click the <em>View & 1-Click Copy</em> button.</li>
                        ${hasGooglePlay ? `<li><strong>Google Play Store:</strong> Open Play Store &gt; Profile Icon &gt; <em>Payments & subscriptions</em> &gt; <em>Redeem code</em>.</li>` : ''}
                        <li><strong>Paste & Confirm:</strong> Paste your code and confirm to add balance to your account immediately.</li>
                      </ol>
                    </div>

                    <!-- Direct Order Access Button -->
                    <div style="margin-top: 26px; text-align: center;">
                      <a href="${orderViewUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">
                        🛍️ View Full Order Details on GCHub
                      </a>
                    </div>

                    <!-- Support Section -->
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                      <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;">Need help or have an issue with your code?</p>
                      <a href="${frontendUrl}/customer-support" style="color: #d97706; text-decoration: none; font-weight: 600; font-size: 13px;">
                        Contact Customer Support &rarr;
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #0f172a; padding: 22px 20px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                    <p style="margin: 0 0 6px 0; color: #f8fafc; font-weight: 600;">GCHub — Instant Digital Vouchers & Gift Cards</p>
                    <p style="margin: 0 0 4px 0;">This email was sent to <strong>${recipientEmail}</strong></p>
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} GCHub. All rights reserved.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"GCHub" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml
    };

    if (ccEmails.length > 0) {
      mailOptions.cc = ccEmails;
    }

    console.log(`\n======================================================`);
    console.log(`📧 [EMAIL SERVICE] Sending Voucher Delivery Email...`);
    console.log(`   📦 Order ID     : #${orderFormattedId} (${order._id})`);
    console.log(`   👤 Recipient    : ${recipientName} <${recipientEmail}>`);
    if (ccEmails.length > 0) {
      console.log(`   👥 CC           : ${ccEmails.join(', ')}`);
    }
    console.log(`   🏷️ Mode         : ${isManualAssignment ? 'Admin Manual Assignment' : 'Automatic Instant Delivery (After Payment)'}`);
    console.log(`   🔑 Total Codes  : ${codes.length} code(s)`);
    codes.forEach((c, idx) => {
      console.log(`      [${idx + 1}] Brand: ${c.brand || 'Voucher'} | Balance: ₹${c.balance || '0'} | Code: ${c.code} ${c.pin ? `| PIN: ${c.pin}` : ''}`);
    });
    console.log(`   🚀 Dispatching email via SMTP (${process.env.EMAIL_HOST || 'Brevo'})...`);
    console.log(`======================================================\n`);

    const sendResult = await transporter.sendMail(mailOptions);
    console.log(`✅ [EMAIL SERVICE] Email successfully SENT to ${recipientEmail}! (MessageId: ${sendResult.messageId})\n`);
    return { success: true, messageId: sendResult.messageId };

  } catch (error) {
    console.error(`❌ [EMAIL SERVICE] Failed to send voucher delivery email:`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  transporter,
  sendVoucherDeliveryEmail
};
