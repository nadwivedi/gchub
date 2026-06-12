import React from 'react'
import HeroSection from './component/HeroSection'
import ShopByCategorySection from './component/ShopByCategorySection'
import ShopByBrandSection from './component/ShopByBrandSection'
import PopularGiftCards from './component/PopularGiftCards'

const Home = () => {
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
            {['GTA 5', 'RDR2', 'Cyberpunk', 'The Last of Us 2', 'Resident Evil 4'].map((game) => (
              <div key={game} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-0 flex items-center justify-center border border-gray-200 relative">
                <div className="h-36 w-36 sm:h-48 sm:w-48 flex items-center justify-center text-gray-400 text-xs text-center px-2">
                  {game}
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
