import React from 'react'
import HeroSection from './component/HeroSection'
import ShopByCategorySection from './component/ShopByCategorySection'
import ShopByBrandSection from './component/ShopByBrandSection'

const products = [
  { name: 'Amazon', file: '/products/amazon.png' },
  { name: 'BigBasket', file: '/products/bigbasket.png' },
  { name: 'Flipkart', file: '/products/flipkart.png' },
  { name: 'Google Play', file: '/products/google%20play.png' },
  { name: 'Steam', file: '/products/steam.png' },
]

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner Carousel for Voucher Cash */}
      <div className="py-6">
        <HeroSection />
      </div>

      {/* Voucher Products Section */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Gift Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {products.map((product) => (
              <div key={product.name} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-0 flex items-center justify-center border border-gray-100">
                <img
                  src={product.file}
                  alt={product.name}
                  className="h-32 w-32 sm:h-44 sm:w-44 object-contain"
                />
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
