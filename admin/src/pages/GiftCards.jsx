import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Gift, Trash2, Plus, Search, ShieldCheck, User } from 'lucide-react'

const brands = ['Google Play', 'Amazon', 'Flipkart', 'Steam', 'Myntra', 'BigBasket']

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const GiftCards = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'admin' | 'user'
  const [form, setForm] = useState({
    brand: '', balance: '', code: '', pin: '', expiry: '',
  })
  const [search, setSearch] = useState('')

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admin/gift-cards`, { withCredentials: true })
      if (res.data.success) setListings(res.data.data)
    } catch {
      // silently fail
    }
  }

  useEffect(() => { fetchListings() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = async () => {
    if (!form.brand || !form.balance || !form.code || !form.expiry) {
      toast.error('Please fill all required fields')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/gift-cards`, form, { withCredentials: true })
      if (res.data.success) {
        setListings([res.data.data, ...listings])
        setForm({ brand: '', balance: '', code: '', pin: '', expiry: '' })
        toast.success('Gift card listed successfully')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list gift card')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gift card listing?')) return
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/admin/gift-cards/${id}`, { withCredentials: true })
      if (res.data.success) {
        setListings(listings.filter((c) => c._id !== id))
        toast.info('Listing deleted')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete')
    }
  }

  const adminCount = listings.filter(c => c.listedBy === 'admin').length
  const userCount = listings.filter(c => c.listedBy === 'user' || !c.listedBy).length

  const tabFiltered = listings.filter(c => {
    if (activeTab === 'admin') return c.listedBy === 'admin'
    if (activeTab === 'user') return c.listedBy === 'user' || !c.listedBy
    return true
  })

  const filtered = tabFiltered.filter((c) =>
    c.brand.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.user?.fullName || '').toLowerCase().includes(search.toLowerCase())
  )

  const tabs = [
    { key: 'all', label: 'All Listings', count: listings.length },
    { key: 'admin', label: 'Admin Listed', count: adminCount, icon: ShieldCheck, color: 'blue' },
    { key: 'user', label: 'User Listed', count: userCount, icon: User, color: 'green' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gift Card Listings</h1>
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">{listings.length} total</span>
      </div>

      {/* Add New Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-gray-500" />
          Add New Gift Card Listing
          <span className="ml-auto text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Listed as Admin
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
            <select name="brand" value={form.brand} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select brand</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Balance (₹) *</label>
            <input type="number" name="balance" value={form.balance} onChange={handleChange} placeholder="Enter amount" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
            <input type="text" name="code" value={form.code} onChange={handleChange} placeholder="Gift card code" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PIN <span className="text-gray-400">(optional)</span></label>
            <input type="text" name="pin" value={form.pin} onChange={handleChange} placeholder="PIN if required" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry *</label>
            <input type="date" name="expiry" value={form.expiry} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="flex items-end">
            <button onClick={handleAdd} disabled={loading} className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? 'Adding...' : <><Plus className="h-4 w-4" /> Add Listing</>}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex items-center gap-1 px-4 pt-3">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? tab.key === 'admin'
                      ? 'border-blue-600 text-blue-700 bg-blue-50'
                      : tab.key === 'user'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-gray-900 text-gray-900 bg-gray-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon && <tab.icon className="h-4 w-4" />}
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === tab.key
                    ? tab.key === 'admin' ? 'bg-blue-100 text-blue-700' : tab.key === 'user' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}

            {/* Search */}
            <div className="relative ml-auto mb-1 w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search brand, code, user..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-600">Brand</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Balance</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Code</th>
                <th className="px-4 py-3 font-semibold text-gray-600">PIN</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Expiry</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Listed By (User)</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Source</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                    <Gift className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No gift card listings found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((card) => (
                  <tr key={card._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{card.brand}</td>
                    <td className="px-4 py-3 text-gray-700">₹{card.balance}</td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-xs">{card.code.replace(/.(?=.{4})/g, '*')}</td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-xs">{card.pin ? card.pin.replace(/.(?=.{4})/g, '*') : '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(card.expiry).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-medium text-xs">{card.user?.fullName || 'Unknown'}</span>
                        {card.user?.email && <span className="text-gray-400 text-xs">{card.user.email}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {card.listedBy === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <ShieldCheck className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                          <User className="h-3 w-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        card.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                        card.status === 'sold' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {card.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(card.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(card._id)} className="text-red-500 hover:text-red-700 transition-colors p-1" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GiftCards
