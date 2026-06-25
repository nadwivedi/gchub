import { LayoutDashboard, Gift, ShoppingCart, Users } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Gift Cards', value: '—', icon: Gift, color: 'bg-purple-100 text-purple-600' },
          { label: 'Active Listings', value: '—', icon: ShoppingCart, color: 'bg-green-100 text-green-600' },
          { label: 'Sold', value: '—', icon: Users, color: 'bg-blue-100 text-blue-600' },
          { label: 'Revenue', value: '—', icon: LayoutDashboard, color: 'bg-yellow-100 text-yellow-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-400">
        <LayoutDashboard className="h-10 w-10 mx-auto mb-2 text-gray-300" />
        <p>Dashboard stats will be populated soon</p>
      </div>
    </div>
  )
}

export default Dashboard
