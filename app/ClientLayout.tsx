"use client"

import React, { memo, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

const inter = Inter({ subsets: ["latin"], weight: ["100", "400", "700"] })

const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      } ${inter.className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tighter">
          fiveroses
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-lg font-light tracking-wide hover:text-accent transition-all duration-300">
            Home
          </Link>
          <Link href="/work" className="text-lg font-light tracking-wide hover:text-accent transition-all duration-300">
            Work
          </Link>
          <Link href="/news" className="text-lg font-light tracking-wide hover:text-accent transition-all duration-300">
            News
          </Link>
          <Link href="/contact" className="text-lg font-light tracking-wide hover:text-accent transition-all duration-300">
            Contact
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  )
})

const MobileNav = memo(function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.5 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }
  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }),
  }
  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <motion.div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center ${inter.className}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <nav className="flex flex-col items-center gap-12">
          {[
            { href: "/", label: "Home" },
            { href: "/work", label: "Work" },
            { href: "/news", label: "News" },
            { href: "/contact", label: "Contact" },
          ].map((link, i) => (
            <motion.div key={link.href} custom={i} variants={linkVariants}>
              <Link href={link.href} className="text-3xl font-light tracking-wide hover:text-accent transition-all duration-300" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </div>
  )
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
