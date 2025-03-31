"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What services does fiveroses offer?",
    answer:
      "fiveroses offers a comprehensive range of marketing services, including digital marketing, brand strategy, web development, creative production, and startup incubation.",
  },
  {
    question: "How do I get started with fiveroses?",
    answer:
      "Simply fill out the contact form on this page or give us a call. We'll schedule an initial consultation to discuss your needs and how we can help.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary depending on the scope and complexity of the work. During our initial consultation, we'll provide you with a detailed timeline for your specific project.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes, we work with clients from around the world. Our digital capabilities allow us to collaborate effectively regardless of location.",
  },
  {
    question: "How do you measure the success of your marketing campaigns?",
    answer:
      "We use a data-driven approach to measure the success of our campaigns, tracking key performance indicators (KPIs) that align with your business goals.",
  },
];

const FaqAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-black text-white">
      <div className="w-[80%] mx-auto pt-0 pb-20">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">Frequently Asked Questions</h2>
        <p className="text-xl font-light text-white/70 max-w-3xl mb-16 leading-relaxed">
          Find answers to common questions about our services and how we can help your business grow.
        </p>
        
        <div>
          {faqData.map((faq, index) => (
            <div key={index} className="border-t border-white/10 first:border-t-0">
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <motion.span 
                  className="text-2xl md:text-3xl font-light tracking-tight"
                  animate={{
                    opacity: expandedIndex === index ? 1 : 0.7
                  }}
                >
                  {faq.question}
                </motion.span>
                <motion.div
                  animate={{ 
                    rotate: expandedIndex === index ? 180 : 0,
                    opacity: expandedIndex === index ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                  className="transform group-hover:opacity-100 transition-opacity"
                >
                  <ChevronDown className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8">
                      <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                        {faq.answer}
                      </p>
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

export { FaqAccordion }; 