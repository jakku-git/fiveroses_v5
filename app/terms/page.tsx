"use client";

import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Agreement to Terms",
    content: `By accessing or using the services provided by fiveroses, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.`
  },
  {
    title: "Services Description",
    content: `fiveroses provides the following services:
    • Marketing & Strategy
    • Development & Solutions
    • Creation & Production
    • Incubator & Consulting
    
    We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.`
  },
  {
    title: "User Responsibilities",
    content: `As a user of our services, you agree to:
    • Provide accurate and complete information
    • Maintain the security of your account
    • Not use our services for any illegal purposes
    • Not interfere with the proper working of our services
    • Not attempt to gain unauthorized access to our systems
    • Not use our services to transmit malicious code or viruses`
  },
  {
    title: "Intellectual Property",
    content: `All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of fiveroses and are protected by international copyright, trademark, and other intellectual property laws.`
  },
  {
    title: "Payment Terms",
    content: `• All fees are payable in advance
    • Prices are subject to change with notice
    • We accept various payment methods as indicated on our website
    • Refunds are subject to our refund policy
    • Late payments may result in service suspension`
  },
  {
    title: "Termination",
    content: `We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.`
  },
  {
    title: "Limitation of Liability",
    content: `fiveroses shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.`
  },
  {
    title: "Disclaimer",
    content: `Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or secure.`
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date.`
  },
  {
    title: "Governing Law",
    content: `These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.`
  },
  {
    title: "Contact Information",
    content: `If you have any questions about these Terms of Service, please contact us at:
    Email: legal@fiveroses.com
    Address: [Your Business Address]
    Phone: [Your Phone Number]`
  }
];

// Extract animation variants to prevent recreation on each render
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
} as const;

const slideIn = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
} as const;

// Memoize the date to prevent unnecessary re-renders
const lastUpdated = new Date().toLocaleDateString();

export default function TermsOfService() {
  // Memoize the section render function
  const renderSection = useCallback((section: typeof sections[0], index: number) => (
    <motion.div
      key={section.title}
      {...slideIn}
      transition={{ delay: 0.8 + (index * 0.1) }}
      className="space-y-8"
    >
      <motion.h2 
        className="text-4xl md:text-5xl font-extralight tracking-[-0.02em] leading-[1.2]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.9 + (index * 0.1) }}
      >
        {section.title}
      </motion.h2>
      <motion.div 
        className="text-white/70 leading-relaxed whitespace-pre-line text-lg tracking-wide font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1 + (index * 0.1) }}
      >
        {section.content}
      </motion.div>
    </motion.div>
  ), []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm tracking-[0.2em] uppercase font-light">Back to Home</span>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-32">
        <motion.div
          {...fadeInUp}
          className="space-y-8 mb-24"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-extralight tracking-[-0.02em] leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Terms of Service
          </motion.h1>
          <motion.div 
            className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-white/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />
          <motion.p 
            className="text-white/60 text-lg tracking-[0.1em] uppercase font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>

        <div className="space-y-32">
          <AnimatePresence mode="wait">
            {sections.map(renderSection)}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
} 