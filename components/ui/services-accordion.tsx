"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const servicesData = [
  {
    title: "Strategy / Consulting",
    items: {
      left: [
        "Marketing strategy",
        "Brand strategy",
        "Content strategy",
        "Business consultation",
      ],
      right: [
        "Digital strategy",
        "Campaign strategy",
        "Data strategy",
      ]
    }
  },
  {
    title: "Creative / Design",
    items: {
      left: [
        "Creative direction",
        "Video production",
        "Visual design",
      ],
      right: [
        "Branding",
        "UX / UI design",
        "Motion / 3D",
      ]
    }
  },
  {
    title: "Media Planning / Buying",
    items: {
      left: [
        "Campaign management",
        "Traditional media",
        "Media tracking / Reporting",
      ],
      right: [
        "Digital media",
        "Email marketing / Automation",
        "Search engine optimisation",
      ]
    }
  },
  {
    title: "Technology / Code",
    items: {
      left: [
        "Web development",
        "App development",
        "System integration",
      ],
      right: [
        "Cloud solutions",
        "API development",
        "Technical consulting",
      ]
    }
  },
  {
    title: "Content / Social",
    items: {
      left: [
        "Content creation",
        "Social media management",
        "Copywriting",
      ],
      right: [
        "Community management",
        "Influencer partnerships",
        "Social analytics",
      ]
    }
  }
];

const ServicesAccordion = () => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full bg-black text-white">
      <div className="w-[80%] mx-auto pt-0 pb-20">
        <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">Services</h1>
        <p className="text-xl font-light text-white/70 max-w-3xl mb-16 leading-relaxed">
          Our curated suite of services deliver integrated end-to-end strategies that unite creative,
          media, technology, content, and insights. With relentless, coordinated collaboration of
          specialist teams, we deliver outcomes and results that take brands forward.
        </p>
        
        <div>
          {servicesData.map((service, index) => (
            <div key={index} className="border-t border-white/10 first:border-t-0">
              <motion.button
                onClick={() => toggleSection(index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <motion.span 
                  className="text-2xl md:text-3xl font-light tracking-tight"
                  animate={{
                    opacity: expandedIndices.includes(index) ? 1 : 0.7
                  }}
                >
                  {service.title}
                </motion.span>
                <motion.div
                  animate={{ 
                    rotate: expandedIndices.includes(index) ? 180 : 0,
                    opacity: expandedIndices.includes(index) ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                  className="transform group-hover:opacity-100 transition-opacity"
                >
                  <ChevronDown className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {expandedIndices.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 grid grid-cols-2 gap-x-16">
                      <div className="space-y-4">
                        {service.items.left.map((item, i) => (
                          <div 
                            key={i} 
                            className="text-base md:text-lg font-light text-white/70 hover:text-white transition-all duration-300 cursor-pointer group/item"
                          >
                            <span className="inline-block transform group-hover/item:translate-x-2 transition-transform duration-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {service.items.right.map((item, i) => (
                          <div 
                            key={i} 
                            className="text-base md:text-lg font-light text-white/70 hover:text-white transition-all duration-300 cursor-pointer group/item"
                          >
                            <span className="inline-block transform group-hover/item:translate-x-2 transition-transform duration-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ServicesAccordion }; 