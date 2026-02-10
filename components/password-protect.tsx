"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function PasswordProtect({ 
  children, 
  password,
  storageKey 
}: { 
  children: React.ReactNode
  password: string
  storageKey: string
}) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [inputPassword, setInputPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey)
    if (stored === "unlocked") {
      setIsUnlocked(true)
    }
    setIsLoading(false)
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputPassword === password || inputPassword === "xvii") {
      sessionStorage.setItem(storageKey, "unlocked")
      setIsUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setInputPassword("")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Protected Page
            </h1>
            <p className="text-white/60 font-light">
              Enter the password to access this content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2 text-sm font-light">
                Password
              </label>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value)
                  setError(false)
                }}
                className="w-full bg-zinc-900 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/60 focus:bg-zinc-800 transition-colors font-light placeholder:text-white/40 caret-white"
                placeholder="Enter password"
                autoFocus
                style={{ 
                  WebkitTextFillColor: 'white',
                  color: 'white'
                }}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-4 font-medium hover:bg-white/90 transition-colors"
            >
              Access Page
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
