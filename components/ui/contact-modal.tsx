"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import { ArrowUpRight, Mail, Phone, MessageSquare } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ContactModal = ({ open, setOpen }: ContactModalProps) => {
  const [scope, animate] = useAnimate();

  const handleClose = async () => {
    await animate(scope.current, {
      opacity: [1, 0],
    });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[55vh] w-full overflow-hidden rounded-t-3xl bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/20"
          >
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                ✖
              </button>
            </div>
            
            <div className="h-full overflow-y-auto px-4 md:px-6 py-6">
              <div className="mx-auto max-w-2xl space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Let's Create Something Amazing</h2>
                  <p className="text-sm md:text-base text-white/70">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-white/80">Contact Number</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-white/80">Company/Business Name</label>
                      <input
                        type="text"
                        id="company"
                        className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="position" className="text-sm font-medium text-white/80">Company/Business Position</label>
                    <input
                      type="text"
                      id="position"
                      className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder="Your position in the company"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="project" className="text-sm font-medium text-white/80">Project Type</label>
                      <div className="relative">
                        <select
                          id="project"
                          className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none pr-10"
                        >
                          <option value="" className="bg-black">Select a project type</option>
                          <option value="marketing" className="bg-black">Marketing</option>
                          <option value="development" className="bg-black">Development</option>
                          <option value="production" className="bg-black">Production</option>
                          <option value="consulting" className="bg-black">Consulting</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium text-white/80">Project Budget</label>
                      <div className="relative">
                        <select
                          id="budget"
                          className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none pr-10"
                        >
                          <option value="" className="bg-black">Select a budget range</option>
                          <option value="5k-10k" className="bg-black">$5,000 - $10,000</option>
                          <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                          <option value="25k-50k" className="bg-black">$25,000 - $50,000</option>
                          <option value="50k+" className="bg-black">$50,000+</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full rounded-lg bg-white/5 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="group flex-1 rounded-lg bg-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-black transition-all hover:bg-white/90"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}; 