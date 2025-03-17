"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CardRevealEffect } from "@/components/ui/card-reveal-effect";
import { BackgroundBoxes } from "@/components/ui/background-boxes";

// Horizontal Our Services Section
const OurServicesHorizontal = () => {
  // Red–purple scheme from aceternity’s demo.
  const revealColors = [
    [236, 72, 153],
    [232, 121, 249],
  ];

  const services = ["Marketing", "Development", "Creative", "Incubator"];

  const serviceDetails: { [key: string]: string[] } = {
    Marketing: [
      "Marketing & Digital Strategy",
      "Brand & Campaign Strategy",
      "Content & Data Strategy",
      "Customer Experience Strategy",
      "Social Media & SEO/SEM Strategy",
      "Email & Partnership Strategy",
    ],
    Development: [
      "Website Design & UI/UX",
      "Web Development & Custom Applications",
      "E-Commerce & CMS Integration",
      "Mobile Responsive & SEO-Friendly Design",
      "Website Maintenance, Hosting & Security",
      "Conversion Optimization & Analytics",
    ],
    Creative: [
      "Graphic & Branding Design",
      "Video Production & Animation",
      "Content Creation & Copywriting",
      "Photography, Illustration & Iconography",
      "Interactive & Multimedia Design",
      "Audio Production",
    ],
    Incubator: [
      "Mentorship & Business Coaching",
      "Office Space & Co-working",
      "Networking & Workshops",
      "Funding Access & Investor Pitching Preparation",
      "Legal, Accounting & Marketing Support",
      "Technical Support & Accelerator Programs",
    ],
  };

  return (
    <section className="w-full min-h-[60vh] relative bg-black text-white mt-8">
      <div className="relative z-10 flex items-center justify-center h-full px-8">
        <div className="flex space-x-4">
          {services.map((service, i) => (
            <Card
              key={i}
              title={service}
              link={`/work/${service.toLowerCase().replace(" ", "-")}`}
            >
              <div className="absolute inset-0">
                <CardRevealEffect
                  animationSpeed={2.0}
                  containerClassName="bg-black"
                  colors={revealColors}
                  dotSize={3}
                  showGradient={false}
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <ul className="space-y-4 text-lg font-bold text-white leading-relaxed text-center">
                    {serviceDetails[service].map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({
  title,
  children,
  link,
}: {
  title: string;
  children?: React.ReactNode;
  link: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      href={link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-lg border border-white/[0.2] group flex flex-col items-center justify-center p-4 h-[50vh] w-[23vw]"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative z-20 flex flex-col items-center justify-center h-full"
      >
        <div className="mb-3">
          <AceternityIcon className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold transition duration-200 text-white">
          {title}
        </h2>
      </motion.div>
    </Link>
  );
};

const AceternityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] relative bg-black text-white">
        <BackgroundBoxes className="absolute inset-0" />
      </section>

      {/* Our Services Horizontal Section */}
      <OurServicesHorizontal />

      {/* Featured Projects Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12">
            Featured Projects
          </h2>
          {/* Your existing featured projects code goes here */}
        </div>
      </section>
    </main>
  );
}
