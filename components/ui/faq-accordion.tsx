"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What makes <span class='font-bold text-white'>fiveroses</span> different from other creative agencies?",
    answer: [
      "At <span class='font-bold text-white'>fiveroses</span>, we blend artistic vision with strategic thinking to create memorable brand experiences. Our unique approach combines data-driven insights with creative excellence, ensuring every project delivers both aesthetic impact and measurable results.",
      "We're not just designers or strategists—we're storytellers who understand the power of emotional connection in brand building. Our team brings together diverse expertise in creative direction, digital innovation, and strategic planning to craft solutions that resonate with your audience."
    ]
  },
  {
    question: "How does <span class='font-bold text-white'>fiveroses</span> approach brand strategy and creative development?",
    answer: [
      "Our brand strategy process begins with deep research and discovery. We analyze market trends, competitor positioning, and audience insights to develop a comprehensive understanding of your brand's unique value proposition.",
      "From there, we craft a strategic framework that guides all creative decisions—from visual identity to messaging and digital presence. This ensures consistency across all touchpoints while maintaining the flexibility to adapt to evolving market conditions."
    ]
  },
  {
    question: "What types of digital solutions does <span class='font-bold text-white'>fiveroses</span> offer?",
    answer: [
      "We specialize in creating immersive digital experiences that combine cutting-edge technology with intuitive design. Our digital solutions include custom web development, interactive applications, e-commerce platforms, and digital marketing campaigns.",
      "Our development team stays ahead of emerging technologies, allowing us to implement innovative features like AI integration, real-time data visualization, and immersive 3D experiences that set your brand apart."
    ]
  },
  {
    question: "How does <span class='font-bold text-white'>fiveroses</span> measure the success of creative projects?",
    answer: [
      "We believe in a balanced approach to measuring success, combining quantitative metrics with qualitative impact. For each project, we establish clear KPIs aligned with your business objectives, tracking metrics such as engagement rates, conversion rates, and brand sentiment.",
      "Beyond the numbers, we evaluate the emotional resonance of our work through user feedback, brand perception studies, and market response. This comprehensive approach ensures we're delivering both measurable results and meaningful brand experiences."
    ]
  },
  {
    question: "What is <span class='font-bold text-white'>fiveroses</span>' process for creative collaboration?",
    answer: [
      "Our collaborative process is built on transparency, communication, and partnership. We begin with an in-depth discovery phase, where we work closely with you to understand your vision, goals, and challenges.",
      "Throughout the project, we maintain regular check-ins and feedback sessions, ensuring alignment at every stage. Our agile methodology allows for iterative refinement while keeping projects on track and within scope. We believe the best results come from true partnership between agency and client."
    ]
  }
];

const FaqAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-black text-white">
      <div className="w-[80%] mx-auto pt-24 pb-20">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">Frequently Asked Questions</h2>
        <p className="text-xl font-light text-white/70 max-w-3xl mb-16 leading-relaxed">
          Discover how <span className="font-bold text-white">fiveroses</span> combines creative excellence with strategic thinking to deliver exceptional brand experiences. 
          Learn about our approach, services, and what makes us different in the creative industry.
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
                  dangerouslySetInnerHTML={{ __html: faq.question }}
                />
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
                    <div className="pb-8 space-y-4">
                      {Array.isArray(faq.answer) ? (
                        faq.answer.map((paragraph, i) => (
                          <p 
                            key={i} 
                            className="text-base md:text-lg font-light text-white/70 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ))
                      ) : (
                        <p 
                          className="text-base md:text-lg font-light text-white/70 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
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

export { FaqAccordion }; 