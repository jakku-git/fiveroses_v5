"use client";

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from "lucide-react"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { Metadata } from "next"
import Image from "next/image"
import { GlobeWrapper } from "@/components/ui/globe-wrapper"

export const metadata: Metadata = {
  title: "Contact Us | fiveroses",
  description: "Get in touch with fiveroses. We're here to help with your marketing, development, and creative needs.",
  openGraph: {
    title: "Contact Us | fiveroses",
    description: "Get in touch with fiveroses. We're here to help with your marketing, development, and creative needs.",
    type: "website",
  }
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full h-screen flex flex-col items-center justify-center relative bg-black text-white">
        <div className="absolute inset-0 z-0">
          <GlobeWrapper />
        </div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">fiveroses</h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8"></p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-16 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Contact Us</h2>
              <p className="text-lg text-neutral-300 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-rose-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-neutral-300">hello@fiveroses.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-rose-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-neutral-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-rose-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Office</h3>
                    <p className="text-neutral-300">
                      123 Innovation Way
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {isMobile ? (
                    <>
                      <button
                        className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        aria-label="Facebook"
                      >
                        <Image
                          src="/icons/facebook.svg"
                          alt="Facebook"
                          width={20}
                          height={20}
                          className="text-white"
                          priority
                        />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        aria-label="Twitter"
                      >
                        <Image
                          src="/icons/twitter.svg"
                          alt="Twitter"
                          width={20}
                          height={20}
                          className="text-white"
                          priority
                        />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        aria-label="Instagram"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="text-white"
                          priority
                        />
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        aria-label="Facebook"
                      >
                        <Image
                          src="/icons/facebook.svg"
                          alt="Facebook"
                          width={20}
                          height={20}
                          className="text-white"
                          priority
                        />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        aria-label="Twitter"
                      >
                        <Image
                          src="/icons/twitter.svg"
                          alt="Twitter"
                          width={20}
                          height={20}
                          className="text-white"
                          priority
                        />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        aria-label="Instagram"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="text-white"
                          priority
                        />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:border-rose-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:border-rose-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:border-rose-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:border-rose-200"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-neutral-800 border border-neutral-700 rounded"
                      required
                    />
                    <span className="text-sm text-neutral-300">
                      I agree to the{" "}
                      <a href="#" className="text-rose-200 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white text-black rounded-md hover:bg-rose-200 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full">
        <FaqAccordion />
      </section>
    </main>
  )
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

