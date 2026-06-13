import React from 'react'
import { ArrowLeft, Gift, CheckCircle, Clock, XCircle, Banknote, Wallet, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const salesHistory = [
  { id: 1, brand: 'Google Play', value: 1000, payout: 915, status: 'paid', date: '2026-06-10', paidOn: '2026-06-12', commission: 85 },
  { id: 2, brand: 'Amazon', value: 2500, payout: 2288, status: 'paid', date: '2026-06-08', paidOn: '2026-06-10', commission: 212 },
  { id: 3, brand: 'Flipkart', value: 500, payout: 460, status: 'paid', date: '2026-06-05', paidOn: '2026-06-07', commission: 40 },
  { id: 4, brand: 'Steam', value: 2000, payout: 1830, status: 'pending', date: '2026-06-11', paidOn: '-', commission: 170 },
  { id: 5, brand: 'Google Play', value: 750, payout: 686, status: 'processing', date: '2026-06-12', paidOn: '-', commission: 64 },
  { id: 6, brand: 'Myntra', value: 1500, payout: 1373, status: 'paid', date: '2026-06-03', paidOn: '2026-06-05', commission: 127 },
]

const statusConfig = {
  paid: { icon: CheckCircle, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Paid' },
  pending: { icon: Clock, bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending' },
  processing: { icon: TrendingUp, bg: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Processing' },
}

const SellVoucher = () => {
  const totalEarnings = salesHistory.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.payout, 0)
  const pendingPayout = salesHistory.filter(s => s.status !== 'paid').reduce((sum, s) => sum + s.payout, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">My Sales</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 rounded-lg p-3">
                <Banknote className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-xl font-bold text-gray-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 rounded-lg p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Payout</p>
                <p className="text-xl font-bold text-gray-900">₹{pendingPayout.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-lg p-3">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-xl font-bold text-gray-900">{salesHistory.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Sales History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-600">Brand</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Card Value</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Commission</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">You Received</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Listed On</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Paid On</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {salesHistory.map((sale) => {
                  const StatusIcon = statusConfig[sale.status].icon
                  return (
                    <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{sale.brand}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-700">₹{sale.value}</td>
                      <td className="px-5 py-4 text-gray-500">-₹{sale.commission}</td>
                      <td className="px-5 py-4 font-semibold text-emerald-600">₹{sale.payout}</td>
                      <td className="px-5 py-4 text-gray-600">{sale.date}</td>
                      <td className="px-5 py-4 text-gray-600">{sale.paidOn}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[sale.status].bg}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusConfig[sale.status].label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellVoucher
