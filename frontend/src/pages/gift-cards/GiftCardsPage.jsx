import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Gift } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { toast } from 'react-toastify'
import { giftCardsList } from '../../data/giftCards'

const GiftCardsPage = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')

  const brands = [...new Set(giftCardsList.map((g) => g.brand))]

  const [selectedBrand, setSelectedBrand] = useState('')

  let filtered = selectedBrand
    ? giftCardsList.filter((g) => g.brand === selectedBrand)
    : giftCardsList

  if (search) {
    filtered = filtered.filter(
      (g) =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.fullName.toLowerCase().includes(search.toLowerCase()) ||
        g.brand.toLowerCase().includes(search.toLowerCase())
    )
  }

  const handleAddToCart = (e, card) => {
    e.stopPropagation()
    addToCart({
      _id: card._id,
      name: card.fullName,
      price: card.price,
      originalPrice: card.originalPrice,
      images: [card.img],
    })
    toast.success(`${card.brand} added to cart!`)
  }

  const handleBuyNow = (e, card) => {
    e.stopPropagation()
    addToCart({
      _id: card._id,
      name: card.fullName,
      price: card.price,
      originalPrice: card.originalPrice,
      images: [card.img],
    })
    navigate('/cart')
  }

  const discountPercent = (original, price) => {
    if (!original || original <= price) return 0
    return Math.round(((original - price) / original) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              Gift Cards
            </h1>
            <p className="text-sm text-gray-500">
              {filtered.length} {filtered.length === 1 ? 'card' : 'cards'} available
            </p>
          </div>
          <div className="flex gap-2 w-full md:max-w-md">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name, brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-sm outline-none transition-all bg-white"
              />
            </div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-3 rounded-xl border border-gray-200 shadow-sm text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-1">No gift cards found</h3>
            <p className="text-gray-400 text-sm">Try a different search or brand filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {filtered.map((card) => {
              const discount = discountPercent(card.originalPrice, card.price)
              return (
                <div
                  key={card._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 relative group flex flex-col hover:-translate-y-1"
                >
                  <div className="relative">
                    <div className="w-full aspect-square bg-slate-100 flex items-center justify-center p-6">
                      <img
                        src={card.img}
                        alt={card.brand}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {discount > 0 && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md">
                        -{discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <div>
                      <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                        {card.brand}
                      </p>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{card.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-gray-900">₹{card.price}</span>
                      {card.originalPrice > card.price && (
                        <span className="text-xs text-gray-400 line-through">₹{card.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => handleBuyNow(e, card)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs transition-all duration-200 cursor-pointer"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, card)}
                        className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs transition-all duration-200 cursor-pointer"
                      >
                        <span className="sm:hidden">Add</span>
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default GiftCardsPage
