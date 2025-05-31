"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import { ArrowUpRight, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ContactModal = ({ open, setOpen }: ContactModalProps) => {
  const [scope, animate] = useAnimate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    projectType: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          jobTitle: formData.jobTitle,
          company: formData.company,
          location: formData.phone, // Using phone as location
          market: formData.projectType, // Using projectType as market
          comment: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        projectType: '',
        message: ''
      });

      // Close modal
      handleClose();
      
      // Show success message
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            <div className="h-full overflow-y-auto md:overflow-y-visible">
              <div className="mx-auto max-w-2xl space-y-3 md:space-y-4 p-4 md:p-6">
                <div className="space-y-1 md:space-y-2 text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-white">Let's Create Something Amazing</h2>
                  <p className="text-xs md:text-sm text-white/70">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
                  <div className="grid grid-cols-1 gap-2 md:gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="firstName" className="text-xs md:text-sm font-medium text-white/80">Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs md:text-sm font-medium text-white/80">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs md:text-sm font-medium text-white/80">Contact Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="company" className="text-xs md:text-sm font-medium text-white/80">Company/Business Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="jobTitle" className="text-xs md:text-sm font-medium text-white/80">Company/Business Position</label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder="Your position in the company"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="projectType" className="text-xs md:text-sm font-medium text-white/80">Project Type</label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none pr-10"
                      >
                        <option value="" className="bg-black">Select a project type</option>
                        <option value="marketing" className="bg-black">Marketing</option>
                        <option value="development" className="bg-black">Development</option>
                        <option value="production" className="bg-black">Production</option>
                        <option value="consulting" className="bg-black">Consulting</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs md:text-sm font-medium text-white/80">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex-1 rounded-lg bg-white px-4 py-1.5 text-xs md:text-sm text-black transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
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