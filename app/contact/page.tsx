"use client";

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import Image from "next/image"
import { GlobeWrapper } from "@/components/ui/globe-wrapper"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    email: '',
    location: '',
    market: '',
    comment: '',
    privacy: false
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if in cooldown
    if (cooldown > 0) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Start cooldown timer
      setCooldown(30);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Reset form after a delay to show success state
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          jobTitle: '',
          company: '',
          email: '',
          location: '',
          market: '',
          comment: '',
          privacy: false
        });
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000); // Reset success state after 5s
      }, 500);

    } catch (error) {
      // Handle error - you might want to show an error message
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white">
      {/* Hero Section */}
      <section className="w-full h-screen flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <GlobeWrapper />
        </div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">fiveroses</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-white">
                Get in Touch
              </h2>
              <p className="text-lg text-neutral-400 mb-12 font-light leading-relaxed">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8">
                <motion.div 
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-neutral-100 transition-colors">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Email</h3>
                    <p className="text-neutral-400">hello@fiveroses.com.au</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold mb-6 text-white">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Youtube, label: 'YouTube' }
                  ].map(({ icon: Icon, label }) => (
                    <motion.button
                      key={label}
                      type="button"
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      <Icon className="w-6 h-6 text-black" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl blur-3xl" />
              <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer text-white"
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.firstName
                            ? '-top-2 text-xs text-white bg-black px-2'
                            : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                        }`}
                      >
                        First Name*
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer text-white"
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.lastName
                            ? '-top-2 text-xs text-white bg-black px-2'
                            : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                        }`}
                      >
                        Last Name*
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer text-white"
                        required
                      />
                      <label
                        htmlFor="jobTitle"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.jobTitle
                            ? '-top-2 text-xs text-white bg-black px-2'
                            : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                        }`}
                      >
                        Job Title*
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer text-white"
                        required
                      />
                      <label
                        htmlFor="company"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.company
                            ? '-top-2 text-xs text-white bg-black px-2'
                            : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                        }`}
                      >
                        Company*
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer text-white"
                        required
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.email
                            ? '-top-2 text-xs text-white bg-black px-2'
                            : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                        }`}
                      >
                        Email Address*
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer text-white"
                        required
                      />
                      <label
                        htmlFor="location"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.location
                            ? '-top-2 text-xs text-white bg-black px-2'
                            : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                        }`}
                      >
                        Location*
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      id="market"
                      name="market"
                      value={formData.market}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer appearance-none text-white"
                      required
                    >
                      <option value="" className="bg-black">Select Market</option>
                      <option value="north-america" className="bg-black">North America</option>
                      <option value="europe" className="bg-black">Europe</option>
                      <option value="asia" className="bg-black">Asia</option>
                      <option value="australia" className="bg-black">Australia</option>
                      <option value="other" className="bg-black">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-4 bg-white/5 border border-white rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors peer resize-none text-white"
                      required
                    />
                    <label
                      htmlFor="comment"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        formData.comment
                          ? '-top-2 text-xs text-white bg-black px-2'
                          : 'top-4 text-neutral-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-focus:bg-black peer-focus:px-2'
                      }`}
                    >
                      Message*
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 bg-white/5 border border-white rounded focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-neutral-400">
                      I agree to the{" "}
                      <Link href="/privacy" className="text-white hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSuccess || cooldown > 0}
                    className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed ${
                      isSuccess 
                        ? 'bg-green-500 text-white disabled:opacity-100' 
                        : cooldown > 0
                        ? 'bg-neutral-500 text-white disabled:opacity-70'
                        : 'bg-white text-black hover:bg-neutral-100 disabled:opacity-50'
                    }`}
                    whileHover={{ scale: cooldown > 0 ? 1 : 1.02 }}
                    whileTap={{ scale: cooldown > 0 ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : isSuccess ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent!
                      </>
                    ) : cooldown > 0 ? (
                      <>
                        <Loader2 className="w-5 h-5" />
                        Wait {cooldown}s
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full">
        <FaqAccordion />
      </section>
    </main>
  );
}

const faqs = [
  {
    question: "What services does fiveroses offer?",
    answer:
      "fiveroses offers a comprehensive range of marketing services, including digital marketing, brand strategy, web development, creative production, and startup incubation.",
  },
  {
    question: "How do I get started with fiveroses?",
    answer:
      "Simply fill out the contact form on this page or give us a call. We'll schedule an initial consultation to discuss your needs and how we can help.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary depending on the scope and complexity of the work. During our initial consultation, we'll provide you with a detailed timeline for your specific project.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes, we work with clients from around the world. Our digital capabilities allow us to collaborate effectively regardless of location.",
  },
  {
    question: "How do you measure the success of your marketing campaigns?",
    answer:
      "We use a data-driven approach to measure the success of our campaigns, tracking key performance indicators (KPIs) that align with your business goals.",
  },
]

