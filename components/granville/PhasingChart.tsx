"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { budget, phasing } from "@/data/granvillePlan";

export default function PhasingChart() {
  const [viewMode, setViewMode] = useState<"channel" | "month">("month");

  // Calculate monthly totals from phasing data
  const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
    return phasing.reduce((sum, phase) => sum + (phase.months[i] || 0), 0);
  });

  // Calculate channel totals
  const channelTotals = budget.map(item => {
    const phase = phasing.find(p => p.key === item.key);
    return {
      category: item.category,
      total: item.annual,
      allocation: phase ? phase.months : Array(12).fill(0)
    };
  });

  const maxSpend = Math.max(...monthlyTotals);
  const maxChannelSpend = Math.max(...channelTotals.map(c => c.total));

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900">
              Monthly Phasing
            </h2>
            
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("channel")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === "channel" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                By Channel
              </button>
              <button
                onClick={() => setViewMode("month")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === "month" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                By Month
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            {viewMode === "month" ? (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <svg
                  viewBox="0 0 1200 400"
                  className="w-full h-auto min-w-[600px]"
                >
                {/* Y-axis labels */}
                {[0, 25000, 50000, 75000, 100000].map((value, i) => (
                  <g key={value}>
                    <text
                      x="20"
                      y={380 - (i * 95)}
                      className="text-xs fill-slate-600"
                    >
                      ${value / 1000}K
                    </text>
                    <line
                      x1="50"
                      y1={380 - (i * 95)}
                      x2="1150"
                      y2={380 - (i * 95)}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-slate-200"
                    />
                  </g>
                ))}

                {/* Bars for each month */}
                {months.map((month, index) => {
                  const height = (monthlyTotals[index] / maxSpend) * 300;
                  const isBurst = [2, 6, 10].includes(index); // Mar, Jul, Nov (0-indexed)
                  const isUpfront = index === 0;
                  
                  return (
                    <g key={month}>
                      <rect
                        x={60 + index * 90}
                        y={380 - height}
                        width="70"
                        height={height}
                        fill={isBurst || isUpfront ? "#3b82f6" : "#60a5fa"}
                        rx="4"
                        className="hover:opacity-80 transition-opacity"
                      />
                      <text
                        x={95 + index * 90}
                        y={400}
                        textAnchor="middle"
                        className="text-xs fill-slate-700 font-medium"
                      >
                        {month}
                      </text>
                      <title>
                        {month} {new Date(2024, index, 1).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}: ${monthlyTotals[index].toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </title>
                    </g>
                  );
                })}
                </svg>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {channelTotals.map((channel, index) => {
                  const barWidth = (channel.total / maxChannelSpend) * 100;
                  const isUpfront = channel.allocation.filter(m => m > 0).length === 1 && channel.allocation[0] > 0;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-900">{channel.category}</span>
                        <span className="text-slate-600">${channel.total.toLocaleString('en-AU')}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-6 relative overflow-hidden">
                        <div
                          className={`h-6 rounded-full transition-all duration-500 ${
                            isUpfront ? 'bg-blue-600' : 'bg-blue-400'
                          }`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-slate-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-2 sm:mb-3">Burst Months (Mar, Jul, Nov)</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                SEM/Meta media spend concentrated during these periods for maximum impact. Chinese media and video production also aligned to these bursts for coordinated campaigns.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
