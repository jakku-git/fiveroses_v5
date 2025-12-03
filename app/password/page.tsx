'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

function PasswordForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  useEffect(() => {
    // If already authenticated (cookie exists and is fresh), redirect to the original page
    const siteAuth = Cookies.get('site-auth') || ''
    if (siteAuth.startsWith('xvii-')) {
      const timestamp = parseInt(siteAuth.split('-')[1] || '0')
      const now = Date.now()
      // Only redirect if cookie is fresh (within last 2 seconds)
      if ((now - timestamp) < 2000) {
        window.location.href = from;
      }
    }
  }, [from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'xvii') {
      // Set cookie with current timestamp - middleware will check if it's fresh
      const timestamp = Date.now().toString();
      Cookies.set('site-auth', `xvii-${timestamp}`, { expires: 1 }); // Expires in 1 day as fallback
      // Use window.location for full page reload to ensure cookie is sent
      window.location.href = from;
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extralight mb-2 text-white tracking-tight">
          Password Protected
        </h1>
        <p className="text-base text-white/60 font-light">
          Please enter the password to view this content
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value);
            }}
            className={`w-full px-4 py-3 border ${
              error ? 'border-red-500' : 'border-white/20'
            } rounded-lg bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/40`}
            placeholder="Enter password"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">
              Incorrect password. Please try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}

export default function PasswordPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="w-full max-w-md text-center">
          <p className="text-white/60">Loading...</p>
        </div>
      }>
        <PasswordForm />
      </Suspense>
    </main>
  );
}

