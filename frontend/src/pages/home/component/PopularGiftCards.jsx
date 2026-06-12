import React from 'react'

const products = [
  { name: 'Amazon', file: '/products/amazon.png' },
  { name: 'BigBasket', file: '/products/bigbasket.png' },
  { name: 'Flipkart', file: '/products/flipkart.png' },
  { name: 'Google Play', file: '/products/google%20play.png' },
  { name: 'Steam', file: '/products/steam.png' },
  { name: 'Myntra', file: '/products/myntra.png' },
]

const PopularGiftCards = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Popular Gift Cards</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {products.map((product) => (
            <div key={product.name} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-0 flex items-center justify-center border border-gray-200 relative">
              <img
                src={product.file}
                alt={product.name}
                className="h-36 w-36 sm:h-48 sm:w-48 object-contain"
              />
              <button className="absolute bottom-0 left-0 right-0 py-1.5 bg-gray-800 text-white text-sm font-medium rounded-b-lg hover:bg-gray-700 transition-colors duration-200">
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularGiftCards
