import React, { useState } from 'react'
import { ArrowLeft, Plus, Trash2, Gift, DollarSign, Hash, Calendar, X, Upload, Clock, Banknote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const brands = [
  'Google Play',
  'Amazon',
  'Flipkart',
  'Steam',
  'Myntra',
  'BigBasket',
]

const SellVoucher = () => {
  const [cards, setCards] = useState([])
  const [form, setForm] = useState({
    brand: '',
    balance: '',
    code: '',
    expiry: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.brand || !form.balance || !form.code || !form.expiry) {
      toast.error('Please fill all fields')
      return
    }
    setCards([...cards, { ...form, id: Date.now() }])
    setForm({ brand: '', balance: '', code: '', expiry: '' })
    toast.success('Gift card added successfully')
  }

  const handleDelete = (id) => {
    setCards(cards.filter((c) => c.id !== id))
    toast.info('Gift card removed')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Main Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Sell Gift Cards</h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-6 sm:mb-8">
            <h2 className="text-center text-[13px] sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <div className="flex flex-row items-start sm:items-center gap-0">
              <div className="flex-1 flex flex-col items-center text-center relative">
                <div className="bg-gray-900 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 sm:mb-2 shadow-md relative z-10">
                  <Upload className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="font-semibold text-gray-900 text-[10px] sm:text-sm leading-tight">Add Your Card</p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">List your gift card for sale</p>
                <div className="absolute top-4 sm:top-5 left-[55%] w-[80%] h-0.5 border-t-[1.5px] sm:border-t-2 border-dashed border-gray-300 z-0" />
              </div>
              <div className="flex-1 flex flex-col items-center text-center relative">
                <div className="bg-gray-900 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 sm:mb-2 shadow-md relative z-10">
                  <Clock className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="font-semibold text-gray-900 text-[10px] sm:text-sm leading-tight">Sells in 24 Hrs</p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">Fast & easy selling process</p>
                <div className="absolute top-4 sm:top-5 left-[55%] w-[80%] h-0.5 border-t-[1.5px] sm:border-t-2 border-dashed border-gray-300 z-0" />
              </div>
              <div className="flex-1 flex flex-col items-center text-center relative">
                <div className="bg-gray-900 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 sm:mb-2 shadow-md relative z-10">
                  <Banknote className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="font-semibold text-gray-900 text-[10px] sm:text-sm leading-tight">Get Paid</p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">Money credited to your bank</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">List Your Gift Card</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Gift className="h-4 w-4 inline mr-1" />
                  Brand
                </label>
                <select
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="">Select brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Balance Amount (₹)
                </label>
                <input
                  type="number"
                  name="balance"
                  value={form.balance}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Hash className="h-4 w-4 inline mr-1" />
                  Gift Card Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="Enter gift card code"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="pt-2">
                <button
                  onClick={handleAdd}
                  className="w-full py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Active Listings</h2>
        {cards.length === 0 ? (
          <div className="text-center py-20">
            <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No gift cards added yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add New Card" to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <Gift className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{card.brand}</p>
                    <p className="text-sm text-gray-500">
                      Code: {card.code.replace(/.(?=.{4})/g, '*')} | ₹{card.balance} | Exp: {card.expiry}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-red-500 hover:text-red-700 transition-colors self-end sm:self-auto"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
          </div>

          {/* Sidebar Section - FAQs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-yellow-500 block"></span>
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">How fast will my card sell?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Most popular brand gift cards sell within 24 hours. Less common brands may take 2-3 days.</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">When do I get paid?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Money is automatically transferred to your linked bank account or wallet within 48 hours after the buyer verifies the card.</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Are there any selling fees?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">We charge a flat 5% commission on successful sales. There are no listing fees.</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">What if my code doesn't work?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Ensure the code and PIN are correct before listing. If a buyer reports an invalid code, we will investigate and may suspend your account if found fraudulent.</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">How do I add my bank account to get paid?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Go to your Account settings and select "Payment Methods". There, you can securely add and verify your bank account or wallet details.</p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 text-sm mb-1">Need help?</h4>
                <p className="text-yellow-700 text-xs mb-3">Our support team is available 24/7 to assist you.</p>
                <Link to="/contact" className="inline-block text-xs font-bold text-yellow-900 hover:text-yellow-700">Contact Support &rarr;</Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SellVoucher
