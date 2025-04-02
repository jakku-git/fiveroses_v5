"use client"

import React, { memo, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Menu, X, Instagram, Twitter, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import styles from "./components/navbar-bubble.module.css"

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] })

const NavLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white uppercase`}>
      {text.split("").map((char, idx) => (
        <span 
          className={styles.bubbleText} 
          key={idx}
          style={{ '--index': idx } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </Link>
  )
}

const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[800px] ${
        isScrolled 
          ? "bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] border-white/20" 
          : "bg-gradient-to-r from-black/30 via-black/25 to-black/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] border-white/15"
      } ${inter.className} rounded-full border`}
    >
      <div className="w-full px-16 py-3 flex justify-between items-center relative">
        <nav className="hidden md:flex items-center gap-16">
          <NavLink href="/work" text="Work" />
          <NavLink href="/news" text="News" />
        </nav>
        <Link 
          href="/" 
          className={`${styles.navLink} text-3xl font-bold tracking-tighter text-white hover:text-white/90 transition-colors duration-300`}
        >
          <span className="font-black">fiveroses</span>
        </Link>
        <nav className="hidden md:flex items-center gap-16">
          <NavLink href="/about" text="About" />
          <NavLink href="/contact" text="Contact" />
        </nav>
        <div className="md:hidden absolute right-4">
          <MobileNav />
        </div>
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
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center ${inter.className}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <nav className="flex flex-col items-center gap-8">
          {[
            { href: "/work", label: "Work" },
            { href: "/news", label: "News" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link, i) => (
            <motion.div key={link.href} custom={i} variants={linkVariants}>
              <Link 
                href={link.href} 
                className="text-2xl font-[200] tracking-wide text-white/90 hover:text-white uppercase transition-all duration-300" 
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
})

const Footer = memo(function Footer() {
  return (
    <footer className="w-full bg-black text-white py-32 border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link 
              href="/" 
              className="text-4xl font-bold tracking-tighter hover:text-white/90 transition-colors duration-300 inline-block"
            >
              <span className="font-black">fiveroses</span>
            </Link>
            <p className="text-base text-white/60 font-light tracking-wide leading-relaxed">
              Crafting digital experiences that inspire and innovate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: "/work", label: "Work" },
                { href: "/news", label: "News" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/60 hover:text-white uppercase`}
                  >
                    {link.label.split("").map((char, idx) => (
                      <span 
                        className={styles.bubbleText} 
                        key={idx}
                        style={{ '--index': idx } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                { title: "Marketing / Strategy", href: "/work/marketing" },
                { title: "Development / Solutions", href: "/work/web-solutions" },
                { title: "Creation / Production", href: "/work/creative-production" },
                { title: "Incubator / Consulting", href: "/work/incubator" },
              ].map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href}
                    className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/60 hover:text-white uppercase`}
                  >
                    {service.title.split("").map((char, idx) => (
                      <span 
                        className={styles.bubbleText} 
                        key={idx}
                        style={{ '--index': idx } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-6">Connect</h3>
            <div className="flex space-x-6">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} fiveroses. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy" className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/40 hover:text-white/60 uppercase`}>
                {["Privacy Policy"].map((text) => (
                  <span key={text}>
                    {text.split("").map((char, idx) => (
                      <span 
                        className={styles.bubbleText} 
                        key={idx}
                        style={{ '--index': idx } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </Link>
              <Link href="/terms" className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/40 hover:text-white/60 uppercase`}>
                {["Terms of Service"].map((text) => (
                  <span key={text}>
                    {text.split("").map((char, idx) => (
                      <span 
                        className={styles.bubbleText} 
                        key={idx}
                        style={{ '--index': idx } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
