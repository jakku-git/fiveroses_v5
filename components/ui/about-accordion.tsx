"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type AboutSection = {
  title: string;
  content: string[] | Array<{
    subtitle: string;
    text: string;
  }>;
};

const aboutData: AboutSection[] = [
  {
    title: "Our Vision",
    content: [
      "We see a future where creativity and technology are no longer separate disciplines, but equal partners in the pursuit of great storytelling. Our vision is to help shape that future—one bold idea at a time.",
      "In a world overflowing with noise, we aim to create clarity through design, depth through strategy, and connection through craft. We build for humans, not just users. For real moments, not just metrics.",
      "Our ambition is to design experiences that linger in memory long after the screen fades to black."
    ]
  },
  {
    title: "Our Approach",
    content: [
      "We treat every project like a collaboration—not a transaction. It starts with listening. We take time to understand the heart of your brand, your goals, and the challenges that keep you up at night. Then we dive deep.",
      "From there, we blend sharp strategy with bold creativity and technical precision. We explore. We prototype. We refine. Every step is guided by purpose, every detail crafted with care.",
      "Whether it's launching a startup, reinventing a legacy brand, or building something never seen before—we meet each challenge with curiosity, passion, and an uncompromising standard of excellence."
    ]
  },
  {
    title: "What Sets Us Apart",
    content: [
      {
        subtitle: "Innovation",
        text: "We're not afraid to go first. We experiment with emerging technologies, challenge creative norms, and push the boundaries of what's possible—so your brand can stand out in a sea of sameness."
      },
      {
        subtitle: "Pixel Perfect",
        text: "Details matter. From the micro-interactions on your website to the tone of a single sentence, we obsess over the small things because they shape how people feel about the big picture."
      },
      {
        subtitle: "Collaboration",
        text: "We believe the best work comes from genuine partnership. That means transparency, communication, and a shared commitment to bringing your vision to life—together."
      }
    ]
  }
];

const AboutAccordion = () => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isFeatureSection = (content: AboutSection['content']): content is Array<{ subtitle: string; text: string; }> => {
    return content.length > 0 && typeof content[0] === 'object' && 'subtitle' in content[0];
  };

  return (
    <div className="w-full bg-black text-white">
      <div className="w-[90%] md:w-[80%] mx-auto pt-0 pb-20">
        <div className="px-4 md:px-0">
          {aboutData.map((section, index) => (
            <div key={index} className="border-t border-white/10 first:border-t-0">
              <motion.button
                onClick={() => toggleSection(index)}
                className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
              >
                <motion.span 
                  className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight"
                  animate={{
                    opacity: expandedIndices.includes(index) ? 1 : 0.7
                  }}
                >
                  {section.title}
                </motion.span>
                  <motion.div
                  animate={{ 
                    rotate: expandedIndices.includes(index) ? 180 : 0,
                    opacity: expandedIndices.includes(index) ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                  className="transform group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
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
                    <div className="pb-6 md:pb-8">
                      {isFeatureSection(section.content) ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                          {section.content.map((item, i) => (
                            <div key={i} className="space-y-3 md:space-y-4">
                              <h3 className="text-lg md:text-xl font-light tracking-tight">{item.subtitle}</h3>
                              <p className="text-sm md:text-base lg:text-lg font-light text-white/70 leading-relaxed">
                                {item.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3 md:space-y-4">
                          {section.content.map((paragraph, i) => (
                            <p key={i} className="text-sm md:text-base lg:text-lg font-light text-white/70 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
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

export { AboutAccordion }; 