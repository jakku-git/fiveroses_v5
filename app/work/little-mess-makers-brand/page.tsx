'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image";

export default function LittleMessMakersBrandPage() {
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
              src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(1).webm"
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
                <p className="text-[13px] uppercase tracking-wider text-white/70 mb-2">Identity / Strategy</p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-[48px] sm:text-[64px] md:text-[82px] font-extralight tracking-tight leading-[0.9] mb-4 text-white"
              >
                Little Mess Makers – Where Creativity Begins
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl font-light leading-tight"
              >
                A playful, colorful brand for a creative kids' program.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Industry</span>
                  <p className="text-[15px] text-white font-light">Education / Kids</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Year</span>
                  <p className="text-[15px] text-white font-light">2025</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Type</span>
                  <p className="text-[15px] text-white font-light">Brand Identity & Experience Design</p>
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
                We partnered with Little Mess Makers to design a brand that's as messy, imaginative, and joyful as the kids they work with.
              </p>
            </div>
          </AnimatedSection>
            
          <AnimatedSection className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">The Challenge</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  To balance fun with trustworthiness for both children and parents.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">Our Approach</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  We used hand-drawn shapes, a bouncy typeface, and tactile textures to bring the messy energy of the classroom into the digital world.
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
                    src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(2).webp"
                    alt="Website homepage with illustrated elements"
                    sizes="100vw"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Website homepage with illustrated elements</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <OptimizedImage
                    src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(5).webp"
                    alt="In-class photography and promo posters"
                    sizes="100vw"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">In-class photography and promo posters</p>
              </AnimatedImage>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <OptimizedImage
                      src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(1).webp"
                      alt="Custom illustrated stickers"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Custom illustrated stickers</p>
                </AnimatedImage>

                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <OptimizedImage
                      src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(3).webp"
                      alt="Welcome kit packaging"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Welcome kit packaging</p>
                </AnimatedImage>
              </div>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <OptimizedImage
                    src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(4).webp"
                    alt="Animated splash screen for app"
                    sizes="100vw"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Animated splash screen for app</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <video
                    src="https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(2).webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    preload="metadata"
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">App onboarding flow</p>
              </AnimatedImage>
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight mb-2 text-black tracking-tight leading-none">Results & Impact</h2>
              <p className="text-base text-black/80 max-w-3xl font-light leading-tight">
                The brand helped Little Mess Makers triple their enrollment and expand to three new locations.
              </p>
            </div>
          </AnimatedSection>

          {/* More Projects Section */}
          <AnimatedSection className="w-full pt-2 px-6">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4 text-black tracking-tight leading-none">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
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
              <Link href="/work/nailpop-brand-campaign" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src="https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(4).webp"
                      alt="NAILPOP"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Campaign</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">NAILPOP</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Campaign</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/zesteo-drink-brand" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src="https://pub-1a0c0a0c0c0c0c0c0c0c0c0c0c0c0c0c.r2.dev/zesteo%20(1).webp"
                      alt="ZESTEO"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Identity</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">ZESTEO</h3>
                      <p className="text-[15px] text-white/80 font-light">Drink Brand</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA Section */}
        <AnimatedSection className="w-full py-12 px-6 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4 text-white tracking-tight leading-none">Ready to start your project?</h2>
            <p className="text-base text-white/80 mb-8 max-w-2xl font-light leading-tight">
              Let's create something amazing together. Get in touch to discuss your next project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-300"
            >
              <span className="text-[15px] font-light">Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
} 