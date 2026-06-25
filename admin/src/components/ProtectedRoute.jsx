import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const ProtectedRoute = () => {
  const [status, setStatus] = useState('loading') // 'loading' | 'authorized' | 'unauthorized'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/me`, { withCredentials: true })
        if (res.data.isLoggedIn && res.data.user?.role === 'admin') {
          setStatus('authorized')
        } else {
          setStatus('unauthorized')
        }
      } catch {
        setStatus('unauthorized')
      }
    }
    checkAuth()
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Checking access...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthorized') {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
