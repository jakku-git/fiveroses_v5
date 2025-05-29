'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

function PasswordForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/work';

  useEffect(() => {
    // If already authenticated, redirect to the original page
    if (Cookies.get('work-auth') === 'xvii') {
      router.push(from);
    }
  }, [from, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'xvii') {
      Cookies.set('work-auth', 'xvii', { expires: 7 }); // Cookie expires in 7 days
      router.push(from);
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
        <h1 className="text-2xl md:text-3xl font-extralight mb-2 text-black tracking-tight">
          Password Protected
        </h1>
        <p className="text-base text-black/60 font-light">
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
              error ? 'border-red-500' : 'border-black/10'
            } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/40`}
            placeholder="Enter password"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">
              Incorrect password. Please try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}

export default function PasswordPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="w-full max-w-md text-center">
          <p className="text-black/60">Loading...</p>
        </div>
      }>
        <PasswordForm />
      </Suspense>
    </main>
  );
} 