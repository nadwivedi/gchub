import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AppContext } from '../context/AppContext'

const MobileBottomNav = () => {
  const location = useLocation()
  const { getTotalItems } = useCart()
  const { isAuthenticated } = useContext(AppContext) || {}

  const isActive = (path) => location.pathname === path

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">

      {/* Floating Sell Card button — 35% above the bar */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[17px] flex flex-col items-center z-10">
        <Link to="/sell-voucher" className="flex flex-col items-center gap-1.5">
          <span
            className="flex items-center justify-center w-11 h-11 rounded-full active:scale-95 transition-transform duration-150"
            style={{
              background: 'linear-gradient(135deg, #eab308 0%, #f59e0b 55%, #d97706 100%)',
              boxShadow: '0 4px 16px rgba(234,179,8,0.55), 0 2px 6px rgba(0,0,0,0.18)',
              border: '3px solid white',
            }}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="black" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </span>
          <span className="text-[9px] font-bold leading-none" style={{ color: '#92400e' }}>
            Sell Card
          </span>
        </Link>
      </div>

      {/* Nav Bar */}
      <div
        className="flex items-center justify-around px-6"
        style={{
          height: 52,
          background: 'rgba(255,255,255,0.98)',
          boxShadow: '0 -1px 0 rgba(0,0,0,0.07), 0 -6px 24px rgba(0,0,0,0.09)',
          borderTop: '1.5px solid rgba(234,179,8,0.28)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* HOME */}
        <Link to="/" className="flex flex-col items-center gap-0 relative" style={{ minWidth: 56 }}>
          <span
            className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200"
            style={{
              background: isActive('/') ? 'rgba(234,179,8,0.15)' : 'transparent',
              color: isActive('/') ? '#b45309' : '#6b7280',
            }}
          >
            <svg className="w-[18px] h-[18px]" fill={isActive('/') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>
          <span className="text-[9px] font-semibold leading-none" style={{ color: isActive('/') ? '#b45309' : '#9ca3af' }}>
            Home
          </span>
          {isActive('/') && (
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#eab308' }} />
          )}
        </Link>

        {/* CENTER SPACER */}
        <div style={{ minWidth: 64 }} />

        {/* ACCOUNT / LOGIN */}
        <Link to={isAuthenticated ? '/account' : '/login'} className="flex flex-col items-center gap-0 relative" style={{ minWidth: 56 }}>
          <span
            className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200"
            style={{
              background: isActive('/account') || isActive('/login') ? 'rgba(234,179,8,0.15)' : 'transparent',
              color: isActive('/account') || isActive('/login') ? '#b45309' : '#6b7280',
            }}
          >
            <svg className="w-[18px] h-[18px]" fill={isActive('/account') || isActive('/login') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span className="text-[9px] font-semibold leading-none" style={{ color: isActive('/account') || isActive('/login') ? '#b45309' : '#9ca3af' }}>
            {isAuthenticated ? 'Account' : 'Login'}
          </span>
          {(isActive('/account') || isActive('/login')) && (
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#eab308' }} />
          )}
        </Link>
      </div>
    </div>
  )
}

export default MobileBottomNav
