"use client";

import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    content: `At fiveroses, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. By using our website or services, you consent to the practices described in this policy.`
  },
  {
    title: "Information We Collect",
    content: `We collect information that you provide directly to us, including but not limited to:
    • Name and contact information
    • Email address
    • Phone number
    • Company information
    • Project details
    • Communication preferences
    
    We also collect certain information automatically when you visit our website:
    • Device information
    • IP address
    • Browser type
    • Pages visited
    • Time spent on our website`
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:
    • Provide and maintain our services
    • Process your requests and transactions
    • Send you updates and marketing communications (with your consent)
    • Improve our website and services
    • Comply with legal obligations
    • Protect our rights and interests`
  },
  {
    title: "Information Sharing",
    content: `We do not sell your personal information. We may share your information with:
    • Service providers who assist in our operations
    • Business partners with your consent
    • Legal authorities when required by law
    • Other users with your explicit permission`
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
  },
  {
    title: "Your Rights",
    content: `You have the right to:
    • Access your personal information
    • Correct inaccurate data
    • Request deletion of your data
    • Opt-out of marketing communications
    • Export your data
    • Withdraw consent at any time`
  },
  {
    title: "Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to:
    • Improve website functionality
    • Analyze website traffic
    • Remember your preferences
    • Provide personalized content
    
    You can control cookie settings through your browser preferences.`
  },
  {
    title: "Children's Privacy",
    content: `Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.`
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.`
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this privacy policy, please contact us at:
    Email: privacy@fiveroses.com
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

export default function PrivacyPolicy() {
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
            Privacy Policy
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