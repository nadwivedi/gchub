import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Gamepad2, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { gamesList } from '../../data/games'

const GamesPage = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')

  const filtered = search
    ? gamesList.filter(
        (g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.fullName.toLowerCase().includes(search.toLowerCase()) ||
          g.genre.toLowerCase().includes(search.toLowerCase())
      )
    : gamesList

  const handleAddToCart = (e, game) => {
    e.stopPropagation()
    addToCart({
      _id: game._id,
      name: game.fullName,
      price: game.price,
      originalPrice: game.originalPrice,
      images: [game.img],
    })
    toast.success(`${game.name} added to cart!`)
  }

  const handleBuyNow = (e, game) => {
    e.stopPropagation()
    addToCart({
      _id: game._id,
      name: game.fullName,
      price: game.price,
      originalPrice: game.originalPrice,
      images: [game.img],
    })
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gamepad2 className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">All Games</h1>
          <p className="text-indigo-200 text-base sm:text-lg max-w-xl mx-auto">
            Browse our collection of premium PC & console games at unbeatable prices
          </p>
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search games by name or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length} {filtered.length === 1 ? 'game' : 'games'} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-1">No games found</h3>
            <p className="text-gray-400 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {filtered.map((game) => (
              <div
                key={game._id}
                onClick={() => navigate(`/games/${game.slug}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 relative group flex flex-col cursor-pointer hover:-translate-y-1"
              >
                <div className="relative">
                  {game.img ? (
                    <img
                      src={game.img}
                      alt={game.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center text-gray-400 text-xs text-center px-2 bg-gray-50">
                      {game.name}
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md">
                    -{Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)}% OFF
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                    <span className="text-[10px] font-bold text-gray-900">{game.rating}</span>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <div>
                    <p className="text-[10px] font-semibold text-purple-500 uppercase tracking-wider">
                      {game.genre.split(',')[0]}
                    </p>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{game.fullName || game.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-gray-900">₹{game.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{game.originalPrice}</span>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={(e) => handleBuyNow(e, game)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs transition-all duration-200 cursor-pointer"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(e, game)}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs transition-all duration-200 cursor-pointer"
                    >
                      <span className="sm:hidden">Add Cart</span>
                      <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GamesPage
