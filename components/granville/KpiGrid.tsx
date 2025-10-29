"use client";

import { motion } from "framer-motion";
import { kpis } from "@/data/granvillePlan";

export default function KpiGrid() {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-light mb-12 text-slate-900"
        >
          Objectives & KPIs
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-light text-slate-900 mb-3 leading-snug">{kpi.label}</h3>
              <div className="text-2xl font-light text-slate-700">{kpi.target}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

