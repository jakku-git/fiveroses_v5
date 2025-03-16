"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const inter = Inter({ subsets: ["latin"] })

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y)
      setIsPointer(
        hoveredElement?.tagName === "A" ||
          hoveredElement?.tagName === "BUTTON" ||
          hoveredElement?.closest("a") !== null ||
          hoveredElement?.closest("button") !== null,
      )
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousemove", updateCursorType)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousemove", updateCursorType)
    }
  }, [position])

  return (
    <>
      <motion.div
        className="custom-cursor cursor-dot"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor cursor-outline"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.8 }}
      />
    </>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-light tracking-tighter">
          fiveroses
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/work" className="text-sm hover:text-accent transition-colors">
            Work
          </Link>
          <Link href="/news" className="text-sm hover:text-accent transition-colors">
            News
          </Link>
          <Link href="/contact" className="text-sm hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <motion.div
        className="fixed inset-0 top-0 bg-black z-40 flex flex-col items-center justify-center"
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
              <Link
                href={link.href}
                className="text-3xl font-light tracking-tight hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-tighter">fiveroses</h3>
            <p className="text-sm text-neutral-400">Full-service marketing agency helping your business bloom.</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/work/marketing" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/work/web-solutions"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Web Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/work/creative-production"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Creative Production
                </Link>
              </li>
              <li>
                <Link href="/work/incubator" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Startup Incubator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-neutral-400">&copy; {new Date().getFullYear()} fiveroses. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-neutral-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-neutral-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

