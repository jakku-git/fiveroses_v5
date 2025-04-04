"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyCardProps {
  title?: string;
  category?: string;
  image?: string;
  logo?: string;
  link?: string;
  type?: "content" | "simple-image";
}

const HoverRevealSlip = ({ show }: { show: React.ReactNode }) => {
  return (
    <div className="group relative h-[600px] w-full [perspective:1000px] cursor-pointer">
      {/* Back cover with shadow */}
      <div className="absolute inset-0 h-full w-full rounded-xl bg-neutral-900/80 shadow-2xl"></div>

      {/* Card container with book opening effect */}
      <div className="relative z-50 h-full w-full origin-[0%_50%] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(-25deg)]">
        {/* Front side */}
        <div className="absolute flex w-full h-full [backface-visibility:hidden] rounded-xl bg-neutral-900 shadow-2xl overflow-hidden">
          {show}
        </div>
      </div>

      {/* Sliding tab */}
      <div className="z-1 absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-xl bg-rose-500 pl-2 pt-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [backface-visibility:hidden] group-hover:translate-x-0 group-hover:rotate-[5deg] group-hover:shadow-2xl">
        <div className="-rotate-90 whitespace-nowrap pb-16 pr-9">Click to read</div>
      </div>
    </div>
  );
};

const ContentCard = ({ title, category, image, logo }: CaseStudyCardProps) => {
  return (
    <div
      className="relative flex h-full flex-col items-start justify-between rounded-xl p-8"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 rounded-xl bg-black/60 mix-blend-multiply" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {category && (
              <motion.span 
                className="px-4 py-1.5 bg-rose-500/20 text-rose-400 rounded-full text-[13px] font-medium tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {category}
              </motion.span>
            )}
          </div>

          {title && (
            <motion.h3 
              className="text-[2.5rem] font-bold tracking-tight leading-[1.1] text-white group-hover:text-rose-400/90 transition-colors duration-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h3>
          )}
        </div>

        <motion.div 
          className="flex items-center justify-between pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {logo && (
            <img src={logo} alt={title} className="h-10 rounded-lg shadow-lg" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

const SimpleImageCard = ({ image }: CaseStudyCardProps) => {
  return (
    <div
      className="relative flex w-full flex-col items-start justify-between rounded-xl p-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default function CaseStudyCard({
  title,
  category,
  link,
  image,
  logo,
  type = "content",
}: CaseStudyCardProps) {
  return (
    <div className="flex gap-8">
      <Link href={link || "#"} className="block w-full">
        <HoverRevealSlip
          show={
            type === "content" ? (
              <ContentCard title={title} category={category} image={image} logo={logo} />
            ) : (
              <SimpleImageCard image={image} />
            )
          }
        />
      </Link>
    </div>
  );
}