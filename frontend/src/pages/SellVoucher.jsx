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
  const [showModal, setShowModal] = useState(false)
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
    setShowModal(false)
    toast.success('Gift card added successfully')
  }

  const handleDelete = (id) => {
    setCards(cards.filter((c) => c.id !== id))
    toast.info('Gift card removed')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Sell Gift Cards</h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Add New Card</span>
              <span className="inline xs:hidden sm:hidden">Add</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-center text-[13px] sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-6">How It Works</h2>
            <div className="flex flex-row items-start sm:items-center gap-0">
              <div className="flex-1 flex flex-col items-center text-center relative">
                <div className="bg-gray-900 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-1.5 sm:mb-3 shadow-md relative z-10">
                  <Upload className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="font-semibold text-gray-900 text-[10px] sm:text-sm leading-tight">Add Your Card</p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">List your gift card for sale</p>
                <div className="absolute top-4 sm:top-6 left-[55%] w-[80%] h-0.5 border-t-[1.5px] sm:border-t-2 border-dashed border-gray-300 z-0" />
              </div>
              <div className="flex-1 flex flex-col items-center text-center relative">
                <div className="bg-gray-900 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-1.5 sm:mb-3 shadow-md relative z-10">
                  <Clock className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="font-semibold text-gray-900 text-[10px] sm:text-sm leading-tight">Sells in 24 Hrs</p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">Fast & easy selling process</p>
                <div className="absolute top-4 sm:top-6 left-[55%] w-[80%] h-0.5 border-t-[1.5px] sm:border-t-2 border-dashed border-gray-300 z-0" />
              </div>
              <div className="flex-1 flex flex-col items-center text-center relative">
                <div className="bg-gray-900 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-1.5 sm:mb-3 shadow-md relative z-10">
                  <Banknote className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="font-semibold text-gray-900 text-[10px] sm:text-sm leading-tight">Get Paid</p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">Money credited to your bank</p>
              </div>
            </div>
          </div>

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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add Gift Card</h2>
            <div className="space-y-4">
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
              <button
                onClick={handleAdd}
                className="w-full py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellVoucher
