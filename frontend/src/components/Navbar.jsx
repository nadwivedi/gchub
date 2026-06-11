import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
  // State Management
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems } = useCart()
  const { isAuthenticated, user, logout } = useContext(AppContext) || {}
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setSearchQuery('')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-gray-100 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[60px] md:h-[80px]">
          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/vouchercashlogo2.png"
              alt="Voucher Cash Logo"
              className="h-[214px] w-[214px] md:h-[246px] md:w-[246px] object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Search - centered */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl mx-auto px-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-5 pr-12 py-2.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 hover:bg-white transition-colors shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Desktop Right Actions + Mobile Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {/* Desktop Cart + Login/Profile */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/sell-voucher"
                className="animate-pulse bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 cursor-pointer"
              >
                Sell Your Gift Card
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <img src="/cart.avif" alt="Cart" className="w-6 h-6 object-contain" />
                  <span>Cart</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </Link>

              {!isAuthenticated && (
                <Link 
                  to="/login" 
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 cursor-pointer"
                >
                  <span>Login</span>
                </Link>
              )}

              {isAuthenticated && user && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden md:block">{user.fullName}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50">
                      <Link
                        to="/my-orders"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-all duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6m-6 0h6" />
                        </svg>
                        My Orders
                      </Link>
                      <Link
                        to="/manage-addresses"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-all duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Manage Addresses
                      </Link>
                      <Link
                        to="/profile-info"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-all duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Info
                      </Link>
                      <Link
                        to="/customer-support"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-all duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Customer Support
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center gap-1">
              <button
                onClick={() => navigate('/search')}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors duration-200 cursor-pointer"
                aria-label="Search"
              >
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors duration-200"
                aria-label="Cart"
              >
                <img src="/cart.avif" alt="Cart" className="h-5 w-5 md:h-6 md:w-6 object-contain" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center shadow">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
