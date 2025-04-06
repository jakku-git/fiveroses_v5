'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Client Component for animated sections
const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px",
  });

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 60,
        }}
        transition={{
          duration: 1.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

const AnimatedImage = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px",
  });

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 1.1,
        }}
        transition={{
          duration: 1.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function LumaGlassworksPage() {
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
              src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(1).webm"
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
                <p className="text-[13px] uppercase tracking-wider text-white/70 mb-2">Identity / Content</p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-[48px] sm:text-[64px] md:text-[82px] font-extralight tracking-tight leading-[0.9] mb-4 text-white"
              >
                Lūma Glassworks – Clarity in Motion
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl font-light leading-tight"
              >
                Showcasing the beauty of hand-blown glass with elegance and precision.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Industry</span>
                  <p className="text-[15px] text-white font-light">Artisanal / Homeware</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Year</span>
                  <p className="text-[15px] text-white font-light">2025</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-[13px] text-white/60 block mb-0.5">Type</span>
                  <p className="text-[15px] text-white font-light">Visual Identity & Photography</p>
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
                Lūma Glassworks needed a fresh digital presence to highlight the precision and beauty of their work.
              </p>
            </div>
          </AnimatedSection>
            
          <AnimatedSection className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">The Challenge</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  To highlight the fragility and beauty of glassmaking without overwhelming the work itself.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extralight mb-1.5 text-black tracking-tight leading-none">Our Approach</h3>
                <p className="text-base text-black/80 font-light leading-tight">
                  We used soft gradients, intentional whitespace, and high-resolution photography to highlight the clarity and forms of each product.
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
                    src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(3).webp"
                    alt="Hero homepage with subtle animations"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Hero homepage with subtle animations</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(7).webp"
                    alt="Studio in action with glowing furnaces"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Studio in action with glowing furnaces</p>
              </AnimatedImage>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <Image
                      src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(4).webp"
                      alt="Product catalog design"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Product catalog design</p>
                </AnimatedImage>

                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <Image
                      src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(5).webp"
                      alt="Mobile interface"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <p className="text-[13px] text-black/50 mt-1.5 font-light">Mobile interface</p>
                </AnimatedImage>
              </div>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(6).webp"
                    alt="Detail shots of glass shapes"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Detail shots of glass shapes</p>
              </AnimatedImage>

              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(8).webp"
                    alt="Behind-the-scenes portraiture"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
                <p className="text-[13px] text-black/50 mt-1.5 font-light">Behind-the-scenes portraiture</p>
              </AnimatedImage>
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight mb-2 text-black tracking-tight leading-none">Results & Impact</h2>
              <p className="text-base text-black/80 max-w-3xl font-light leading-tight">
                Traffic to their online store tripled post-launch, and the new identity helped them secure gallery partnerships.
              </p>
            </div>
          </AnimatedSection>

          {/* More Projects Section */}
          <AnimatedSection className="w-full pt-2 px-6">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4 text-black tracking-tight leading-none">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Link href="/work/terra-and-tone-ceramics" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://pub-af52e145b46f4643840668ef5bf23952.r2.dev/ceramics%20(4).webp"
                      alt="terra&tone"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Identity</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">terra&tone</h3>
                      <p className="text-[15px] text-white/80 font-light">Brand Identity</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/solstice-bloom-fashion" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://pub-2634c5482cbc49329e9902214d332db6.r2.dev/heat%20(4).webp"
                      alt="Solstice Bloom"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Campaign</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Solstice Bloom</h3>
                      <p className="text-[15px] text-white/80 font-light">Fashion Launch</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
              <Link href="/work/forge-and-hide-leather" className="group">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://pub-bef823910dc44973941ddebcc9ec07c8.r2.dev/leather%20(1).webp"
                      alt="Forge & Hide"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">Identity</p>
                      <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">Forge & Hide</h3>
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