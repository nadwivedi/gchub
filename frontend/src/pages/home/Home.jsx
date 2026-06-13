import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Gift, Gamepad2, DollarSign, ArrowRight, Star } from 'lucide-react'
import HeroSection from './component/HeroSection'
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

      {/* Quick Links */}
      <div className="py-6 bg-white border-b border-slate-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Links</h2>
        <div className="flex justify-center gap-4 flex-wrap">
        <button onClick={() => navigate('/search?q=vouchers')} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          <Gift className="w-5 h-5" />
          <span>Buy Voucher</span>
          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </button>
        <button onClick={() => navigate('/search?q=games')} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          <Gamepad2 className="w-5 h-5" />
          <span>Buy Games</span>
          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </button>
        <button onClick={() => navigate('/sell-voucher')} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          <DollarSign className="w-5 h-5" />
          <span>Sell Voucher</span>
          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </button>
      </div>
      </div>

      {/* User Reviews */}
      <div className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Rahul Sharma', rating: 5, text: 'bc GTA 5 ka code mil gaya 2 minute mein, best website hai yeh!', initials: 'RS' },
              { name: 'Priya Patel', rating: 5, text: 'Google Play voucher instantly aagaya, 20% off mil gaya, kamaal kar diya!', initials: 'PP' },
              { name: 'Amit Verma', rating: 4, text: 'Amazon gift card becha, payment 5 min mein aa gayi. Thoda aur rate hota to maza aata!', initials: 'AV' },
              { name: 'Sneha Reddy', rating: 5, text: 'Got my Steam wallet code in 2 minutes. Game bundle sale mein bohot accha deal mila!', initials: 'SR' },
              { name: 'Vikram Singh', rating: 4, text: 'Cyberpunk 2077 delivered instantly at a great discount. Ek baar aur order karna hai!', initials: 'VS' },
              { name: 'Arjun Mehta', rating: 5, text: 'Mere bhai ke liye GTA 5 aur RDR2 ka bundle liya. Itna sasta kahi nahi milega!', initials: 'AM' },
              { name: 'Rohit Joshi', rating: 5, text: 'Bought a Google Play voucher and got 15% off. Delivery was instant. Highly recommended!', initials: 'RJ' },
              { name: 'Karan Joshi', rating: 5, text: 'Sold my unused Flipkart voucher. Got better rate than any other platform. Will use again for sure!', initials: 'KJ' },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill={j < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
