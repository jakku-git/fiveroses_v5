"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Cormorant_Garamond } from 'next/font/google';
import { ArrowRight, Leaf, Award, Sparkles, Globe, Shield, Zap, Users, Target, Lightbulb } from 'lucide-react';
import { Lens } from "@/components/ui/lens";

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

export default function RifoldPage() {
  return (
    <div className={`min-h-screen bg-white text-zinc-900 ${cormorantGaramond.variable}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://pub-def2005fbb5b4ebc9f95819a9c0fbcb3.r2.dev/rifoldhero.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/40 backdrop-blur-[1px]" />
        </div>
        <div className="relative z-20 w-[80%] mx-auto text-center">
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
              <span className="font-cormorant-garamond font-medium text-[15rem] md:text-[21rem] leading-none text-zinc-900">RIFOLD</span>
            </motion.div>
            <motion.div 
              className="text-5xl md:text-7xl text-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Rebranding Proposal
            </motion.div>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light text-zinc-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From Traditional Health Supplements to Premium Wellness Brand
          </motion.p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-24 bg-zinc-50">
        <div className="w-[80%] mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Executive Summary</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <span className="font-cormorant-garamond font-medium text-[8rem] md:text-[10rem] leading-none text-zinc-900">
                    RIFOLD
                  </span>
                </motion.div>

                {/* Marketing Video */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-12 aspect-video w-full rounded-lg overflow-hidden relative border border-zinc-200"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="https://pub-def2005fbb5b4ebc9f95819a9c0fbcb3.r2.dev/0529.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
                </motion.div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-zinc-900">A New Era of Wellness</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      This proposal presents a comprehensive rebranding strategy for <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span>, transforming 
                      from a traditional health supplements company to a premium wellness brand. The 
                      transformation addresses the evolving market demands while preserving <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span>'s 
                      core values of quality and scientific excellence.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-zinc-900">Our Heritage</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      Founded on a strong technical base and professional approach, <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span> has established 
                      itself as an Australian-owned and manufactured brand with a strong presence in Asian 
                      markets. This rebranding elevates our premium quality health and beauty products to 
                      meet modern consumer expectations while maintaining our commitment to excellence in 
                      manufacturing and innovation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-zinc-900">The Vision</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      In an era where wellness transcends mere supplementation, <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span> emerges as a beacon 
                      of holistic health. Our vision extends beyond traditional boundaries, embracing a 
                      future where premium wellness is accessible, scientifically validated, and 
                      aesthetically inspiring.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-zinc-900">The Transformation</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-zinc-400" />
                          <span className="text-zinc-600"><span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span> Evolution</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-zinc-400" />
                          <span className="text-zinc-600">Premium Positioning</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-zinc-400" />
                          <span className="text-zinc-600">Market Expansion</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-zinc-400" />
                          <span className="text-zinc-600">Natural Innovation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-zinc-900">The Promise</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      As we embark on this transformative journey, <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span> commits to delivering excellence 
                      in every aspect – from the purity of our ingredients to the sophistication of our 
                      packaging, from the clarity of our communication to the integrity of our science. 
                      This is not merely a rebrand; it's a renaissance of wellness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="sticky top-24 space-y-8">
                  <div className="aspect-square bg-zinc-50 rounded-lg overflow-hidden relative border border-zinc-200">
                    <Image
                      src="https://pub-def2005fbb5b4ebc9f95819a9c0fbcb3.r2.dev/product%20(2).png"
                      alt="RIFOLD Premium Product"
                      fill
                      className="object-contain p-8"
                      priority
                    />
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200">
                    <h4 className="text-xl font-light mb-4 text-zinc-900">Key Highlights</h4>
                    <div className="space-y-4">
                      {[
                        { icon: Award, text: "Premium Australian Manufacturing" },
                        { icon: Leaf, text: "Natural Ingredients Sourcing" },
                        { icon: Shield, text: "Quality Assurance" },
                        { icon: Sparkles, text: "Innovative Formulations" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Identity Transformation */}
      <section className="py-24">
        <div className="w-[80%] mx-auto">
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
                        "Rifold health care products follow 'Inspired Better Life'. We focus on producing 
                        the best products with naturopathy concept for the Australian as well as the 
                        international market."
                      </p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { icon: Leaf, text: "Traditional health supplements focus" },
                        { icon: Shield, text: "Basic product descriptions" },
                        { icon: Users, text: "Limited brand storytelling" },
                        { icon: Zap, text: "Functional messaging" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item.text}</span>
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
                        <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span>
                        <span className="italic">. Inspired by NATURE. Backed by SCIENCE. Premium supplements crafted with the finest 
                        natural ingredients, scientifically formulated to enhance your wellbeing.</span>
                      </p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { icon: Sparkles, text: "Premium wellness positioning" },
                        { icon: Lightbulb, text: "Rich product storytelling" },
                        { icon: Award, text: "Scientific credibility" },
                        { icon: Users, text: "Emotional connection" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item.text}</span>
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
                    icon: Sparkles,
                    title: "The <span class='font-cormorant-garamond font-medium text-zinc-900'>RIFOLD</span> Difference",
                    description: "We combine the wisdom of nature with cutting-edge scientific research to create supplements that truly work."
                  },
                  {
                    icon: Leaf,
                    title: "Naturally Sourced",
                    description: "Carefully selecting the finest natural ingredients from sustainable sources worldwide"
                  },
                  {
                    icon: Award,
                    title: "Premium Quality",
                    description: "Exceeding industry standards with rigorous quality control and testing"
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
                    <h4 className="text-2xl font-light mb-4 text-zinc-900" dangerouslySetInnerHTML={{ __html: value.title }} />
                    <p className="text-zinc-600 text-lg leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Packaging Evolution */}
            <div className="mb-20">
              <h3 className="text-2xl font-light mb-8 text-zinc-900">Packaging Evolution</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">Before</h4>
                  <div className="group">
                    <Lens zoomFactor={1.8} lensSize={250} className="aspect-[3/4] bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                      <Image
                        src="https://pub-def2005fbb5b4ebc9f95819a9c0fbcb3.r2.dev/old.webp"
                        alt="Rifold Original Packaging"
                        fill
                        className="object-cover"
                      />
                    </Lens>
                    <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300 mt-6">
                      <div className="space-y-4">
                        {[
                          { icon: Shield, text: "Traditional supplement bottle design" },
                          { icon: Leaf, text: "Basic label with minimal branding" },
                          { icon: Users, text: "Limited product information" },
                          { icon: Zap, text: "Standard pharmaceutical aesthetic" },
                          { icon: Sparkles, text: "Generic visual identity" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 text-zinc-600 group/item">
                            <item.icon className="w-5 h-5 text-zinc-400 group-hover/item:text-zinc-500 transition-colors duration-300 mt-1" />
                            <span className="group-hover/item:text-zinc-700 transition-colors duration-300">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">After</h4>
                  <div className="group">
                    <Lens zoomFactor={1.8} lensSize={250} className="aspect-[3/4] bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                      <Image
                        src="https://pub-def2005fbb5b4ebc9f95819a9c0fbcb3.r2.dev/new.webp"
                        alt="Rifold New Packaging"
                        fill
                        className="object-cover"
                      />
                    </Lens>
                    <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300 mt-6">
                      <div className="space-y-4">
                        {[
                          { icon: Sparkles, text: "Premium, modern bottle design" },
                          { icon: Award, text: "Sophisticated label with refined typography" },
                          { icon: Shield, text: "Comprehensive product information" },
                          { icon: Leaf, text: "Luxury wellness aesthetic" },
                          { icon: Lightbulb, text: "Distinctive brand identity" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 text-zinc-600 group/item">
                            <item.icon className="w-5 h-5 text-zinc-400 group-hover/item:text-zinc-500 transition-colors duration-300 mt-1" />
                            <span className="group-hover/item:text-zinc-700 transition-colors duration-300">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Presentation */}
            <div>
              <h3 className="text-2xl font-light mb-8 text-zinc-900">The Evolution of Excellence</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">Before</h4>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <div className="space-y-4">
                      {[
                        { icon: Shield, text: "Basic product listings with minimal visual appeal" },
                        { icon: Leaf, text: "Simple product descriptions lacking depth and engagement" },
                        { icon: Users, text: "Limited product imagery failing to showcase quality" },
                        { icon: Zap, text: "Traditional categorization missing modern consumer insights" },
                        { icon: Sparkles, text: "Focus on functional benefits without emotional connection" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">After</h4>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <div className="space-y-4">
                      {[
                        { icon: Sparkles, text: "Rich product storytelling that connects with consumers" },
                        { icon: Award, text: "High-quality product photography showcasing premium quality" },
                        { icon: Shield, text: "Detailed product information with scientific backing" },
                        { icon: Users, text: "Customer reviews integration building trust and credibility" },
                        { icon: Leaf, text: "Lifestyle-focused presentation inspiring wellness journeys" },
                        { icon: Lightbulb, text: "Clear pricing and savings highlighting value proposition" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1" />
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Digital Transformation */}
      <section className="py-24 bg-zinc-50">
        <div className="w-[80%] mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Digital Transformation</h2>
            
            {/* Website Evolution */}
            <div className="mb-20">
              <h3 className="text-2xl font-light mb-8 text-zinc-900">The Digital Revolution</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">Before (2018)</h4>
                  <div className="aspect-video bg-zinc-50 rounded-lg overflow-hidden relative border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <iframe 
                      src="http://www.rifold.com.au/index.html" 
                      className="absolute inset-0 w-full h-full"
                      title="Rifold Old Website"
                    />
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <div className="space-y-4">
                      {[
                        "Static HTML website with dated design",
                        "Limited mobile responsiveness",
                        "Basic navigation structure",
                        "Outdated product presentation",
                        "Limited e-commerce capabilities"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <span className="text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1">•</span>
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
                      The original website served as a basic informational platform, focusing on product listings 
                      and company information. While functional, it lacked modern design elements and user experience 
                      considerations that are essential in today's digital landscape.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl text-zinc-600">After (2025)</h4>
                  <div className="aspect-video bg-zinc-50 rounded-lg overflow-hidden relative border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <iframe 
                      src="https://rifold.vercel.app/" 
                      className="absolute inset-0 w-full h-full"
                      title="Rifold New Website"
                    />
                  </div>
                  <div className="p-8 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300">
                    <div className="space-y-4">
                      {[
                        "Modern, dynamic Next.js application",
                        "Fully responsive, mobile-first design",
                        "Enhanced user experience and navigation",
                        "Engaging product showcases",
                        "Integrated e-commerce functionality"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 text-zinc-600 group">
                          <span className="text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1">•</span>
                          <span className="group-hover:text-zinc-700 transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
                      The new website represents a significant leap forward, featuring a modern tech stack, 
                      engaging user interface, and comprehensive e-commerce capabilities. It better reflects 
                      Rifold's premium positioning in the health supplements market.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Improvements */}
            <div>
              <h3 className="text-2xl font-light mb-8 text-zinc-900">Key Digital Improvements</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "User Experience",
                    description: "Transformed from a basic informational site to an engaging, interactive platform with intuitive navigation and modern design principles"
                  },
                  {
                    title: "Technical Infrastructure",
                    description: "Upgraded from static HTML to a modern Next.js application, enabling better performance, SEO, and maintainability"
                  },
                  {
                    title: "Brand Presentation",
                    description: "Enhanced visual storytelling and product presentation, better reflecting Rifold's premium positioning in the market"
                  },
                  {
                    title: "E-commerce Capabilities",
                    description: "Implemented a full-featured online store with product filtering, cart functionality, and secure checkout"
                  },
                  {
                    title: "Content Strategy",
                    description: "Developed a comprehensive content approach, including product education, brand story, and health insights"
                  },
                  {
                    title: "Mobile Experience",
                    description: "Created a fully responsive design that delivers an optimal experience across all devices and screen sizes"
                  }
                ].map((improvement, index) => (
                  <motion.div
                    key={index}
                    className="p-8 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-300 bg-zinc-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-xl font-light mb-4 text-zinc-900">{improvement.title}</h4>
                    <p className="text-zinc-600 text-lg leading-relaxed">{improvement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-24">
        <div className="w-[80%] mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-zinc-900">Journey to Transformation</h2>
            <div className="space-y-12">
              {[
                {
                  phase: "Phase 1: Brand Strategy & Research",
                  duration: "4 weeks",
                  description: "Laying the foundation for a premium wellness brand",
                  tasks: [
                    "Market analysis and competitor research",
                    "Brand positioning and messaging framework",
                    "Target audience definition and personas",
                    "Brand voice and tone guidelines"
                  ]
                },
                {
                  phase: "Phase 2: Brand Identity Development",
                  duration: "6 weeks",
                  description: "Creating a distinctive and premium brand identity",
                  tasks: [
                    "Visual identity design and refinement",
                    "Brand messaging and storytelling",
                    "Product photography and visual assets",
                    "Content strategy and guidelines"
                  ]
                },
                {
                  phase: "Phase 3: Digital Development",
                  duration: "8 weeks",
                  description: "Building a modern digital presence",
                  tasks: [
                    "Website design and user experience",
                    "E-commerce platform integration",
                    "Content migration and optimization",
                    "Testing and performance optimization"
                  ]
                },
                {
                  phase: "Phase 4: Launch & Marketing",
                  duration: "4 weeks",
                  description: "Introducing the new brand to the world",
                  tasks: [
                    "Soft launch and beta testing",
                    "Marketing campaign development",
                    "Social media strategy and setup",
                    "Analytics and tracking implementation"
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
                        <span className="text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300 mt-1">•</span>
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

      {/* Call to Action */}
      <section className="py-24 bg-zinc-50">
        <div className="w-[80%] mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-zinc-900">
              Transform <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span>
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Let's work together to elevate <span className="font-cormorant-garamond font-medium text-zinc-900">RIFOLD</span>'s brand presence 
              and create a premium wellness experience that resonates with modern consumers. Join us on this journey 
              of transformation and innovation.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900 text-white px-12 py-4 rounded-md font-medium hover:bg-zinc-800 transition-all duration-300 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Start the Transformation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 