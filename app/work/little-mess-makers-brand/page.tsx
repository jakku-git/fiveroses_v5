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
                Little Mess Makers is an innovative educational platform that celebrates creativity and learning through hands-on art experiences. We developed a playful, engaging brand identity that captures the joy of creative exploration while maintaining a professional presence in the educational space. The visual system combines vibrant colors, whimsical illustrations, and dynamic photography to create an inviting environment for young learners and their families.
              </p>
            </div>
          </AnimatedSection>
            
          <AnimatedSection className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">The Challenge</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  To create a brand identity that appeals to both children and their parents while maintaining educational credibility. The challenge was to develop a visual system that feels both fun and trustworthy, with content that engages young learners while reassuring parents about the educational value.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">Our Approach</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  We crafted a dynamic brand system featuring a playful logomark that embodies creative exploration, a custom typeface that combines child-friendly forms with educational clarity, and a comprehensive visual language that includes custom illustrations, engaging photography, and interactive elements that bring the learning experience to life.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Gallery Section */}
          <AnimatedSection className="w-full px-6">
            <div className="space-y-8">
              {/* First Gallery Item - Full Width */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(1).webp"
                  alt="Educational activity kits and materials display"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Second Gallery Item - Full Width */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(2).webp"
                  alt="Children engaging with creative activities"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Third and Fourth Gallery Items - Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="relative aspect-[8/9] w-full overflow-hidden">
                  <Image
                    src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(6).webp"
                    alt="Brand identity and educational materials"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                {/* Right Column */}
                <div className="relative aspect-[8/9] w-full overflow-hidden">
                  <video
                    src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(3).webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    preload="none"
                  />
                </div>
              </div>

              {/* Fifth Gallery Item - Full Width */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(4).webp"
                  alt="Product photography and educational content"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Sixth Gallery Item - Full Width */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <video
                  src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(2).webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  preload="none"
                />
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/work/verdella-farms-brand" className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <OptimizedImage
                    src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(farm).webp"
                    alt="Verdella Farms brand identity and campaign"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-light mt-4 group-hover:opacity-70 transition-opacity">Verdella Farms</h3>
              </Link>

              <Link href="/work/nailpop-brand" className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <OptimizedImage
                    src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(nails).webp"
                    alt="NAILPOP brand campaign and identity"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-light mt-4 group-hover:opacity-70 transition-opacity">NAILPOP</h3>
              </Link>

              <Link href="/work/zesteo-brand" className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <OptimizedImage
                    src="https://pub-518aef848a0fedd5af45166ce269f7cc.r2.dev/artscraft%20(zesteo).webp"
                    alt="ZESTEO drink brand identity"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-light mt-4 group-hover:opacity-70 transition-opacity">ZESTEO</h3>
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