import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from './component/HeroSection'
import ShopByCategorySection from './component/ShopByCategorySection'
import ShopByBrandSection from './component/ShopByBrandSection'
import PopularGiftCards from './component/PopularGiftCards'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner Carousel for Voucher Cash */}
      <div className="py-6">
        <HeroSection />
      </div>

      <PopularGiftCards />

      {/* Popular AAA Games Section */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Buy Popular AAA Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: 'GTA 5', slug: 'gta-5', img: '/games/gta5.jpeg' },
              { name: 'RDR2', slug: 'rdr2', img: '/games/rdr2.jpeg' },
              { name: 'Cyberpunk', slug: 'cyberpunk', img: '/games/cyberpunk%202077.jpeg' },
              { name: 'The Last of Us 2', slug: 'the-last-of-us-2', img: '/games/the%20last%20of%20us%202.jpeg' },
              { name: 'Resident Evil 4', slug: 'resident-evil-4', img: null },
            ].map((game) => (
              <div key={game.name} onClick={() => navigate(`/game/${game.slug}`)} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 relative group flex flex-col cursor-pointer">
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
                    -70% OFF
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{game.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-gray-900">₹359</span>
                    <span className="text-xs text-gray-400 line-through">₹1,200</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/game/${game.slug}`)} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs transition-all duration-200 cursor-pointer">
                      Buy Now
                    </button>
                    <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs transition-all duration-200 cursor-pointer">
                      <span className="sm:hidden">Add Cart</span>
                      <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className="py-6 border-b border-slate-100">
        <ShopByCategorySection />
      </div>

      {/* Shop by Brand Section */}
      <div className="py-6 bg-white border-b border-slate-100">
        <ShopByBrandSection />
      </div>

    </div>
  )
}

export default Home
