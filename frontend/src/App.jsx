import React, { useState, useContext } from 'react'
import { Agentation } from 'agentation'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext, AppContextProvider } from './context/AppContext'
import { CartProvider } from './context/CartContext'
import axios from 'axios'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileBottomNav from './components/MobileBottomNav'
import Home from './pages/home/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import OrderDetail from './pages/OrderDetail'
import ManageAddresses from './pages/ManageAddresses'
import ProfileInfo from './pages/ProfileInfo'
import CustomerSupport from './pages/CustomerSupport'
import ChatPage from './pages/ChatPage'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import BlogsPage from './pages/blog/BlogsPage'
import BlogDetailPage from './pages/blog/BlogDetailPage'
import SellVoucher from './pages/SellVoucher'
import MySales from './pages/MySales'
import GiftCardGooglePlay from './pages/GiftCardGooglePlay'
import GameDetail from './pages/game/GameDetail'
import GamesPage from './pages/game/GamesPage'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Global modal that prompts users missing a phone number (e.g. after Google login)
const MobilePromptModal = () => {
  const { user, setUser, isAuthenticated, BACKEND_URL } = useContext(AppContext)
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Only show when authenticated and phone is missing
  if (!isAuthenticated || !user || user.phone) return null

  const handleSubmit = async () => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number')
      return
    }
    setSubmitting(true)
    try {
      const response = await axios.put(`${BACKEND_URL}/api/auth/mobile`, { mobile: cleaned }, { withCredentials: true })
      if (response.data.success) {
        setUser(response.data.user)
        toast.success('Mobile number saved!')
      } else {
        toast.error(response.data.message || 'Failed to save mobile number')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm'>
        <div className='text-center mb-5'>
          <div className='bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3'>
            <Phone className='w-7 h-7 text-amber-600' />
          </div>
          <h3 className='text-lg font-bold text-gray-900'>Mobile Number Required</h3>
          <p className='text-sm text-gray-500 mt-1'>Please enter your mobile number to complete your profile and start shopping.</p>
        </div>
        <input
          type='tel'
          inputMode='numeric'
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
          placeholder='Enter 10-digit mobile number'
          className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-medium text-center tracking-widest'
          autoFocus
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || phone.replace(/\D/g, '').length < 10}
          className='w-full mt-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        >
          {submitting ? 'Saving...' : 'Continue'}
        </button>
        <p className='text-[10px] text-gray-400 text-center mt-3'>
          Your number is only used for order updates and account security.
        </p>
      </div>
    </div>
  )
}

const AppContent = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isChatPage = location.pathname === '/chat'
  const isCartPage = location.pathname === '/cart'

  const showMobileNav = !isLoginPage && !isChatPage

  return (
    <div className={showMobileNav ? 'pb-14 md:pb-0' : ''}>
      {!isLoginPage && !isChatPage && <Navbar />}
      <ScrollToTop />
      <MobilePromptModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/order/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
        <Route path="/manage-addresses" element={<ProtectedRoute><ManageAddresses /></ProtectedRoute>} />
        <Route path="/profile-info" element={<ProtectedRoute><ProfileInfo /></ProtectedRoute>} />
        <Route path="/customer-support" element={<ProtectedRoute><CustomerSupport /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell-voucher" element={<SellVoucher />} />
        <Route path="/my-sales" element={<ProtectedRoute><MySales /></ProtectedRoute>} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/gift-card/google-play" element={<GiftCardGooglePlay />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:slug" element={<GameDetail />} />
      </Routes>
      {showMobileNav && <Footer />}
      {showMobileNav && <MobileBottomNav />}
      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showMobileNav && !isCartPage && (
        <Link
          to="/contact"
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[60] flex items-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-teal-500 hover:scale-105 transition-all duration-200"
          style={{ boxShadow: '0 4px 14px rgba(13, 148, 136, 0.4)' }}
          aria-label="Customer Support"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">Support</span>
        </Link>
      )}
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <CartProvider>
          <AppContent />
          {process.env.NODE_ENV === "development" && <Agentation />}
        </CartProvider>
      </AppContextProvider>
    </Router>
  )
}

export default App
