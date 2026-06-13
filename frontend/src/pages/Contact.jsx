import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Contact = () => {
  const { isAuthenticated } = useContext(AppContext) || {}
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 sm:w-20 bg-gray-300"></span>
            <div className="bg-yellow-400 p-3 rounded-xl">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="h-px w-12 sm:w-20 bg-gray-300"></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Get In <span className="text-yellow-500">Touch</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions or need help? We're here for you.
          </p>
        </div>

        {isAuthenticated && (
          <div className="mb-8 sm:mb-12">
            <div className="max-w-lg mx-auto text-center">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-yellow-400/40 transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Live Chat</span>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-2.5 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                    <a href="mailto:support@gchub.in" className="text-sm font-semibold text-gray-900 hover:text-yellow-600 transition-colors cursor-pointer">
                      support@gchub.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-2.5 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</p>
                    <a href="tel:+919876543210" className="text-sm font-semibold text-gray-900 hover:text-yellow-600 transition-colors cursor-pointer">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-2.5 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</p>
                    <p className="text-sm text-gray-900">123 Tech Street, New Delhi 110001</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-2.5 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Hours</p>
                    <p className="text-sm text-gray-900">Mon-Sat: 10AM-8PM</p>
                    <p className="text-sm text-gray-900">Sunday: 11AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-900 hover:bg-gray-800 p-3 rounded-lg transition-all duration-200 cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-900 hover:bg-gray-800 p-3 rounded-lg transition-all duration-200 cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.754-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-900 hover:bg-gray-800 p-3 rounded-lg transition-all duration-200 cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.224 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.227.413.56.217.96.477 1.382.896.419.42.677.819.896 1.381.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.054 1.17-.249 1.805-.413 2.227a3.81 3.81 0 0 1-.896 1.382 3.744 3.744 0 0 1-1.382.896c-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.054-1.805-.249-2.227-.413a3.81 3.81 0 0 1-1.382-.896 3.744 3.744 0 0 1-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.227.217-.56.477-.96.896-1.382a3.744 3.744 0 0 1 1.382-.896c.422-.164 1.057-.36 2.227-.413 1.265-.058 1.645-.07 4.849-.07zm0-2.162c-3.259 0-3.667.014-4.947.072-1.281.058-2.154.26-2.913.558a5.885 5.885 0 0 0-2.134 1.389 5.868 5.868 0 0 0-1.389 2.134c-.297.759-.5 1.632-.558 2.913-.058 1.281-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.281.26 2.154.558 2.913a5.885 5.885 0 0 0 1.389 2.134 5.868 5.868 0 0 0 2.134 1.389c.759.297 1.632.5 2.913.558 1.281.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.281-.058 2.154-.26 2.913-.558a5.885 5.885 0 0 0 2.134-1.389 5.868 5.868 0 0 0 1.389-2.134c.297-.759.5-1.632.558-2.913.058-1.281.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.281-.26-2.154-.558-2.913a5.885 5.885 0 0 0-1.389-2.134A5.868 5.868 0 0 0 19.86.63c-.759-.297-1.632-.5-2.913-.558C15.667.014 15.259 0 12 0z"/>
                    <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Send us a Message</h2>
              <p className="text-sm text-gray-500 mb-6">We'll get back within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 bg-gray-50 focus:bg-white text-sm cursor-pointer"
                  >
                    <option value="">Choose a topic</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="pc-build-consultation">PC Build Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 resize-none bg-gray-50 focus:bg-white text-sm"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-yellow-400/40 transform hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Message</span>
                  </div>
                </button>
              </form>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Response
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>Email: 2-4 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>Phone: Immediate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>Tech support: Same day</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>Orders: Real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
