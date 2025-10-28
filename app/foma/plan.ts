export type Billing = "Upfront" | "Monthly" | "Quarterly" | "One-off" | "Annual" | "Annual (First Payment Up-Front)";

export interface BudgetItem {
  category: string;
  item: string;
  costAudInclGst: number; // default numbers include GST; GST toggle will back-calc
  billing: Billing;
  notes?: string;
  fixed?: boolean;
}

export interface PlanData {
  brand: "Foma";
  currency: "AUD";
  gstRate: number; // 0.10
  items: BudgetItem[];
}

export const planData: PlanData = {
  brand: "Foma",
  currency: "AUD",
  gstRate: 0.10, // 10% Australian GST
  items: [
    // Fixed website cost
    { category: "Foundations", item: "Website Design & Build", costAudInclGst: 7500, billing: "Upfront", notes: "Design, build, CRO-ready; launch QA", fixed: true },

    // Hosting / Infra / Tools
    { category: "Foundations", item: "Hosting & Infrastructure (Domain,Host, CDN, logging)", costAudInclGst: 3500, billing: "Annual (First Payment Up-Front)", notes: "Avg ~$300/mo incl. traffic & overages" },
    { category: "Foundations", item: "Analytics & CRO Tools", costAudInclGst: 1500, billing: "Annual (First Payment Up-Front)", notes: "Product analytics + heatmaps (Hotjar/Clarity tier)" },

    // Content Engine
    { category: "Content", item: "Content Production (photography, video, UGC)", costAudInclGst: 1500, billing: "Monthly", notes: "~$1,500/mo for lookbooks, product shots, short videos" },

    // Paid Media
    { category: "Paid Media", item: "Meta Ads (Prospecting & Retargeting)", costAudInclGst: 2200, billing: "Monthly", notes: "~$2,200/mo; prospecting + remarketing (scale with ROAS)" },
    { category: "Paid Media", item: "Google Search & Performance Max", costAudInclGst: 1700, billing: "Monthly", notes: "~$1,700/mo; search + shopping ads" },
    { category: "Paid Media", item: "Pinterest Ads (Inspiration & Discovery)", costAudInclGst: 500, billing: "Monthly", notes: "~$500/mo; inspiration ads & discovery campaigns" },

    // SEO
    { category: "SEO", item: "Technical SEO & Content Strategy", costAudInclGst: 800, billing: "Monthly", notes: "~$800/mo; topic clusters, on-page optimization" },

    // Lifecycle Marketing
    { category: "Lifecycle", item: "Email & SMS Platform + Campaigns", costAudInclGst: 300, billing: "Monthly", notes: "~$300/mo platform + sends; flows activated" },

    // PR & Partnerships
    { category: "PR & Partnerships", item: "Micro-creator Partnerships & PR", costAudInclGst: 800, billing: "Monthly", notes: "~$800/mo; seeding, home tours, features" },

    // Retail & Events
    { category: "Retail & Events", item: "Pop-up Events & Retail Activation (2x)", costAudInclGst: 8000, billing: "One-off", notes: "Display materials, signage, light activations & events" },

    // Contingency
    { category: "Contingency", item: "Reserve (5% for overruns & experiments)", costAudInclGst: 5500, billing: "One-off", notes: "Buffer for ad hoc opportunities and unexpected costs" }
  ]
};

