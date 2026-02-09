"use client";

import { motion } from "framer-motion";
import { Download, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          src="/Granville Place.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>
      
      <div className="relative z-20 w-[95%] sm:w-[90%] md:w-[80%] mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 text-white leading-tight px-2">
            Granville Place
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-2 px-2">
            12-Month Growth Plan
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light px-2">
            A$145,000 | Search, Social, OOH, Chinese Media, CRO
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="#contact"
            className="bg-white text-slate-900 px-8 py-4 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            Talk to Us
          </motion.a>
          <motion.a
            href="mailto:hello@fiveroses.com.au?subject=Granville Place Proposal - PDF Request&body=Hi,%0D%0A%0D%0APlease send me the PDF version of the Granville Place 12-month growth proposal.%0D%0A%0D%0AThanks!"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            Download PDF
          </motion.a>
        </motion.div>

        {/* Stats chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "Budget", value: "A$145K" },
            { label: "Timeline", value: "12 Months" },
            { label: "Focus", value: "Dual Market" }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3"
            >
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white mb-0.5">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

