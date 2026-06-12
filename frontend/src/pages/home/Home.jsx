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
