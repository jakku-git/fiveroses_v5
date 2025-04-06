"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ShuffleHero from "../components/shuffle-hero";
import { SmoothScrollHero } from "../components/smooth-scroll-hero";
import { useInView } from 'react-intersection-observer';
import { ContactModal } from "@/components/ui/contact-modal";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image";

// Dynamically import heavy components
const CardRevealEffect = dynamic(() => import("@/components/ui/card-reveal-effect").then(mod => mod.CardRevealEffect), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/50" />
});

const BackgroundBoxes = dynamic(() => import("@/components/ui/background-boxes").then(mod => mod.BackgroundBoxes), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
});

const ScrollAccordion = dynamic(() => import("@/components/ui/scroll-accordion").then(mod => mod.ScrollAccordion), {
  ssr: false,
  loading: () => <div className="w-full h-[400vh] bg-black/50 animate-pulse" />
});

const ServicesAccordion = dynamic(() => import("@/components/ui/services-accordion").then(mod => mod.ServicesAccordion), {
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-[#4A148C]/50 animate-pulse" />
});

const LayoutGridDemo = dynamic(() => import("@/components/ui/layoutgriddemo").then(mod => mod.LayoutGridDemo), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-black/50 animate-pulse" />
});

interface Service {
  title: string;
  slug: string;
}

interface CardProps {
  title: string;
  children?: React.ReactNode;
  link: string;
}

const OurServicesHorizontal = () => {
  const revealColors = [
    [236, 72, 153],
    [232, 121, 249],
  ];
  const services: Service[] = [
    { title: "Marketing & Strategy", slug: "marketing" },
    { title: "Development & Solutions", slug: "web-solutions" },
    { title: "Creation & Production", slug: "creative-production" },
    { title: "Incubator & Consulting", slug: "incubator" },
  ];
  const serviceDetails: { [key: string]: string[] } = {
    "Marketing & Strategy": [
      "Marketing & Digital Strategy",
      "Brand & Campaign Strategy",
      "Content & Data Strategy",
      "Customer Experience Strategy",
      "Social Media & SEO/SEM Strategy",
      "Email & Partnership Strategy",
    ],
    "Development & Solutions": [
      "Website Design & UI/UX",
      "Web Development & Custom Applications",
      "E-Commerce & CMS Integration",
      "Mobile Responsive & SEO-Friendly Design",
      "Website Maintenance, Hosting & Security",
      "Conversion Optimization & Analytics",
    ],
    "Creation & Production": [
      "Graphic & Branding Design",
      "Video Production & Animation",
      "Content Creation & Copywriting",
      "Photography, Illustration & Iconography",
      "Interactive & Multimedia Design",
      "Audio Production",
    ],
    "Incubator & Consulting": [
      "Mentorship & Business Coaching",
      "Office Space & Co-working",
      "Networking & Workshops",
      "Funding Access & Investor Pitching",
      "Legal, Accounting & Marketing Support",
      "Technical Support & Accelerator Programs",
    ],
  };

  return (
    <section className="w-full py-20 relative bg-black text-white">
      <div className="w-full px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left">
          Our Services
        </h2>
        <div className="flex gap-2">
          {services.map((service, i) => (
            <Card key={i} title={service.title} link={`/work/${service.slug}`}>
              <div className="absolute inset-0">
                <CardRevealEffect
                  animationSpeed={4.0}
                  containerClassName="bg-black"
                  colors={revealColors}
                  dotSize={3}
                  showGradient={false}
                  loop={true}
                  loopDelay={2000}
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-full flex justify-center">
                    <ul className="space-y-3 text-base font-medium text-white/90 leading-relaxed text-left w-[70%] pl-12">
                      {serviceDetails[service.title].map((item, index) => (
                        <li key={index} className="transition-all duration-300 hover:text-white flex items-center gap-2 overflow-hidden">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70 flex-shrink-0">
                            <path
                              d="M4 4C4 4 13.5 6.5 14 8C14.5 9.5 4 13 4 13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, children, link }: CardProps) => {
  const [hovered, setHovered] = React.useState(false);
  const parts = title.split(" & ");
  const firstPart = parts[0] || title;
  const secondPart = parts[1] || "";
  return (
    <Link
      href={link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-lg border border-white/[0.2] group flex flex-col items-center justify-center p-4 h-[25vh] md:h-[35vh] w-full md:w-[24.75%]"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.2 }} className="relative z-20 flex flex-col items-center justify-center h-full -mt-8">
        <AceternityIcon className="h-5 w-5 mb-3" />
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white">{firstPart}</h2>
          {secondPart && (
            <>
              <span className="text-lg font-bold text-white">&</span>
              <h2 className="text-lg font-bold text-white">{secondPart}</h2>
            </>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

interface AceternityIconProps {
  className?: string;
}

const AceternityIcon = ({ className }: AceternityIconProps) => {
  return (
    <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

export default function WorkPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [shuffleHeroRef, shuffleHeroInView] = useInView({
    threshold: 0.5,
  });
  const [middleSectionRef, middleSectionInView] = useInView({
    threshold: 0.5,
  });
  const [featuredProjectsRef, featuredProjectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [threeCardsRef, threeCardsInView] = useInView({
    threshold: 0.1,
  });
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [bar1Progress, setBar1Progress] = React.useState(0);
  const [bar2Progress, setBar2Progress] = React.useState(0);
  const [bar3Progress, setBar3Progress] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(true);

  const mediaItems = [
    {
      type: 'video',
      url: "https://videos.pexels.com/video-files/10548180/10548180-sd_960_506_25fps.mp4",
      top: "Longueuil QC",
      title: "Social Distance",
      cta: "Learn More"
    },
    {
      type: 'video',
      url: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll3.webm",
      top: "Google Deepmind",
      title: "Design Mastery",
      cta: "Learn More"
    },
    {
      type: 'video',
      url: "https://videos.pexels.com/video-files/8721923/8721923-sd_960_506_25fps.mp4",
      top: "VR Project",
      title: "Augmented Cyberpunk",
      cta: "Learn More"
    }
  ];

  React.useEffect(() => {
    // Only show heavy components after initial load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      const increment = (100 / (7 * 60)); // 7 seconds at 60fps

      if (currentImageIndex === 0) {
        setBar1Progress(prev => {
          const newProgress = Math.min(100, prev + increment);
          if (newProgress >= 100) {
            setCurrentImageIndex(1);
          }
          return newProgress;
        });
      } else if (currentImageIndex === 1) {
        setBar2Progress(prev => {
          const newProgress = Math.min(100, prev + increment);
          if (newProgress >= 100) {
            setCurrentImageIndex(2);
          }
          return newProgress;
        });
      } else if (currentImageIndex === 2) {
        setBar3Progress(prev => {
          const newProgress = Math.min(100, prev + increment);
          if (newProgress >= 100) {
            setCurrentImageIndex(0);
            setBar1Progress(0);
            setBar2Progress(0);
            setBar3Progress(0);
          }
          return newProgress;
        });
      }
    }, 1000 / 60); // 60fps

    return () => clearInterval(interval);
  }, [currentImageIndex, isAnimating]);

  const handleProgressClick = (index: number) => {
    setIsAnimating(false);
    setCurrentImageIndex(index);
    setBar1Progress(0);
    setBar2Progress(0);
    setBar3Progress(0);
    setTimeout(() => setIsAnimating(true), 100);
  };

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SmoothScrollHero 
        mainVideoUrl="https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/heroscrollvideo.webm"
        parallaxVideoUrls={{
          video1: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll3.webm",
          video2: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll1.webm",
          video3: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll2.webm",
          video4: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll4z.webm"
        }}
      />

      <AnimatedSection>
        <motion.div 
          ref={shuffleHeroRef}
          className="w-full h-screen flex items-center"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ 
            opacity: shuffleHeroInView ? 1 : 0,
            y: shuffleHeroInView ? 0 : 100,
            scale: shuffleHeroInView ? 1 : 0.95,
            transition: { 
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.8 },
              y: { duration: 1 },
              scale: { duration: 1.2 }
            }
          }}
        >
          <ShuffleHero isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
        </motion.div>
      </AnimatedSection>

      {/* Middle Section */}
      <AnimatedSection>
        <motion.section 
          ref={middleSectionRef}
          className="w-full h-screen relative overflow-hidden"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ 
            opacity: middleSectionInView ? 1 : 0,
            y: middleSectionInView ? 0 : 100,
            scale: middleSectionInView ? 1 : 0.95,
            transition: { 
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 1 },
              y: { duration: 1.2 },
              scale: { duration: 1.4 }
            }
          }}
        >
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                className="absolute inset-0"
              >
                {mediaItems[currentImageIndex].type === 'image' ? (
                  <OptimizedImage
                    src={mediaItems[currentImageIndex].url}
                    alt="Middle Section Background"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                ) : (
                  <video
                    src={mediaItems[currentImageIndex].url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          {/* Progress Bars */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {mediaItems.map((_, index) => (
              <div 
                key={index}
                onClick={() => handleProgressClick(index)}
                className="w-16 md:w-24 h-[2px] bg-white/20 rounded-full overflow-hidden cursor-pointer hover:bg-white/30 transition-colors relative"
              >
                <div className="absolute inset-0 bg-white/20" />
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${index === 0 ? bar1Progress : index === 1 ? bar2Progress : bar3Progress}%`,
                    transition: {
                      duration: 0.1,
                      ease: "linear"
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="relative w-[90%] mx-auto h-full flex items-end pb-12 md:pb-20">
            <div className="space-y-1 w-full">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`top-${currentImageIndex}`}
                  initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { 
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  className="text-xs md:text-sm text-white/80"
                >
                  {mediaItems[currentImageIndex].top}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.h3 
                  key={`title-${currentImageIndex}`}
                  initial={{ opacity: 0, y: 70, filter: "blur(5px)" }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { 
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  className="text-2xl md:text-5xl font-light tracking-tight leading-[0.9] text-white uppercase"
                >
                  {mediaItems[currentImageIndex].title}
                </motion.h3>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.button 
                  key={`cta-${currentImageIndex}`}
                  onClick={() => setIsContactOpen(true)}
                  initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { 
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  className="group text-sm md:text-base text-white/80 hover:text-white inline-flex items-center gap-2 transition-all duration-300"
                  whileHover="hover"
                >
                  <motion.span 
                    className="relative"
                    initial={{ backgroundSize: "0% 2px" }}
                    animate={{ backgroundSize: "0% 2px" }}
                    variants={{
                      hover: {
                        backgroundSize: "100% 2px"
                      }
                    }}
                    style={{
                      background: "linear-gradient(currentColor, currentColor) no-repeat 0 100%",
                      backgroundSize: "0% 2px",
                      transition: "background-size 0.3s"
                    }}
                  >
                    {mediaItems[currentImageIndex].cta}
                  </motion.span>
                  <motion.div
                    variants={{
                      hover: {
                        x: 5,
                        y: -5,
                        transition: { type: "spring", stiffness: 300, damping: 10 }
                      }
                    }}
                  >
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 transition-transform" />
                  </motion.div>
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </AnimatedSection>

      {/* Three Cards Section */}
      <AnimatedSection>
        <motion.section 
          ref={threeCardsRef}
          className="w-full h-screen relative overflow-hidden bg-black text-white"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ 
            opacity: threeCardsInView ? 1 : 0,
            y: threeCardsInView ? 0 : 100,
            scale: threeCardsInView ? 1 : 0.95,
            transition: { 
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 1 },
              y: { duration: 1.2 },
              scale: { duration: 1.4 }
            }
          }}
        >
          <div className="w-full h-full px-4 md:px-6 flex items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "Card 1",
                  image: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll1.webm",
                  description: "Description for card 1"
                },
                {
                  title: "Card 2",
                  image: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/scroll2.webm",
                  description: "Description for card 2"
                },
                {
                  title: "Secret Spells",
                  image: "https://pub-b650344d00a64925b0ac01b33501589d.r2.dev/secretspell6.webp",
                  description: "Branding, Design, Packaging"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="relative h-[50vh] md:h-[80vh] rounded-lg overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: threeCardsInView ? 1 : 0,
                    y: threeCardsInView ? 0 : 50,
                    transition: { 
                      duration: 0.8,
                      delay: 0.2 * index,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                >
                  {card.image.endsWith('.webp') ? (
                    <OptimizedImage
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <video
                      src={card.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      preload="metadata"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <p className="text-[10px] md:text-xs text-white/80 mb-1 md:mb-2 line-clamp-2">{card.description}</p>
                    <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-1 md:mb-2">{card.title}</h3>
                    <motion.button 
                      onClick={() => setIsContactOpen(true)}
                      className="group text-xs md:text-sm text-white/80 hover:text-white inline-flex items-center gap-1 md:gap-2 transition-all duration-300"
                      whileHover="hover"
                    >
                      <motion.span 
                        className="relative"
                        initial={{ backgroundSize: "0% 2px" }}
                        animate={{ backgroundSize: "0% 2px" }}
                        variants={{
                          hover: {
                            backgroundSize: "100% 2px"
                          }
                        }}
                        style={{
                          background: "linear-gradient(currentColor, currentColor) no-repeat 0 100%",
                          backgroundSize: "0% 2px",
                          transition: "background-size 0.3s"
                        }}
                      >
                        Learn More
                      </motion.span>
                      <motion.div
                        variants={{
                          hover: {
                            x: 5,
                            y: -5,
                            transition: { type: "spring", stiffness: 300, damping: 10 }
                          }
                        }}
                      >
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 transition-transform" />
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatedSection>

      {/* Content Container */}
      <div className="w-full px-4 md:px-6">
        <div className="space-y-16 md:space-y-32">
          {/* Featured Projects Section */}
          <AnimatedSection>
            <section className="w-full py-8 md:py-20 bg-black text-white">
              <motion.div 
                className="w-full" 
                ref={featuredProjectsRef}
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ 
                  opacity: featuredProjectsInView ? 1 : 0,
                  y: featuredProjectsInView ? 0 : 100,
                  scale: featuredProjectsInView ? 1 : 0.95,
                  transition: { 
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 1 },
                    y: { duration: 1.2 },
                    scale: { duration: 1.4 }
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: featuredProjectsInView ? 1 : 0,
                    y: featuredProjectsInView ? 0 : 30,
                    transition: { 
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                >
                  {featuredProjectsInView && isVisible && <LayoutGridDemo />}
                </motion.div>
              </motion.div>
            </section>
          </AnimatedSection>
        </div>
      </div>

      <ContactModal open={isContactOpen} setOpen={setIsContactOpen} />
    </main>
  );
}
