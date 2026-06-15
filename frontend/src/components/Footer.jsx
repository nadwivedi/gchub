import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: 'linear-gradient(160deg, #111 0%, #1a1200 60%, #0f0f0f 100%)' }} className="text-white">
      
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #eab308, #f59e0b, #d97706, #eab308)', backgroundSize: '200% 100%' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img src="/gchublogo.png" alt="GCHUB" className="h-[150px] w-[150px] md:h-[210px] md:w-[210px] object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-200" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              India's trusted marketplace for gift cards & vouchers. Buy, sell and redeem digital vouchers from top brands at the best prices.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', href: '#', icon: <path d="M12.224 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.227.413.56.217.96.477 1.382.896.419.42.677.819.896 1.381.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.054 1.17-.249 1.805-.413 2.227a3.81 3.81 0 0 1-.896 1.382 3.744 3.744 0 0 1-1.382.896c-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.054-1.805-.249-2.227-.413a3.81 3.81 0 0 1-1.382-.896 3.744 3.744 0 0 1-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.227.217-.56.477-.96.896-1.382a3.744 3.744 0 0 1 1.382-.896c.422-.164 1.057-.36 2.227-.413 1.265-.058 1.645-.07 4.849-.07zm0-2.162c-3.259 0-3.667.014-4.947.072-1.281.058-2.154.26-2.913.558a5.885 5.885 0 0 0-2.134 1.389 5.868 5.868 0 0 0-1.389 2.134c-.297.759-.5 1.632-.558 2.913-.058 1.281-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.281.26 2.154.558 2.913a5.885 5.885 0 0 0 1.389 2.134 5.868 5.868 0 0 0 2.134 1.389c.759.297 1.632.5 2.913.558 1.281.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.281-.058 2.154-.26 2.913-.558a5.885 5.885 0 0 0 2.134-1.389 5.868 5.868 0 0 0 1.389-2.134c.297-.759.5-1.632.558-2.913.058-1.281.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.281-.26-2.154-.558-2.913a5.885 5.885 0 0 0-1.389-2.134A5.868 5.868 0 0 0 19.86.63c-.759-.297-1.632-.5-2.913-.558C15.667.014 15.259 0 12 0z" /> },
                { label: 'Facebook', href: '#', icon: <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" /> },
                { label: 'X (Twitter)', href: '#', icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.9 1.153Zm-1.29 19.495h2.039L6.486 3.24H4.298l13.313 17.408Z" /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(234,179,8,0.3)'; e.currentTarget.style.borderColor = '#eab308' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(234,179,8,0.12)'; e.currentTarget.style.borderColor = 'rgba(234,179,8,0.2)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#eab308' }}>
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop by Category */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 inline-block rounded" style={{ background: '#eab308' }} />
              Categories
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/search?category=e-commerce', label: '🛒 E-Commerce' },
                { to: '/search?category=gaming', label: '🎮 Gaming' },
                { to: '/search?category=food-dining', label: '🍔 Food & Dining' },
                { to: '/search?category=fashion-lifestyle', label: '👗 Fashion & Lifestyle' },
                { to: '/search?category=travel-entertainment', label: '✈️ Travel & Entertainment' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px rounded transition-all duration-200 inline-block" style={{ background: '#eab308' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 inline-block rounded" style={{ background: '#eab308' }} />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/sell-voucher', label: 'Sell Gift Card' },
                { to: '/my-orders', label: 'My Orders' },
                { to: '/customer-support', label: 'Support' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px rounded transition-all duration-200 inline-block" style={{ background: '#eab308' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Trust */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 inline-block rounded" style={{ background: '#eab308' }} />
              Contact Us
            </h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.12)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#eab308' }}>
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Phone</p>
                  <a href="tel:+917000484146" className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">+91 70004 84146</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.12)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#eab308' }}>
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Email</p>
                  <a href="mailto:support@vouchercash.online" className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">support@vouchercash.online</a>
                </div>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="rounded-xl p-3 space-y-2" style={{ background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.15)' }}>
              {['🔒 100% Secure Payments', '⚡ Instant Delivery', '✅ Verified Vouchers'].map(badge => (
                <p key={badge} className="text-xs text-gray-400">{badge}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(234,179,8,0.15)' }}
        >
          <p className="text-gray-500 text-xs">
            © {currentYear} <span style={{ color: '#eab308' }}>GCHub</span>. All rights reserved. Made in 🇮🇳 India.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/refund-policy"
              className="text-gray-500 hover:text-yellow-400 text-xs transition-colors duration-200"
            >
              Refund Policy
            </a>
            <a
              href="/privacy-policy"
              className="text-gray-500 hover:text-yellow-400 text-xs transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
