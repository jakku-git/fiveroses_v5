'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image";

export default function NailpopBrandCampaignPage() {
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
              src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(1).webm"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              preload="none"
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
                <p className="text-[13px] uppercase tracking-wider text-white/70 mb-2">Campaign / Content</p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-[48px] sm:text-[64px] md:text-[82px] font-extralight tracking-tight leading-[0.9] mb-4 text-white"
              >
                NAILPOP – Color Outside the Lines
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl font-light leading-tight"
              >
                Bold branding and content for a nail art studio with attitude.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Industry</span>
                  <p className="text-[15px] text-white font-light">Beauty / Self-Expression</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Year</span>
                  <p className="text-[15px] text-white font-light">2025</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Type</span>
                  <p className="text-[15px] text-white font-light">Visual Identity & Social Launch</p>
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
                NAILPOP celebrates self-expression through nail art. They needed a loud, unapologetic brand identity to match their community's energy.
              </p>
            </div>
          </AnimatedSection>
            
          <AnimatedSection className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">The Challenge</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  To create a fun, shareable visual style that works across digital content and in-studio experience.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">Our Approach</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  We designed a playful logotype, built a retro-meets-modern color system, and created an animated sticker set for social campaigns.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Gallery Section */}
          <AnimatedSection className="w-full px-6">
            <div className="space-y-8">
              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(7).webp"
                    alt="Neon-lit studio brand launch"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Neon-lit studio brand launch</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(1).webp"
                    alt="Packaging with attitude"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Packaging with attitude</p>
              </AnimatedImage>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <Image
                      src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(3).webp"
                      alt="Custom sticker GIFs"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Custom sticker GIFs</p>
                </AnimatedImage>

                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <Image
                      src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(4).webp"
                      alt="Branded nail polish color cards"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Branded nail polish color cards</p>
                </AnimatedImage>
              </div>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(6).webp"
                    alt="Social campaign with real customers"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Social campaign with real customers</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <video
                    src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(2).webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Animated typography snippets</p>
                </div>
              </AnimatedImage>
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight mb-2 text-black tracking-tight leading-none">Results & Impact</h2>
              <p className="text-base text-black/80 max-w-3xl font-light leading-tight">
                NAILPOP gained 15k new followers within the first month of the relaunch, with a 4x engagement rate increase.
              </p>
            </div>
          </AnimatedSection>

          {/* More Projects Section */}
          <AnimatedSection className="w-full pt-2 px-6">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4 text-black tracking-tight leading-none">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Link href="/work/little-mess-makers-brand" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(2).webp"
                      alt="Little Mess Makers"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Identity</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Little Mess Makers</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Identity</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/zesteo-drink-brand" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://pub-a74269ab9d1140f4b9b01e4b98c35bc7.r2.dev/drinks%20(6).webp"
                      alt="Zesteo"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Campaign</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Zesteo</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Identity</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/luma-glassworks-visuals" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(4).webp"
                      alt="Lūma Glassworks"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Identity</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Lūma Glassworks</h3>
                      <p className="text-[15px] text-white/80 font-light">Visual Identity</p>
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