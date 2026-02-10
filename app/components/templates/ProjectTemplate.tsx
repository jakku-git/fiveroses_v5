'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";

// ============================================================================
// REUSABLE COMPONENTS
// These components handle animations for sections and images
// ============================================================================

const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const isMobile = useIsMobile();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: isMobile ? "-20px" : "-50px",  // Reduced margin on mobile for better performance
  });

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : (isMobile ? 30 : 60),
        }}
        transition={{
          duration: isMobile ? 0.6 : 1.2,  // Faster animations on mobile
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
  const isMobile = useIsMobile();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: isMobile ? "-20px" : "-50px",  // Reduced margin on mobile
  });

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: isMobile ? 1.05 : 1.1 }}  // Reduced scale on mobile
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : (isMobile ? 1.05 : 1.1),
        }}
        transition={{
          duration: isMobile ? 0.8 : 1.8,  // Faster animations on mobile
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================================================
// PROJECT PAGE TEMPLATE
// Replace the content below with your project-specific content
// ============================================================================

export default function ProjectTemplate() {
  const isMobile = useIsMobile();
  // Scroll-based animations - reduced intensity on mobile
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, isMobile ? 400 : 800], [0, isMobile ? -30 : -100]);
  const gradientOpacity = useTransform(scrollY, [0, isMobile ? 400 : 800], [1, isMobile ? 0.7 : 0.5]);

  return (
    <main className="relative min-h-screen bg-white text-black antialiased">
      {/* ============================================================================
          HERO SECTION
          - Replace image src with your project's hero image
          - Update metadata (Industry, Year, Type)
          - Update title and description
          ============================================================================ */}
      <div className={`sticky top-0 ${isMobile ? 'h-[70vh]' : 'h-screen'} w-full overflow-hidden`}>
        <section className="relative h-full w-full">
          <div className="absolute inset-0">
            <Image
              src="/your-hero-image.webp" // TODO: Replace with your hero image
              alt="Project Title" // TODO: Update alt text
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <motion.div 
              style={{ opacity: gradientOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" 
            />
          </div>
          
          <motion.div 
            style={{ y: isMobile ? 0 : titleY }}  // Disable parallax on mobile
            className="relative h-full flex items-end"
          >
            <div className={`w-full ${isMobile ? 'px-4 pb-12' : 'px-6 pb-20'}`}>
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.6 : 1, delay: 0.2 }}
              >
                <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} uppercase tracking-wider text-white/70 ${isMobile ? 'mb-1.5' : 'mb-2'}`}>
                  Category Here {/* TODO: Update project category */}
                </p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.6 : 1, delay: 0.4 }}
                className={`${isMobile ? 'text-[36px]' : 'text-[64px]'} md:text-[82px] font-extralight tracking-tight leading-[0.9] ${isMobile ? 'mb-3' : 'mb-4'} text-white`}
              >
                Project Title {/* TODO: Update project title */}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.6 : 1, delay: 0.6 }}
                className={`${isMobile ? 'text-base' : 'text-lg'} md:text-xl text-white/80 ${isMobile ? 'mb-6' : 'mb-8'} max-w-2xl font-light leading-tight`}
              >
                Project description goes here. {/* TODO: Update project description */}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.6 : 1, delay: 0.8 }}
                className={`flex flex-wrap ${isMobile ? 'gap-3' : 'gap-6'} items-center`}
              >
                <div className={`bg-white/5 backdrop-blur-sm rounded-lg ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'}`}>
                  <span className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-white/60 block mb-0.5`}>Industry</span>
                  <p className={`${isMobile ? 'text-sm' : 'text-[15px]'} text-white font-light`}>Your Industry</p>
                </div>
                <div className={`bg-white/5 backdrop-blur-sm rounded-lg ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'}`}>
                  <span className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-white/60 block mb-0.5`}>Year</span>
                  <p className={`${isMobile ? 'text-sm' : 'text-[15px]'} text-white font-light`}>2024</p>
                </div>
                <div className={`bg-white/5 backdrop-blur-sm rounded-lg ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'}`}>
                  <span className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-white/60 block mb-0.5`}>Type</span>
                  <p className={`${isMobile ? 'text-sm' : 'text-[15px]'} text-white font-light`}>Project Type</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Project Content */}
      <div className="relative bg-white">
        <div className={`${isMobile ? 'space-y-6' : 'space-y-8'} ${isMobile ? 'py-8' : 'py-12'}`}>
          {/* ============================================================================
              PROJECT OVERVIEW SECTION
              Update heading and description with your project details
              ============================================================================ */}
          <AnimatedSection className={`w-full ${isMobile ? 'px-4' : 'px-6'}`}>
            <div>
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} md:text-3xl font-extralight ${isMobile ? 'mb-1.5' : 'mb-2'} text-black tracking-tight leading-none`}>
                Project Overview
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black/80 max-w-3xl font-light leading-tight`}>
                Your project overview goes here. {/* TODO: Update overview */}
              </p>
            </div>
          </AnimatedSection>
            
          {/* ============================================================================
              CHALLENGE & APPROACH SECTION
              Update both columns with your project-specific content
              ============================================================================ */}
          <AnimatedSection className={`w-full ${isMobile ? 'px-4' : 'px-6'}`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? 'gap-6' : 'gap-4'}`}>
              <div>
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-extralight ${isMobile ? 'mb-1' : 'mb-1.5'} text-black tracking-tight leading-none`}>
                  The Challenge
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black/80 font-light leading-tight`}>
                  Describe your challenge here. {/* TODO: Update challenge */}
                </p>
              </div>
              <div>
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-extralight ${isMobile ? 'mb-1' : 'mb-1.5'} text-black tracking-tight leading-none`}>
                  Our Approach
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black/80 font-light leading-tight`}>
                  Describe your approach here. {/* TODO: Update approach */}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================================================
              GALLERY SECTION
              Replace images and captions in each slot
              Structure:
              - Slot 1: Full width (16:9)
              - Slot 2: Full width (16:9)
              - Slot 3: Two columns (8:9 each)
              - Slot 4: Full width (16:9)
              - Slot 5: Full width (16:9)
              ============================================================================ */}
          <AnimatedSection className={`w-full ${isMobile ? 'px-4' : 'px-6'}`}>
            <div className={isMobile ? 'space-y-6' : 'space-y-8'}>
              {/* Slot 1: Full width */}
              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="/slot1-image.jpg" // TODO: Replace with your image
                    alt="Image description" // TODO: Update alt text
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-black/50 ${isMobile ? 'mt-1' : 'mt-1.5'} font-light`}>
                  Image caption goes here {/* TODO: Update caption */}
                </p>
              </AnimatedImage>

              {/* Slot 2: Full width */}
              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="/slot2-image.jpg" // TODO: Replace with your image
                    alt="Image description" // TODO: Update alt text
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-black/50 ${isMobile ? 'mt-1' : 'mt-1.5'} font-light`}>
                  Image caption goes here {/* TODO: Update caption */}
                </p>
              </AnimatedImage>

              {/* Slot 3: Two columns */}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? 'gap-6' : 'gap-4'}`}>
                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <Image
                      src="/slot3a-image.jpg" // TODO: Replace with your image
                      alt="Image description" // TODO: Update alt text
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-black/50 ${isMobile ? 'mt-1' : 'mt-1.5'} font-light`}>
                    Image caption goes here {/* TODO: Update caption */}
                  </p>
                </AnimatedImage>

                <AnimatedImage>
                  <div className="aspect-[8/9] relative w-full">
                    <Image
                      src="/slot3b-image.jpg" // TODO: Replace with your image
                      alt="Image description" // TODO: Update alt text
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-black/50 ${isMobile ? 'mt-1' : 'mt-1.5'} font-light`}>
                    Image caption goes here {/* TODO: Update caption */}
                  </p>
                </AnimatedImage>
              </div>

              {/* Slot 4: Full width */}
              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="/slot4-image.jpg" // TODO: Replace with your image
                    alt="Image description" // TODO: Update alt text
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-black/50 ${isMobile ? 'mt-1' : 'mt-1.5'} font-light`}>
                  Image caption goes here {/* TODO: Update caption */}
                </p>
              </AnimatedImage>

              {/* Slot 5: Full width */}
              <AnimatedImage>
                <div className="aspect-[16/9] relative w-full">
                  <Image
                    src="/slot5-image.jpg" // TODO: Replace with your image
                    alt="Image description" // TODO: Update alt text
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} text-black/50 ${isMobile ? 'mt-1' : 'mt-1.5'} font-light`}>
                  Image caption goes here {/* TODO: Update caption */}
                </p>
              </AnimatedImage>
            </div>
          </AnimatedSection>

          {/* ============================================================================
              RESULTS & IMPACT SECTION
              Update heading and description with your project outcomes
              ============================================================================ */}
          <AnimatedSection className={`w-full ${isMobile ? 'px-4' : 'px-6'}`}>
            <div>
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} md:text-3xl font-extralight ${isMobile ? 'mb-1.5' : 'mb-2'} text-black tracking-tight leading-none`}>
                Results & Impact
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black/80 max-w-3xl font-light leading-tight`}>
                Describe your project's results and impact here. {/* TODO: Update results */}
              </p>
            </div>
          </AnimatedSection>

          {/* ============================================================================
              MORE PROJECTS SECTION
              Update with three other project links and images
              ============================================================================ */}
          <AnimatedSection className={`w-full pt-2 ${isMobile ? 'px-4' : 'px-6'}`}>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} md:text-3xl font-extralight ${isMobile ? 'mb-3' : 'mb-4'} text-black tracking-tight leading-none`}>
              More Projects
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-3'}`}>
              {/* Project 1 */}
              <Link href="/work/project-1" className="group touch-manipulation">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/project1-image.jpg" // TODO: Replace with project image
                      alt="Project 1" // TODO: Update alt text
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-100"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className={`absolute bottom-0 ${isMobile ? 'p-4' : 'p-5'}`}>
                      <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} uppercase tracking-wider text-white/70 ${isMobile ? 'mb-1' : 'mb-1.5'}`}>Category</p>
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-extralight ${isMobile ? 'mb-0' : 'mb-0.5'} text-white tracking-tight leading-tight`}>
                        Project 1 Title
                      </h3>
                      <p className={`${isMobile ? 'text-sm' : 'text-[15px]'} text-white/80 font-light`}>Project Type</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>

              {/* Project 2 */}
              <Link href="/work/project-2" className="group touch-manipulation">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/project2-image.jpg" // TODO: Replace with project image
                      alt="Project 2" // TODO: Update alt text
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-100"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className={`absolute bottom-0 ${isMobile ? 'p-4' : 'p-5'}`}>
                      <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} uppercase tracking-wider text-white/70 ${isMobile ? 'mb-1' : 'mb-1.5'}`}>Category</p>
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-extralight ${isMobile ? 'mb-0' : 'mb-0.5'} text-white tracking-tight leading-tight`}>
                        Project 2 Title
                      </h3>
                      <p className={`${isMobile ? 'text-sm' : 'text-[15px]'} text-white/80 font-light`}>Project Type</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>

              {/* Project 3 */}
              <Link href="/work/project-3" className="group touch-manipulation">
                <AnimatedImage>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/project3-image.jpg" // TODO: Replace with project image
                      alt="Project 3" // TODO: Update alt text
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-100"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className={`absolute bottom-0 ${isMobile ? 'p-4' : 'p-5'}`}>
                      <p className={`${isMobile ? 'text-xs' : 'text-[13px]'} uppercase tracking-wider text-white/70 ${isMobile ? 'mb-1' : 'mb-1.5'}`}>Category</p>
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-extralight ${isMobile ? 'mb-0' : 'mb-0.5'} text-white tracking-tight leading-tight`}>
                        Project 3 Title
                      </h3>
                      <p className={`${isMobile ? 'text-sm' : 'text-[15px]'} text-white/80 font-light`}>Project Type</p>
                    </div>
                  </div>
                </AnimatedImage>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* ============================================================================
            CTA SECTION
            Update heading and description if needed
            ============================================================================ */}
        <AnimatedSection className={`w-full ${isMobile ? 'py-8' : 'py-12'} ${isMobile ? 'px-4' : 'px-6'} bg-black`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} md:text-3xl font-extralight ${isMobile ? 'mb-1' : 'mb-1.5'} text-white tracking-tight leading-none`}>
              Ready to start your project?
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-white/80 ${isMobile ? 'mb-6' : 'mb-4'} font-light leading-tight`}>
              Let's create something extraordinary together.
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 touch-manipulation min-h-[44px]"
            >
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} md:text-3xl font-extralight tracking-tight leading-none text-white relative after:absolute after:bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full`}>
                Let's Talk
              </span>
              <ArrowUpRight className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
} 