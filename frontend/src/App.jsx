import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContextProvider } from './context/AppContext'
import { CartProvider } from './context/CartContext'
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

const AppContent = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isChatPage = location.pathname === '/chat'

  const showMobileNav = !isLoginPage && !isChatPage

  return (
    <div className={showMobileNav ? 'pb-14 md:pb-0' : ''}>
      {!isLoginPage && !isChatPage && <Navbar />}
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
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
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
      {showMobileNav && (
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
        </CartProvider>
      </AppContextProvider>
    </Router>
  )
}

export default App
