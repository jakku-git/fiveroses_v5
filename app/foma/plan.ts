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
  brand: "MOFA";
  currency: "AUD";
  gstRate: number; // 0.10
  items: BudgetItem[];
}

export const planData: PlanData = {
  brand: "MOFA",
  currency: "AUD",
  gstRate: 0.10, // 10% Australian GST
  items: [
    // 1. Discovery & UX Planning – $1,100 (inc GST)
    { 
      category: "1. Discovery & UX Planning", 
      item: "Discovery & UX Planning", 
      costAudInclGst: 1100, 
      billing: "Upfront", 
      notes: "Brand alignment session, target customer profile, site architecture & wireframes, user journey mapping for 1-product funnel. Deliverables: UX plan + wireframes for all key pages",
      fixed: true 
    },

    // 2. UI/Visual Design – $2,750 (inc GST)
    { 
      category: "2. UI/Visual Design", 
      item: "UI/Visual Design", 
      costAudInclGst: 2750, 
      billing: "Upfront", 
      notes: "Premium, minimal, modern aesthetic. Custom layouts for all core screens (desktop + mobile responsive). 2x refinement rounds. Key screens: Home (hero showcase), Product page, Features/specifications, About/brand story, Reviews/testimonials, Checkout/cart, Contact. Design Output: High-fidelity Figma file, full component system, typography & spacing rules",
      fixed: true 
    },

    // 3. Front-End Development – $3,520 (inc GST)
    { 
      category: "3. Front-End Development", 
      item: "Front-End Development", 
      costAudInclGst: 3520, 
      billing: "Upfront", 
      notes: "Custom build from scratch (no template/theme). Modern stack: Next.js / React / Tailwind (or Shopify theme dev). Fully responsive. Accessibility best practices. Includes: Hero animations, Image sliders/carousels, Responsive components, Lazy loading",
      fixed: true 
    },

    // 4. Basic Animations & Interactive Effects – $990 (inc GST)
    { 
      category: "4. Basic Animations & Interactive Effects", 
      item: "Basic Animations & Interactive Effects", 
      costAudInclGst: 990, 
      billing: "Upfront", 
      notes: "Smooth scroll + reveal, hover effects, subtle parallax, motion-based transitions. Goal: Premium, elevated brand experience",
      fixed: true 
    },

    // 5. Ecommerce Implementation – $770 (inc GST)
    { 
      category: "5. Ecommerce Implementation", 
      item: "Ecommerce Implementation", 
      costAudInclGst: 770, 
      billing: "Upfront", 
      notes: "Single product checkout flow, variant options, payment gateway, shipping settings, tax settings. Platform options: Shopify (recommended), WooCommerce, Custom checkout if required",
      fixed: true 
    },

    // 6. SEO Foundation & Performance – $440 (inc GST)
    { 
      category: "6. SEO Foundation & Performance", 
      item: "SEO Foundation & Performance", 
      costAudInclGst: 440, 
      billing: "Upfront", 
      notes: "Semantic markup, meta tags, titles, OG tags, sitemap + robots, speed optimisation. (Basic technical SEO, not ongoing SEO)",
      fixed: true 
    },

    // 7. Testing, QA & Deployment – $330 (inc GST)
    { 
      category: "7. Testing, QA & Deployment", 
      item: "Testing, QA & Deployment", 
      costAudInclGst: 330, 
      billing: "Upfront", 
      notes: "Cross-browser + device testing, performance testing, bug fixes, launch setup",
      fixed: true 
    }
  ]
};

