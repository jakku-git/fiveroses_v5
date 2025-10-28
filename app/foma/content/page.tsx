"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Cormorant_Garamond } from 'next/font/google';
import { useState } from "react";
import { Lock, Mail, Download, Printer, Check, Circle, Monitor, Users, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { planData } from '../plan';
import type { BudgetItem } from '../plan';
import '../print.css';

const cormorantGaramond = Cormorant_Garamond({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

export default function FomaPage() {
  const [gstIncluded, setGstIncluded] = useState(true);
  const [kpiReached, setKpiReached] = useState({
    revenue: false,
    customers: false,
    aov: false,
  });

  // Calculate budget totals
  const calculateBudgets = () => {
    const categories = planData.items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, BudgetItem[]>);

    const totals = Object.entries(categories).map(([category, items]) => {
      const total = items.reduce((sum, item) => {
        // Calculate annual cost based on billing period
        let annualCost = item.costAudInclGst;
        if (item.billing === "Monthly") {
          annualCost = item.costAudInclGst * 12;
        } else if (item.billing === "Quarterly") {
          annualCost = item.costAudInclGst * 4;
        } else if (item.billing === "Annual" || item.billing.includes("Annual")) {
          annualCost = item.costAudInclGst;
        } else if (item.billing === "Upfront" || item.billing === "One-off") {
          annualCost = item.costAudInclGst;
        }
        return sum + annualCost;
      }, 0);
      return { category, total, items };
    });

    const grandTotal = totals.reduce((sum, cat) => sum + cat.total, 0);
    return { categories: totals, grandTotal };
  };

  const { categories, grandTotal } = calculateBudgets();
  const gstAmount = grandTotal * (planData.gstRate / (1 + planData.gstRate));

  const handleExportCSV = () => {
    const headers = ["Category", "Item", `Cost (AUD ${gstIncluded ? 'Inc GST' : 'Ex GST'})`, "Billing", "Notes"];
    const rows = planData.items.map(item => {
      // Calculate annual cost based on billing period
      let annualCost = item.costAudInclGst;
      if (item.billing === "Monthly") {
        annualCost = item.costAudInclGst * 12;
      } else if (item.billing === "Quarterly") {
        annualCost = item.costAudInclGst * 4;
      } else if (item.billing === "Annual" || item.billing.includes("Annual")) {
        annualCost = item.costAudInclGst;
      } else if (item.billing === "Upfront" || item.billing === "One-off") {
        annualCost = item.costAudInclGst;
      }
        const displayCost = gstIncluded ? annualCost : annualCost * (1 - planData.gstRate);
      return [
        item.category,
        item.item,
        displayCost.toFixed(2),
        item.billing,
        item.notes || ""
      ];
    });

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "foma-budget.csv";
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen bg-white text-zinc-900 ${cormorantGaramond.variable}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src="/fomahero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/20" />
        </div>
        <div className="relative z-20 w-[95%] sm:w-[90%] md:w-[80%] mx-auto text-center px-4">
          <motion.h1 
            className="font-light tracking-tighter mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="font-cormorant-garamond font-medium text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[18rem] leading-none text-zinc-900">FOMA</span>
            </motion.div>
            <motion.div 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Furniture Brand Launch
            </motion.div>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A 12-month, full-funnel plan to launch and scale a modern Australian furniture brand
          </motion.p>
          <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="mailto:hello@fiveroses.com.au?subject=FOMA Proposal Approval&body=Hi,%0D%0A%0D%0AI approve this proposal for the FOMA brand launch."
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900 text-white px-6 py-3 md:px-12 md:py-4 rounded-md font-medium hover:bg-zinc-800 transition-all duration-300 text-base md:text-lg relative overflow-hidden group inline-block cursor-pointer w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Approve Proposal
                <Check className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </motion.a>
            <motion.a
              href="mailto:hello@fiveroses.com.au?subject=FOMA Proposal - Download PDF&body=Hi,%0D%0A%0D%0APlease send me the PDF version of the FOMA brand launch proposal."
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-zinc-900 px-6 py-3 md:px-12 md:py-4 rounded-md font-medium border-2 border-zinc-900 hover:bg-zinc-50 transition-all duration-300 text-base md:text-lg flex items-center justify-center gap-2 inline-block cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Download PDF
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 sm:py-16 md:py-24 bg-zinc-50">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Executive Summary</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-4"
                >
                  <span className="font-cormorant-garamond font-medium text-[6rem] md:text-[8rem] leading-none text-zinc-900">
                    FOMA
                  </span>
                </motion.div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-light text-zinc-900">Brand Position</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      Modern Australian furniture brand focused on modular, responsibly-sourced designs. 
                      Positioning: "Thoughtfully designed furniture for modern living spaces."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-light text-zinc-900">Target Audience</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      Design-conscious homeowners and renters, aged 25-45, living in Australian metro areas. 
                      They value quality, sustainability, and aesthetic appeal.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-light text-zinc-900">12-Month Scope</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      Comprehensive digital transformation including brand identity, website development, 
                      content engine, paid media, SEO, lifecycle marketing, and retail pop-ups.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-light text-zinc-900">Expected Outcomes</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      Establish <span className="font-cormorant-garamond font-medium text-zinc-900">FOMA</span> as a recognized Australian furniture brand, 
                      achieve sustainable growth through multiple acquisition channels, and build a loyal customer base 
                      through exceptional experiences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="sticky top-24 space-y-8">
                  {/* Product Video */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="aspect-square bg-zinc-50 rounded-lg overflow-hidden relative border border-zinc-200"
                  >
                    <video
                      src="/foma.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover relative z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 to-transparent pointer-events-none" />
                  </motion.div>

                  {/* KPIs */}
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200">
                    <h4 className="text-xl font-light mb-6 text-zinc-900">Year 1 Goals</h4>
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="w-6 h-6 text-zinc-600" />
                          <div>
                            <p className="text-2xl font-light text-zinc-900">$500K</p>
                            <p className="text-sm text-zinc-600">Revenue Target</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Users className="w-6 h-6 text-zinc-600" />
                          <div>
                            <p className="text-2xl font-light text-zinc-900">1,200+</p>
                            <p className="text-sm text-zinc-600">Customers</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <DollarSign className="w-6 h-6 text-zinc-600" />
                          <div>
                            <p className="text-2xl font-light text-zinc-900">$500</p>
                            <p className="text-sm text-zinc-600">Average Order Value</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Identity Transformation */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Brand Identity Transformation</h2>
            
            {/* Brand Messaging */}
            <div className="mb-20">
              <h3 className="text-2xl font-light mb-8 text-zinc-900">Brand Evolution</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">Before</h4>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <div className="mb-6 p-4 bg-white rounded-lg border border-zinc-200">
                      <p className="text-zinc-600 text-lg leading-relaxed">
                        Generic online furniture presence. Basic product listings with minimal brand story. 
                        Limited visual identity and inconsistent messaging across touchpoints.
                      </p>
                    </div>
                    <div className="space-y-4">
                      {[
                        "Basic product-focused messaging",
                        "Limited brand personality",
                        "Generic visual identity",
                        "Functional product descriptions"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <Circle className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">After</h4>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <div className="mb-6 p-4 bg-white rounded-lg border border-zinc-200">
                      <p className="text-zinc-600 text-lg leading-relaxed">
                        <span className="font-cormorant-garamond font-medium text-zinc-900">FOMA</span>
                        <span className="italic">. Thoughtfully designed furniture for modern living. Responsibly sourced materials, 
                        modular designs, and timeless aesthetics that transform spaces.</span>
                      </p>
                    </div>
                    <div className="space-y-4">
                      {[
                        "Premium design-led positioning",
                        "Rich brand storytelling",
                        "Distinctive visual identity",
                        "Emotional connection with lifestyle"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <Check className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Values */}
            <div className="mb-20">
              <h3 className="text-2xl font-light mb-8 text-zinc-900">Our Brand Pillars</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Monitor,
                    title: "Design-Led",
                    description: "Every piece is thoughtfully crafted with modern aesthetics and functionality in mind."
                  },
                  {
                    icon: Circle,
                    title: "Modular & Versatile",
                    description: "Solutions that adapt to your space and lifestyle, today and tomorrow."
                  },
                  {
                    icon: Check,
                    title: "Responsibly Sourced",
                    description: "Sustainable materials and ethical manufacturing practices we're proud of."
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="p-8 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300 bg-zinc-50 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <value.icon className="w-6 h-6 text-zinc-600" />
                    </div>
                    <h4 className="text-2xl font-light mb-4 text-zinc-900">{value.title}</h4>
                    <p className="text-zinc-600 text-lg leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Identity Samples */}
            <div className="mb-20">
              <h3 className="text-2xl font-light mb-8 text-zinc-900">Visual Identity</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200">
                  <h4 className="text-xl font-light mb-4 text-zinc-900">Typography</h4>
                  <div className="space-y-2">
                    <p className="font-cormorant-garamond text-3xl text-zinc-900">FOMA</p>
                    <p className="text-zinc-600">Body text uses system font</p>
                  </div>
                </div>
                <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200">
                  <h4 className="text-xl font-light mb-4 text-zinc-900">Color Palette</h4>
                  <div className="space-y-3">
                    <div className="h-12 bg-zinc-900 rounded" />
                    <div className="h-12 bg-zinc-100 rounded" />
                  </div>
                </div>
                <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200">
                  <h4 className="text-xl font-light mb-4 text-zinc-900">Tone of Voice</h4>
                  <p className="text-zinc-600">Warm, modern, thoughtful. Premium without pretension.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Digital Transformation */}
      <section className="py-12 sm:py-16 md:py-24 bg-zinc-50">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Digital Transformation</h2>
            
            {/* Channel Comparison */}
            <div className="mb-20">
              <h3 className="text-2xl font-light mb-8 text-zinc-900">The Digital Ecosystem</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Site Foundations",
                    description: "Product pages (PDPs), category pages (PLPs), filtering, reviews, CRO optimization, and comprehensive analytics setup."
                  },
                  {
                    title: "Content Engine",
                    description: "Lookbooks, maker stories, space-saving tips, care guides, and user-generated content prompts."
                  },
                  {
                    title: "Lifecycle Marketing",
                    description: "Welcome flows, browse/cart abandonment, post-purchase care sequences, and strategic upsell campaigns."
                  },
                  {
                    title: "Paid Acquisition",
                    description: "Meta, Google, and Pinterest ads with creative testing, retargeting, and performance optimization."
                  },
                  {
                    title: "SEO Strategy",
                    description: "Topic clusters (sofa, dining, storage), comparison pages, care guides, and technical optimization."
                  },
                  {
                    title: "PR & Partnerships",
                    description: "Micro-creator seeding, home tours, UGC programs, and editorial features in design press."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-8 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300 bg-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-xl font-light mb-4 text-zinc-900">{item.title}</h4>
                    <p className="text-zinc-600 text-lg leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12-Month Timeline */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Journey to Launch</h2>
            <div className="space-y-12">
              {[
                {
                  phase: "Phase 1: Foundations",
                  duration: "Weeks 1-6",
                  description: "Brand system finalisation, site build, analytics, and initial content production",
                  tasks: [
                    "Brand identity refinement and guidelines",
                    "Website design & development",
                    "Analytics & tracking implementation",
                    "Initial content creation and asset library"
                  ]
                },
                {
                  phase: "Phase 2: Go-To-Market",
                  duration: "Weeks 7-14",
                  description: "Paid pilot campaigns, SEO launch, email automation, and creator partnerships",
                  tasks: [
                    "Meta & Google ad campaigns launch",
                    "SEO topic clusters & content publishing",
                    "Email lifecycle flows activation",
                    "Micro-creator seeding and partnerships"
                  ]
                },
                {
                  phase: "Phase 3: Scale",
                  duration: "Weeks 15-30",
                  description: "Expand SKU storytelling, Pinterest strategy, PR launch, and first pop-up",
                  tasks: [
                    "Enhanced product storytelling & photography",
                    "Pinterest ads and organic strategy",
                    "PR campaign and editorial outreach",
                    "First retail pop-up event"
                  ]
                },
                {
                  phase: "Phase 4: Peak & Optimize",
                  duration: "Weeks 31-48",
                  description: "Seasonal campaigns, bundle promotions, loyalty program, and second pop-up",
                  tasks: [
                    "Seasonal campaign execution",
                    "Bundle & cross-sell promotions",
                    "Loyalty program beta launch",
                    "Second retail pop-up event"
                  ]
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300 bg-zinc-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-light mb-2 text-zinc-900">{phase.phase}</h3>
                      <p className="text-zinc-600 text-lg">{phase.description}</p>
                    </div>
                    <span className="text-zinc-600 mt-2 md:mt-0">{phase.duration}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-start space-x-3 text-zinc-600 group">
                        <Check className="text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                        <span className="text-lg group-hover:text-zinc-700 transition-colors duration-300">{task}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget & Plan Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-zinc-50">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
          <motion.div {...fadeInUp}>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-light text-zinc-900">Budget & Plan</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleExportCSV}
                  className="px-6 py-2 border border-zinc-300 rounded-md hover:bg-zinc-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  CSV
                </button>
                <button
                  onClick={handlePrint}
                  className="px-6 py-2 border border-zinc-300 rounded-md hover:bg-zinc-50 transition-colors flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {/* GST Toggle */}
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white rounded-lg border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-base md:text-lg font-light text-zinc-900 mb-1">Display Prices</p>
                <p className="text-xs md:text-sm text-zinc-600">Toggle to view prices with or without GST</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gstIncluded}
                  onChange={(e) => setGstIncluded(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative w-14 h-8 rounded-full transition-colors ${gstIncluded ? 'bg-zinc-900' : 'bg-zinc-300'}`}>
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${gstIncluded ? 'translate-x-6' : ''}`} />
                </div>
                <span className="ml-3 text-zinc-700">
                  {gstIncluded ? 'Inc GST' : 'Ex GST'}
                </span>
              </label>
            </div>

            {/* Budget Table */}
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full border-collapse min-w-[600px]">
                <thead className="bg-zinc-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-left border-b border-zinc-200 text-xs md:text-sm font-medium text-zinc-700">Category</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-left border-b border-zinc-200 text-xs md:text-sm font-medium text-zinc-700">Item</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-right border-b border-zinc-200 text-xs md:text-sm font-medium text-zinc-700">Cost</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-left border-b border-zinc-200 text-xs md:text-sm font-medium text-zinc-700 hidden sm:table-cell">Billing</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-left border-b border-zinc-200 text-xs md:text-sm font-medium text-zinc-700 hidden lg:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(({ category, items }, catIndex) => (
                    <>
                      {items.map((item, itemIndex) => {
                        // Calculate annual cost based on billing period
                        let annualCost = item.costAudInclGst;
                        if (item.billing === "Monthly") {
                          annualCost = item.costAudInclGst * 12;
                        } else if (item.billing === "Quarterly") {
                          annualCost = item.costAudInclGst * 4;
                        } else if (item.billing === "Annual" || item.billing.includes("Annual")) {
                          annualCost = item.costAudInclGst;
                        } else if (item.billing === "Upfront" || item.billing === "One-off") {
                          annualCost = item.costAudInclGst;
                        }
                        
                        // Apply GST toggle: if including GST, show the value; if excluding, multiply by 0.9
                        const displayCost = gstIncluded ? annualCost : annualCost * (1 - planData.gstRate);
                        const totalCategory = categories.find(c => c.category === category)?.total || 0;
                        const categoryDisplayTotal = gstIncluded ? totalCategory : totalCategory * (1 - planData.gstRate);
                        
                        return (
                          <motion.tr
                            key={`${catIndex}-${itemIndex}`}
                            className="hover:bg-zinc-50 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: (catIndex + itemIndex) * 0.05 }}
                          >
                            <td className="px-3 py-3 md:px-6 md:py-4 border-b border-zinc-100 text-zinc-700 text-xs md:text-sm">{item.category}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 border-b border-zinc-100 text-xs md:text-sm">
                              <div className="flex items-center gap-2">
                                {item.item}
                                {item.fixed && <Lock className="w-3 h-3 md:w-4 md:h-4 text-zinc-400" />}
                              </div>
                            </td>
                            <td className="px-3 py-3 md:px-6 md:py-4 border-b border-zinc-100 text-right font-medium text-sm md:text-base">${displayCost.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 border-b border-zinc-100 text-zinc-600 text-xs md:text-sm hidden sm:table-cell">{item.billing}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 border-b border-zinc-100 text-xs md:text-sm text-zinc-600 hidden lg:table-cell">{item.notes}</td>
                          </motion.tr>
                        );
                      })}
                      {/* Category Subtotal */}
                      <tr key={`subtotal-${category}`} className="bg-zinc-50 font-medium">
                        <td colSpan={2} className="px-3 py-3 md:px-6 md:py-4 text-zinc-900 text-sm md:text-base">
                          {category} Subtotal
                        </td>
                        <td colSpan={3} className="px-3 py-3 md:px-6 md:py-4 text-right border-t border-zinc-300 text-zinc-900 text-sm md:text-base">
                          ${(gstIncluded ? categories.find(c => c.category === category)?.total || 0 : ((categories.find(c => c.category === category)?.total || 0) * (1 - planData.gstRate))).toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    </>
                  ))}
                  {/* Grand Total */}
                  <tr className="bg-zinc-900 text-white">
                    <td colSpan={2} className="px-3 py-3 md:px-6 md:py-4 text-base md:text-xl font-light">
                      Total (12 months)
                    </td>
                    <td colSpan={3} className="px-3 py-3 md:px-6 md:py-4 text-right text-base md:text-xl font-medium">
                      ${(gstIncluded ? grandTotal : grandTotal * (1 - planData.gstRate)).toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                  {!gstIncluded && (
                    <tr>
                      <td colSpan={2} className="px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm text-zinc-600">
                        Total GST
                      </td>
                      <td colSpan={3} className="px-3 py-2 md:px-6 md:py-3 text-right text-xs md:text-sm text-zinc-600">
                        ${gstAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Callout Box */}
            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-white rounded-lg border border-zinc-200">
              <h4 className="text-lg md:text-xl font-light mb-3 md:mb-4 text-zinc-900">Assumptions & Exclusions</h4>
              <ul className="space-y-2 text-sm md:text-base text-zinc-600">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-1">•</span>
                  <span>All costs shown are in AUD and include GST (where applicable) unless otherwise stated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-1">•</span>
                  <span>Website build is a fixed cost at $9,000 AUD upfront</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-1">•</span>
                  <span>Monthly recurring costs scale with performance and can be adjusted based on ROAS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-1">•</span>
                  <span>Contingency reserve of 5% allocated for overruns and experimental initiatives</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto text-center px-4">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 md:mb-6 text-zinc-900">
              Transform <span className="font-cormorant-garamond font-medium text-zinc-900">FOMA</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-6 md:mb-12 leading-relaxed">
              Let's work together to launch and scale <span className="font-cormorant-garamond font-medium text-zinc-900">FOMA</span> as Australia's 
              next standout furniture brand. Join us on this journey of design, quality, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="mailto:hello@fiveroses.com.au?subject=FOMA Proposal Approval&body=Hi,%0D%0A%0D%0AI approve this proposal for the FOMA brand launch."
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-zinc-900 text-white px-6 py-3 md:px-12 md:py-4 rounded-md font-medium hover:bg-zinc-800 transition-all duration-300 text-base md:text-lg relative overflow-hidden group inline-block cursor-pointer w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  Approve Proposal
                </span>
              </motion.a>
              <motion.a
                href="mailto:hello@fiveroses.com.au?subject=FOMA Proposal - Request Changes&body=Hi,%0D%0A%0D%0AI'd like to discuss changes to the FOMA proposal."
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-zinc-900 px-6 py-3 md:px-12 md:py-4 rounded-md font-medium border-2 border-zinc-900 hover:bg-zinc-50 transition-all duration-300 text-base md:text-lg flex items-center justify-center inline-block cursor-pointer w-full sm:w-auto"
              >
                Request Changes
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}