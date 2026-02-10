"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { budget } from "@/data/granvillePlan";
import { formatCurrency } from "@/lib/format";

const GST_RATE = 0.10; // 10% Australian GST
const ANNUAL_BUDGET = 145000; // Annual budget excluding GST

export default function BudgetTable() {
  const [gstIncluded, setGstIncluded] = useState(true);
  const [sortBy, setSortBy] = useState<'category' | 'inclusions' | 'cost'>('category');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedBudget = [...budget].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'category') {
      comparison = a.category.localeCompare(b.category);
    } else if (sortBy === 'inclusions') {
      comparison = a.inclusions.localeCompare(b.inclusions);
    } else if (sortBy === 'cost') {
      comparison = a.annual - b.annual;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalExcludingGst = sortedBudget.reduce((sum, item) => sum + item.annual, 0);
  const totalIncludingGst = totalExcludingGst * (1 + GST_RATE);
  const gstAmount = totalExcludingGst * GST_RATE;
  
  const displayTotal = gstIncluded ? totalIncludingGst : totalExcludingGst;

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

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
            Budget Summary
          </h2>

          {/* GST Toggle */}
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-base md:text-lg font-light text-slate-900 mb-1">Display Prices</p>
              <p className="text-xs md:text-sm text-slate-600">Toggle to view prices with or without GST</p>
            </div>
            <label className="flex items-center cursor-pointer min-h-[44px] touch-manipulation">
              <input
                type="checkbox"
                checked={gstIncluded}
                onChange={(e) => setGstIncluded(e.target.checked)}
                className="sr-only"
              />
              <div className={`relative w-14 h-8 rounded-full transition-colors ${gstIncluded ? 'bg-slate-900' : 'bg-slate-300'} active:opacity-80`}>
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${gstIncluded ? 'translate-x-6' : ''}`} />
              </div>
              <span className="ml-3 text-slate-700">
                {gstIncluded ? 'Inc GST' : 'Ex GST'}
              </span>
            </label>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th
                      className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 active:text-slate-950 transition-colors whitespace-nowrap min-h-[44px] touch-manipulation"
                      onClick={() => handleSort('category')}
                    >
                      Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 active:text-slate-950 transition-colors min-h-[44px] touch-manipulation"
                      onClick={() => handleSort('inclusions')}
                    >
                      Inclusions {sortBy === 'inclusions' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="text-right p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 active:text-slate-950 transition-colors whitespace-nowrap min-h-[44px] touch-manipulation"
                      onClick={() => handleSort('cost')}
                    >
                      Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBudget.map((item, index) => {
                    const displayCost = gstIncluded ? item.annual * (1 + GST_RATE) : item.annual;
                    return (
                      <tr
                        key={`${item.key}`}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-slate-900 font-medium">{item.category}</td>
                        <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-slate-700">{item.inclusions}</td>
                        <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-right font-medium text-slate-900 whitespace-nowrap">
                          {formatCurrency(displayCost)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-50 font-medium">
                    <td colSpan={2} className="p-2 sm:p-3 md:p-4 text-sm sm:text-base md:text-lg text-slate-900">
                      Total
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-sm sm:text-base md:text-lg text-right text-slate-900 whitespace-nowrap">
                      {formatCurrency(displayTotal)}
                    </td>
                  </tr>
                  {!gstIncluded && (
                    <tr>
                      <td colSpan={2} className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-slate-600">
                        Total GST
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-right text-slate-600 whitespace-nowrap">
                        {formatCurrency(gstAmount)}
                      </td>
                    </tr>
                  )}
                </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Callout Box */}
          <div className="mt-8 md:mt-12 p-4 md:p-8 bg-white rounded-lg border border-slate-200">
            <h4 className="text-lg md:text-xl font-light mb-3 md:mb-4 text-slate-900">Assumptions & Notes</h4>
            <ul className="space-y-2 text-sm md:text-base text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>All costs shown are in AUD and exclude GST unless toggled to include</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Upfront items (portals, OOH) paid in January; retainer costs spread evenly across 12 months</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Media allocations include burst periods in March, July, and November</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Contingency allows for seasonal boosts and creative refreshes</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
