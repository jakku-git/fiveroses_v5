"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keywords, contentCalendar, leadWorkflow, landingRequirements } from "@/data/granvillePlan";

export default function AppendicesTabs() {
  const [activeTab, setActiveTab] = useState<string>("keywords");

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-slate-900">
            Appendices
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200">
            {[
              { id: "keywords", label: "Keyword Clusters" },
              { id: "calendar", label: "Content Calendar" },
              { id: "workflow", label: "Lead Workflow" },
              { id: "requirements", label: "Landing Requirements" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-slate-200 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "keywords" && (
                  <div>
                    <h3 className="text-2xl font-light mb-6 text-slate-900">
                      Target Keywords
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {keywords.map((keyword, index) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div className="text-slate-700">{keyword}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "calendar" && (
                  <div>
                    <h3 className="text-2xl font-light mb-6 text-slate-900">
                      12-Month Content Calendar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {contentCalendar.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div className="text-sm text-blue-600 font-medium">
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "workflow" && (
                  <div>
                    <h3 className="text-2xl font-light mb-6 text-slate-900">
                      Lead Handling Workflow
                    </h3>
                    <ol className="space-y-4">
                      {leadWorkflow.map((step, index) => (
                        <li
                          key={index}
                          className="flex gap-4 text-slate-700"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {activeTab === "requirements" && (
                  <div>
                    <h3 className="text-2xl font-light mb-6 text-slate-900">
                      Landing Page Requirements
                    </h3>
                    <ul className="space-y-3">
                      {landingRequirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

