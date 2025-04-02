"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import ShuffleHero from "../components/shuffle-hero";
import { SmoothScrollHero } from "../components/smooth-scroll-hero";
import { useInView } from 'react-intersection-observer';

// Dynamically import heavy components
const CardRevealEffect = dynamic(() => import("@/components/ui/card-reveal-effect").then(mod => mod.CardRevealEffect), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/50" />
});

const BackgroundBoxes = dynamic(() => import("@/components/ui/background-boxes").then(mod => mod.BackgroundBoxes), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
});

const AppleCardsCarouselDemo = dynamic(() => import("@/components/ui/apple-cards-carousel").then(mod => mod.AppleCardsCarouselDemo), {
  ssr: false,
  loading: () => <div className="w-full h-[40rem] bg-black/50 animate-pulse" />
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
      className="relative overflow-hidden rounded-lg border border-white/[0.2] group flex flex-col items-center justify-center p-4 h-[35vh] w-[24.75%]"
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    // Only show heavy components after initial load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SmoothScrollHero />
      <div className="w-[80%] mx-auto py-20">
        <ShuffleHero />
      </div>

      {/* Content Container */}
      <div className="w-[80%] mx-auto">
        <div className="space-y-32">
          {/* Previous Works Section */}
          <section className="w-full py-20 bg-black text-white">
            <div className="w-full">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-12"
              >
                Previous Works
              </motion.h3>
              <div ref={ref}>
                {inView && isVisible && <AppleCardsCarouselDemo />}
              </div>
            </div>
          </section>

          {/* Featured Projects Section */}
          <section className="w-full py-20 bg-black text-white">
            <div className="w-full">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-12"
              >
                Featured Projects
              </motion.h3>
              {inView && isVisible && <LayoutGridDemo />}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
