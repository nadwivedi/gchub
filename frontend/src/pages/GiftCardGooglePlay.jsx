import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const vouchers = [
  {
    _id: 'google-play-10',
    name: 'Google Play Code - ₹10 Voucher',
    price: 9,
    originalPrice: 10,
    brand: 'Google Play',
    category: 'gift-cards',
    images: ['/products/google%20play.png'],
    description: '₹10 Google Play Gift Card at just ₹9',
  },
  {
    _id: 'google-play-400',
    name: 'Google Play Code - ₹400 Voucher',
    price: 349,
    originalPrice: 400,
    brand: 'Google Play',
    category: 'gift-cards',
    images: ['/products/google%20play.png'],
    description: '₹400 Google Play Gift Card at just ₹349',
  },
  {
    _id: 'google-play-520',
    name: 'Google Play Code - ₹520 Voucher',
    price: 400,
    originalPrice: 520,
    brand: 'Google Play',
    category: 'gift-cards',
    images: ['/products/google%20play.png'],
    description: '₹520 Google Play Gift Card at just ₹400',
  },
]

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

const calculateDiscount = (original, current) => {
  if (!original || original <= current) return 0
  return Math.round(((original - current) / original) * 100)
}

const GiftCardGooglePlay = () => {
  const { addToCart } = useCart()
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const handleAddToCart = (voucher) => {
    if (voucher.stockQuantity <= 0) {
      toast.error('Out of stock')
      return
    }
    addToCart(voucher)
    toast.success('Added to cart!')
  }

  const handleBuyNow = (voucher) => {
    if (voucher.stockQuantity <= 0) return
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    addToCart(voucher)
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mb-4">
            Google Play{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Gift Cards
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Get Google Play codes at the best prices. Instant delivery via email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {vouchers.map((voucher) => {
            const discountPercent = calculateDiscount(voucher.originalPrice, voucher.price)
            const savings = voucher.originalPrice - voucher.price

            return (
              <div
                key={voucher._id}
                className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 flex flex-col"
              >
                {discountPercent > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                      -{discountPercent}% OFF
                    </div>
                  </div>
                )}

                <div className="aspect-[1.6/1] w-full overflow-hidden bg-slate-100 flex items-center justify-center relative">
                  <img
                    src={voucher.images?.[0]}
                    alt={voucher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Instant
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs tracking-wider font-extrabold text-emerald-600 uppercase">
                        Google Play Code
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-3 text-lg leading-tight group-hover:text-emerald-600 transition-colors">
                      {voucher.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">{voucher.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">
                          {formatPrice(voucher.price)}
                        </span>
                        {voucher.originalPrice > voucher.price && (
                          <span className="text-sm text-slate-400 line-through">
                            {formatPrice(voucher.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1.5 rounded-md">
                        <span>Save {formatPrice(savings)}</span>
                        <span className="bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">
                          {discountPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleBuyNow(voucher)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3.5 px-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer text-xs sm:text-sm"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => handleAddToCart(voucher)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 px-4 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-xs sm:text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GiftCardGooglePlay
