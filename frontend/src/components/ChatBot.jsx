import React, { useState, useRef, useEffect, useContext } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react'
import { AppContext } from '../context/AppContext'




const QUICK_REPLIES = [
  'How do I get my voucher code?',
  'My code is not working',
  'I want a refund',
  'How to place an order?',
  'What payment methods do you accept?',
]

const ChatBot = () => {
  const { user, BACKEND_URL } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${user?.fullName?.split(' ')[0] || 'there'} 👋 I'm the Voucher Cash support bot! How can I help you today?`,
      id: 'welcome'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const userMsg = { role: 'user', content: userText, id: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Build history for Groq (role + content only)
      const history = messages.map(({ role, content }) => ({ role, content }))
      history.push({ role: 'user', content: userText })

      const res = await fetch(`${BACKEND_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ messages: history })
      })

      if (!res.ok) throw new Error('Backend error')

      const data = await res.json()
      if (!data.success) throw new Error(data.message)

      const reply = data.reply

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: reply,
        id: Date.now() + 1
      }])

      if (!isOpen) setHasNewMessage(true)
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Something went wrong. Please try again or email us at support@vouchercash.in',
        id: Date.now() + 1
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Hi ${user?.fullName?.split(' ')[0] || 'there'} 👋 I'm the Voucher Cash support bot! How can I help you today?`,
      id: 'welcome'
    }])
    setInput('')
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[60] w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-xl hover:shadow-amber-300/50 hover:scale-110 transition-all duration-200 flex items-center justify-center"
        aria-label="Open support chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-black" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
            )}
          </>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 md:bottom-28 md:right-8 z-[60] w-[calc(100vw-2rem)] max-w-sm shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">Voucher Cash Support</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-[10px] font-medium">AI Assistant · Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset chat"
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.role === 'assistant'
                    ? 'bg-amber-400 text-black'
                    : 'bg-slate-800 text-white'
                }`}>
                  {msg.role === 'assistant' ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'assistant'
                    ? 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'
                    : 'bg-gradient-to-br from-amber-400 to-yellow-500 text-black rounded-tr-sm font-medium'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies — only show when messages are few */}
          {messages.length <= 2 && !loading && (
            <div className="bg-slate-50 px-3 pb-1 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[11px] font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all cursor-pointer whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="bg-white border-t border-slate-100 px-3 py-2.5 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all placeholder:text-slate-400 disabled:opacity-60"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center hover:shadow-md hover:shadow-amber-300/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot
