"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

const accordionData = [
  {
    title: "Marketing & Strategy",
    subtitle: "Data-Driven Growth",
    content: "Our comprehensive marketing and strategy services help brands reach their full potential through data-driven insights, creative campaigns, and strategic planning. We combine analytics with creativity to deliver measurable results.",
    image: "/pexels-thisisengineering-3913025.jpg",
    cta: "Explore Services",
    slug: "marketing"
  },
  {
    title: "Development & Solutions",
    subtitle: "Digital Innovation",
    content: "We build cutting-edge digital solutions that combine innovative technology with user-centric design to create seamless, engaging experiences. From web applications to mobile solutions, we bring ideas to life.",
    image: "/pexels-tobiasbjorkli-1661496.jpg",
    cta: "View Projects",
    slug: "web-solutions"
  },
  {
    title: "Creation & Production",
    subtitle: "Creative Excellence",
    content: "From stunning visuals to compelling content, our creative team brings your brand's story to life through high-quality design and production. We craft memorable experiences that resonate with your audience.",
    image: "/pexels-eva-bronzini-7661330.jpg",
    cta: "See Our Work",
    slug: "creative-production"
  },
  {
    title: "Incubator & Consulting",
    subtitle: "Business Growth",
    content: "We nurture and accelerate business growth through mentorship, resources, and strategic guidance to help startups and established companies thrive. Our incubator program provides the support you need to scale.",
    image: "/pexels-ron-lach-9594419.jpg",
    cta: "Get Started",
    slug: "incubator"
  },
];

const ScrollAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight / 2; // Reduced height
      const index = Math.min(
        accordionData.length - 1,
        Math.floor(scrollY / sectionHeight)
      );
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxProvider>
      <div className="relative h-[200vh] bg-black"> {/* Reduced height */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black overflow-hidden">
          <div className="w-full h-full">
            {accordionData.map((item, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  height: activeIndex === index ? "50%" : "8rem", // Increased from 5rem to 8rem
                  opacity: activeIndex === index ? 1 : 0.3,
                  scale: activeIndex === index ? 1 : 0.98,
                }}
                transition={{ duration: 0.4 }}
                className={`overflow-hidden rounded-none border-b border-white/10 transition-all ${
                  activeIndex === index
                    ? "bg-white/5"
                    : "bg-transparent"
                }`}
              >
                <div className="w-full h-full flex">
                  {/* Left Content */}
                  <div className="w-1/2 h-full flex flex-col justify-center px-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col">
                        <motion.h2 
                          className="text-2xl md:text-3xl lg:text-4xl font-light text-white/70 mb-2"
                          animate={{ 
                            opacity: activeIndex === index ? 1 : 0,
                            height: activeIndex === index ? "auto" : 0,
                            marginBottom: activeIndex === index ? "0.5rem" : 0
                          }}
                        >
                          {item.subtitle}
                        </motion.h2>
                        <motion.h1 
                          className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black text-white tracking-tight"
                          animate={{ 
                            fontSize: activeIndex === index 
                              ? "clamp(2.5rem, 5vw, 4.5rem)" 
                              : "clamp(1.5rem, 3vw, 2rem)",
                            opacity: 1,
                            y: activeIndex === index ? 0 : -20
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.title}
                        </motion.h1>
                      </div>
                      <motion.div
                        animate={{ 
                          opacity: activeIndex === index ? 1 : 0,
                          height: activeIndex === index ? "auto" : 0
                        }}
                        className="space-y-4 overflow-hidden"
                      >
                        <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed max-w-xl">
                          {item.content}
                        </p>
                        <motion.a
                          href={`/work/${item.slug}`}
                          className="group inline-flex items-center gap-2 text-base md:text-lg lg:text-xl font-light text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
                          whileHover={{ x: 5 }}
                        >
                          {item.cta}
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Right Media */}
                  <div className="w-1/2 h-full relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute inset-0 bg-white/5 rounded-2xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export { ScrollAccordion }; 