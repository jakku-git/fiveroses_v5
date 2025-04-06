'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image";

export default function MossAndMineralBrandPage() {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 800], [0, -100]);
  const gradientOpacity = useTransform(scrollY, [0, 800], [1, 0.5]);

  return (
    <main className="relative min-h-screen bg-white text-black antialiased">
      {/* Hero Section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <section className="relative h-full w-full">
          <div className="absolute inset-0">
            <video
              src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(2).webm"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              preload="metadata"
            />
            <motion.div 
              style={{ opacity: gradientOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" 
            />
          </div>
          
          <motion.div 
            style={{ y: titleY }}
            className="relative h-full flex items-end"
          >
            <div className="w-full px-6 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <p className="text-[13px] uppercase tracking-wider text-white/70 mb-2">Identity / Packaging</p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-[48px] sm:text-[64px] md:text-[82px] font-extralight tracking-tight leading-[0.9] mb-4 text-white"
              >
                Moss & Mineral – Clean Beauty, Naturally
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl font-light leading-tight"
              >
                A mindful beauty brand grounded in nature.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Industry</span>
                  <p className="text-[15px] text-white font-light">Beauty / Wellness</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Year</span>
                  <p className="text-[15px] text-white font-light">2025</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Type</span>
                  <p className="text-[15px] text-white font-light">Brand Identity & Product Design</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Project Content */}
      <div className="relative bg-white">
        <div className="space-y-8 py-12">
          <AnimatedSection className="w-full px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight mb-2 text-black tracking-tight leading-none">Project Overview</h2>
              <p className="text-base text-black/80 max-w-3xl font-light leading-tight">
                Moss & Mineral offers shampoo, body wash, and skincare products using earth-first ingredients. We helped define their brand from the inside out.
              </p>
            </div>
          </AnimatedSection>
            
          <AnimatedSection className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">The Challenge</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  To craft a brand identity that felt gentle, elevated, and rooted in nature — without leaning too rustic.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">Our Approach</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  We used fine-line illustrations, neutral pastels, and minimalist layouts for both the packaging and the digital store.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Gallery Section */}
          <AnimatedSection className="w-full px-6">
            <div className="space-y-8">
              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <OptimizedImage
                    src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(1).webp"
                    alt="Full product line packaging"
                    sizes="100vw"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Full product line packaging</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <OptimizedImage
                    src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(4).webp"
                    alt="On-shelf display mockups"
                    sizes="100vw"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">On-shelf display mockups</p>
              </AnimatedImage>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <OptimizedImage
                      src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(6).webp"
                      alt="Logo and texture design"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Logo and texture design</p>
                </AnimatedImage>

                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <OptimizedImage
                      src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(7).webp"
                      alt="Social launch grid"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Social launch grid</p>
                </AnimatedImage>
              </div>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <OptimizedImage
                    src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(2).webp"
                    alt="Ingredient illustrations"
                    sizes="100vw"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Ingredient illustrations</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <video
                    src="https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(1).webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    preload="metadata"
                  />
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Responsive eCommerce page</p>
                </div>
              </AnimatedImage>
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight mb-2 text-black tracking-tight leading-none">Results & Impact</h2>
              <p className="text-base text-black/80 max-w-3xl font-light leading-tight">
                Sold out its first DTC product drop in 12 hours and received features in two wellness magazines.
              </p>
            </div>
          </AnimatedSection>

          {/* More Projects Section */}
          <AnimatedSection className="w-full pt-2 px-6">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4 text-black tracking-tight leading-none">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Link href="/work/aerovant-aviation-brand" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src="https://pub-31835f4925254f16ad9ce47bfe082f11.r2.dev/btstourists%20(5).webp"
                      alt="AEROVANT"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Strategy</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">AEROVANT</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Identity</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/syntech-industries-brand" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src="https://pub-c9720308467542c7bced018c5417e470.r2.dev/cyborg%20(1).webp"
                      alt="Syntech Industries"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Identity</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Syntech Industries</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Identity</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/verdella-farms-brand" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src="https://pub-a9a5f35f84584290a9de003cf86faf37.r2.dev/farm%20(5).webp"
                      alt="Verdella Farms"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Campaign</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Verdella Farms</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Identity</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA Section */}
        <AnimatedSection className="w-full py-12 px-6 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extralight mb-1.5 text-white tracking-tight leading-none">
              Ready to start your project?
            </h2>
            <p className="text-base text-white/80 mb-4 font-light leading-tight">
              Let's create something extraordinary together.
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              <span className="text-2xl md:text-3xl font-extralight tracking-tight leading-none text-white relative after:absolute after:bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">Let's Talk</span>
              <ArrowUpRight className="w-6 h-6 text-white" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
} 