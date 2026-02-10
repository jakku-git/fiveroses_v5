"use client"

import React, { memo, useEffect, useState } from "react"
import { Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Menu, X, Instagram, Twitter, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import styles from "./components/navbar-bubble.module.css"
import { useIsMobile } from "@/components/ui/use-mobile"

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] })
const crimsonText = Crimson_Text({ 
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: '--font-crimson'
})

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <>
      {/* Desktop Header */}
      <header
        className={`hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[800px] ${
          isScrolled 
            ? "bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] border-white/20" 
            : "bg-gradient-to-r from-black/30 via-black/25 to-black/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] border-white/15"
        } ${inter.className} rounded-full border`}
      >
        <div className="w-full px-16 py-3 flex justify-between items-center">
          <nav className="flex items-center gap-16">
            <NavLink href="/work" text="Work" />
            <NavLink href="/news" text="News" />
          </nav>
          <Link 
            href="/" 
            className={`${styles.navLink} text-3xl font-bold tracking-tighter text-white hover:text-white/90 transition-colors duration-300`}
          >
            <span className="font-black">fiveroses</span>
          </Link>
          <nav className="flex items-center gap-16">
            <NavLink href="/about" text="About" />
            <NavLink href="/contact" text="Contact" />
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-4">
          <Link 
            href="/" 
            className="text-2xl font-black tracking-tighter text-white"
          >
            fiveroses
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white touch-manipulation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
})

const MobileNav = memo(function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuVariants = {
    closed: { 
      x: "100%",
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      } 
    },
    open: { 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      } 
    },
  }
  
  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.1 + i * 0.05,
        duration: 0.3
      } 
    }),
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Menu Panel */}
      <motion.div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black z-50 shadow-2xl ${inter.className}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex flex-col h-full">
          {/* Menu Content */}
          <div className="flex-1 flex flex-col justify-center px-8">
            <nav className="flex flex-col gap-6">
              {[
                { href: "/work", label: "Work" },
                { href: "/news", label: "News" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link, i) => (
                <motion.div key={link.href} custom={i} variants={linkVariants}>
                  <Link 
                    href={link.href} 
                    className="text-4xl font-light tracking-tight text-white/90 active:text-white transition-colors touch-manipulation py-2 block" 
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <motion.div 
            className="px-8 pb-12 border-t border-white/10 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-white/40 text-sm mb-4 uppercase tracking-wider">Connect</p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <button
                  key={social.label}
                  className="p-3 text-white/60 active:text-white transition-colors touch-manipulation bg-white/5 rounded-full"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
})

const Footer = memo(function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer className="w-full bg-black text-white py-16 md:py-32 border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
          {/* Brand Section */}
          <div className="space-y-4 md:space-y-6">
            <Link 
              href="/" 
              className="text-3xl md:text-4xl font-bold tracking-tighter hover:text-white/90 transition-colors duration-300 inline-block"
            >
              <span className="font-black">fiveroses</span>
            </Link>
            <p className="text-sm md:text-base text-white/60 font-light tracking-wide leading-relaxed">
            We bring your ideas into reality. Petal by petal. Pixel by pixel.
            </p>
            <div className="pt-2">
              <a href="tel:1800981170" className="text-base md:text-lg text-white/80 hover:text-white transition-colors font-bold">
                1800 981 170
              </a>
            </div>
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
                { title: "Consulting", href: "/work/incubator" },
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
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social) => (
                isMobile ? (
                  <button
                    key={social.label}
                    className="p-3 text-white/60 hover:text-white active:text-white/40 transition-colors duration-300 touch-manipulation"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </button>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                )
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
            <div className="flex space-x-12">
              <Link href="/opportunities" className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/40 hover:text-white/60 uppercase mr-12`}>
                Opportunities
              </Link>
              <Link href="/privacy" className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/40 hover:text-white/60 uppercase mr-12`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`${styles.navLink} text-[13px] font-normal tracking-[0.02em] text-white/40 hover:text-white/60 uppercase`}>
                Terms of Service
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
      <main className={`min-h-screen ${crimsonText.variable}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}
