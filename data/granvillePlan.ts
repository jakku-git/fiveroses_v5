// data/granvillePlan.ts
// Granville Place — Final 145K Plan (no references to 105k). All hyphens are standard '-'.

export type BudgetItem = {
  category: string;
  inclusions: string;
  annual: number;
  upfront?: boolean;
  key: string;
};

export type KPI = { label: string; target: string };

export type ChannelPhasing = {
  key: string;              // must match a budget item key
  months: number[];         // length 12, sums to that line's annual
};

export const currency = (n: number) =>
  n.toLocaleString("en-AU", { maximumFractionDigits: 0 });

/** Helpers for clean integer monthly allocations that exactly sum to target */
const spreadEven = (total: number) => {
  const base = Math.floor(total / 12);
  const rem = total - base * 12;
  return Array.from({ length: 12 }, (_, i) => base + (i < rem ? 1 : 0));
};

const spreadFrontLoad = (total: number, plan: number[]) => {
  // plan is 12 numbers that sum <= total; remainder evenly to the rest
  const seed = [...plan];
  const seeded = seed.reduce((a, b) => a + b, 0);
  const remainder = total - seeded;
  const even = spreadEven(remainder);
  return seed.map((v, i) => v + even[i]);
};

const spreadBurst = (total: number, bursts: number[]) => {
  // bursts are month indexes with 2x weight, others 1x.
  // 9*1x + 3*2x = 15x for three bursts.
  const x = total / 15;
  const raw = Array.from({ length: 12 }, (_, i) =>
    bursts.includes(i) ? 2 * x : x
  );
  // integer rounding that preserves sum:
  const ints = raw.map(Math.floor);
  let diff = total - ints.reduce((a, b) => a + b, 0);
  // distribute remaining dollars starting with burst months, then the rest
  const order = [
    ...bursts,
    ...Array.from({ length: 12 }, (_, i) => i).filter((i) => !bursts.includes(i)),
  ];
  for (const idx of order) {
    if (diff <= 0) break;
    ints[idx] += 1;
    diff -= 1;
  }
  return ints;
};

/** ---------------------
 *  FINAL 145K BUDGET
 *  ---------------------
 *  Portals heavier, Chinese media reduced, billboard unchanged.
 */
export const budget: BudgetItem[] = [
  { key: "rea",   category: "Realestate.com.au (Standard Annual)", inclusions: "12-month developer listing with highlight boosts", annual: 17500, upfront: true },
  { key: "domain",category: "Domain.com.au (Standard Annual)",     inclusions: "12-month developer listing with feature upgrades", annual: 17500, upfront: true },
  { key: "ooh",   category: "OOH - JCDecaux Granville Station",    inclusions: "12-month static billboard placement incl. installation", annual: 13000, upfront: true },

  { key: "seo",   category: "SEO Retainer",                         inclusions: "Technical, on-page, off-page, monthly reporting", annual: 16500 },
  { key: "sem",   category: "SEM Media + Mgmt",                     inclusions: "Intent search + remarketing; tCPA after ramp", annual: 23000 },
  { key: "meta",  category: "Meta Media + Ops",                     inclusions: "Always-on + 3 bursts; CAPI retargeting", annual: 14500 },
  { key: "prog",  category: "Programmatic Retargeting",             inclusions: "Display complement with frequency control", annual: 3500 },

  { key: "cn",    category: "WeChat / REDBook / SydneyToday",       inclusions: "3 bilingual bursts for supportive reach", annual: 7500 },

  { key: "content",category: "Content & Editorial",                 inclusions: "12 long-form articles (SEO + PR)", annual: 8000 },
  { key: "video", category: "Video & Photography",                  inclusions: "2 shoots: lifestyle + walkthrough", annual: 6000 },

  { key: "cro",   category: "Landing Page & CRO",                   inclusions: "Microsite refresh, A/B tests, UX improvements", annual: 5000 },
  { key: "rep",   category: "Reporting & Analytics",                inclusions: "GA4 + Looker dashboards; monthly reporting", annual: 4000 },
  { key: "ma",    category: "Marketing Automation & EDM",           inclusions: "Platform + 12 sends; bilingual templates", annual: 3000 },
  { key: "cont",  category: "Contingency & Creative Refresh",       inclusions: "Seasonal boosts and ad refreshes", annual: 6000 },
];

// Sanity check total = 145,000
export const totalBudget = budget.reduce((a, b) => a + b.annual, 0); // must equal 145000

/** KPIs — realistic for this mix */
export const kpis: KPI[] = [
  { label: "Brand search volume index", target: "Index 130 (+30%)" },
  { label: "Organic sessions (non-brand)", target: "+60% YoY" },
  { label: "Qualified leads (all channels)", target: "800–950 per year" },
  { label: "Google Ads CPL", target: "≤ A$150" },
  { label: "Meta CTR", target: "≥ 1.2%" },
  { label: "Portal leads (REA + Domain)", target: "35–40% of total enquiries" },
  { label: "Multilingual social reach", target: "~150–200K views" },
];

/** Phasing — SEM/Meta bursts (Mar, Jul, Nov), upfront items in Jan */
const M = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
const bursts = [M.Mar, M.Jul, M.Nov];

export const phasing: ChannelPhasing[] = [
  // Upfront in Jan
  { key: "rea",   months: [17500,0,0,0,0,0,0,0,0,0,0,0] },
  { key: "domain",months: [17500,0,0,0,0,0,0,0,0,0,0,0] },
  { key: "ooh",   months: [13000,0,0,0,0,0,0,0,0,0,0,0] },

  // Even/logic-based spreads
  { key: "seo",   months: spreadEven(16500) },
  { key: "sem",   months: spreadBurst(23000, bursts) },
  { key: "meta",  months: spreadBurst(14500, bursts) },
  { key: "prog",  months: spreadEven(3500) },

  // CN social reduced; 3 equal bursts
  { key: "cn",    months: (() => { const out = Array(12).fill(0); out[M.Mar]=2500; out[M.Jul]=2500; out[M.Nov]=2500; return out; })() },

  { key: "content", months: spreadEven(8000) },

  // Video across Mar/Jul/Nov equally
  { key: "video", months: (() => { const out = Array(12).fill(0); out[M.Mar]=2000; out[M.Jul]=2000; out[M.Nov]=2000; return out; })() },

  // CRO front-loaded, remainder even
  { key: "cro", months: spreadFrontLoad(5000, [1000,600,600,400,0,0,0,0,0,0,0,0]) },
  { key: "rep", months: spreadEven(4000) },
  { key: "ma",  months: spreadEven(3000) },
  { key: "cont",months: spreadEven(6000) },
];

/** Content Calendar, Keywords, Workflow, Landing Requirements */
export const contentCalendar = [
  "Jan: Overview",
  "Feb: Connectivity",
  "Mar: Dining",
  "Apr: Education",
  "May: Parks",
  "Jun: Market update",
  "Jul: Milestone",
  "Aug: Investor",
  "Sep: Floorplans",
  "Oct: Lifestyle",
  "Nov: Incentives",
  "Dec: Wrap-up",
];

export const keywords = [
  "granville apartments for sale",
  "granville place apartments",
  "off-the-plan granville",
  "near granville station apartments",
  "western sydney new builds",
  "parramatta close apartments",
  "shokai granville",
  "best cafes granville",
  "schools near granville place",
  "commute to sydney cbd granville",
];

export const landingRequirements = [
  "Clear value proposition above-the-fold",
  "High-quality imagery and plans gallery",
  "Amenities map and transport highlights",
  "EN/中文 enquiry form (name, phone, email)",
  "Privacy consent and schema markup",
  "Confirmation page with next steps",
];

export const leadWorkflow = [
  "Form submission → CRM entry",
  "Instant auto-reply (SMS/email)",
  "Sales assignment within 5 minutes",
  "Follow-ups Day 1 and Day 3",
  "EDM nurture sequence for non-converters",
];

export const channelStrategy = [
  {
    title: "Property Portals - Realestate.com.au & Domain.com.au",
    content: [
      "Standard annual developer listings with highlight boosts and feature upgrades",
      "Persistent visibility across all property searches in Granville and Western Sydney",
      "Expected to generate 35-40% of total qualified enquiries",
      "Feature placement in 'New Developments' and 'Off-the-Plan' sections"
    ]
  },
  {
    title: "SEO - Technical & Content",
    content: [
      "Technical audit and site optimization in Month 1",
      "On-page optimization for target keywords",
      "Monthly content publishing (12 long-form articles)",
      "Local backlink building program focusing on Sydney property sites"
    ]
  },
  {
    title: "SEM - Google Ads Media + Management",
    content: [
      "Intent search campaigns with exact/phrase match",
      "Shopping ads for floorplan and pricing pages",
      "tCPA bidding after 6-week learning phase",
      "Three burst periods (Mar, Jul, Nov) with 2x media allocation"
    ]
  },
  {
    title: "Meta - Facebook & Instagram Media + Operations",
    content: [
      "Always-on awareness campaigns for brand building",
      "Three burst periods (Mar, Jul, Nov) with 2x media allocation",
      "CAPI retargeting with 1:1 audiences",
      "Collection ads and video-first creative approach"
    ]
  },
  {
    title: "Programmatic Retargeting",
    content: [
      "Display complement with frequency cap at 5 impressions per week",
      "Incremental reach beyond owned channels",
      "GA4 assisted conversions tracking",
      "Video completion goal optimization"
    ]
  },
  {
    title: "WeChat / REDBook / SydneyToday",
    content: [
      "Three supportive bursts (Mar, Jul, Nov) for reputation building",
      "Bilingual content creation and distribution",
      "Feature articles and sponsored posts targeting Chinese-speaking investors",
      "Expected cumulative reach of 150-200K views across all three platforms"
    ]
  },
  {
    title: "Content & Editorial",
    content: [
      "12 long-form articles (EN/中文) covering amenities, schools, lifestyle",
      "SEO-optimized for target keywords",
      "Distribution across portal and social channels",
      "Repost to partner sites for link building"
    ]
  },
  {
    title: "Video & Photography Production",
    content: [
      "Two production cycles in Mar and Jul",
      "Lifestyle shoot + property walkthrough video",
      "Hero cut plus 3 short-form edits for social",
      "Stills library for ads and landing pages"
    ]
  },
  {
    title: "Landing Page & CRO",
    content: [
      "UX refresh with mobile-first design",
      "A/B test headlines, form length, and CTA copy",
      "Schema markup for rich snippets",
      "Bilingual form with auto-translation"
    ]
  },
  {
    title: "Reporting & Analytics",
    content: [
      "GA4 event tracking for all touchpoints",
      "Looker dashboard for client view",
      "Monthly executive summary reports",
      "Real-time KPI dashboards"
    ]
  },
  {
    title: "Marketing Automation & EDM",
    content: [
      "Platform setup (Mailchimp/SendGrid)",
      "12 monthly emails (1 per month) with bilingual templates",
      "Welcome series and nurture flows",
      "Preference center for language selection"
    ]
  }
];

// Guards (optional): ensure all phasing sums match budget
export const validatePhasing = () => {
  const map = new Map(budget.map(b => [b.key, b.annual]));
  for (const p of phasing) {
    const sum = p.months.reduce((a,b)=>a+b,0);
    if (sum !== (map.get(p.key) || 0)) {
      throw new Error(`Phasing mismatch for ${p.key}: ${sum} vs ${map.get(p.key)}`);
    }
  }
};
