"use client";

import { motion } from "framer-motion";

export default function ExecutiveSummary() {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-slate-900">
            Executive Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-slate-900">
                  Granville Place Growth Strategy
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  A comprehensive 12-month marketing plan with A$145K investment, centering on 
                  property portals (realestate.com.au and domain.com.au) as the cornerstone, 
                  complemented by search, social, OOH, and performance channels to reach local 
                  Australian and Chinese-speaking audiences.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-light text-slate-900">
                  Dual-Audience Approach
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Portal-focused strategy reaching local buyers with strong Realestate.com.au and 
                  Domain.com.au visibility, while supportive bilingual campaigns on WeChat, REDBook, 
                  and SydneyToday provide targeted reach to Chinese-speaking investors during key 
                  bursts in March, July, and November.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-light text-slate-900">
                  Performance Measurement
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Comprehensive analytics framework with GA4 event tracking, Looker dashboards, 
                  and monthly executive summaries tracking brand search index, organic sessions, 
                  qualified leads, CTR, CPL, and Chinese social reach.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-light text-slate-900">
                  Expected Outcomes
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Brand search index increase of 30%, organic sessions growth of 60% YoY, 
                  qualified lead generation of 800-950 per year with 35-40% from portals, 
                  and supportive multilingual social reach of 150-200K views across WeChat, 
                  REDBook, and SydneyToday.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-24 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="p-8 bg-white rounded-lg border border-slate-200"
                >
                  <h4 className="text-xl font-light mb-6 text-slate-900">
                    Investment Overview
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-light text-slate-900">A$145,000</p>
                        <p className="text-sm text-slate-600">Total Annual Budget</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-light text-slate-900">12 Months</p>
                        <p className="text-sm text-slate-600">Campaign Duration</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-light text-slate-900">16 Channels</p>
                        <p className="text-sm text-slate-600">Active Platforms</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="p-8 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <h4 className="text-xl font-light mb-4 text-slate-900">
                    Key Channels
                  </h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Portals - Realestate.com.au & Domain (A$35K)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span>SEM - Google Ads (A$23K)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span>SEO Retainer (A$16.5K)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Meta - Facebook & Instagram (A$14.5K)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span>OOH - Granville Station (A$13K)</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

