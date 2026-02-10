# FIVEROSES WEBSITE - COMPREHENSIVE DOCUMENTATION

## EXECUTIVE SUMMARY

Fiveroses is a premium creative agency website built with Next.js 15, featuring advanced animations, parallax effects, and a sophisticated black-and-white minimalist aesthetic. The site showcases a portfolio of creative work, news/insights, and comprehensive service offerings across marketing, development, production, and consulting.

---

## WEBSITE STRUCTURE

### **Pages & Routes (30+ pages)**

#### **Main Pages:**
1. **Homepage (`/`)** 
   - Canvas reveal effect hero with "fiveroses" text
   - Parallax gallery with multi-column scrolling
   - Zoom parallax section with image scaling
   - Service cards with scroll-based stacking
   - 3D perspective sections with CTAs
   - Previous works gallery with mouse-driven split effect
   - Partnership logos with hover reveals
   - Mobile: Simplified hero with "Less noise. More impact." tagline

2. **About Page (`/about`)**
   - Background boxes with morphing text (BUILD, CRAFT, CREATE, DESIGN, GROW, SCALE, THINK)
   - About content with bold "fiveroses" branding
   - About accordion (Vision, Approach, What Sets Us Apart)
   - Services accordion with expandable sections

3. **Work Page (`/work`)**
   - Smooth scroll hero with video parallax
   - Shuffle hero with auto-shuffling image grid
   - Featured projects with card reveal effects
   - Service categories with progress indicators
   - Scroll accordion for detailed services
   - Layout grid demo

4. **Contact Page (`/contact`)**
   - 3D globe hero (desktop only, gradient on mobile)
   - Contact information:
     - Phone: 1800 981 170 (Australian business number)
     - Email: hello@fiveroses.com.au
   - Global office locations (accordion format):
     - Sydney, Australia – 383 George Street
     - New York City, USA – 575 Fifth Ave, NY 10017
     - London, UK – 16 Great Chapel Street, W1F 8FL
     - Hong Kong – 8 Queen's Road East
     - Tokyo, Japan – Roppongi Hills Mori Tower
     - Paris, France – 33 Rue La Fayette, 75009
   - Contact form with validation and cooldown
   - Social media links

5. **News Page (`/news`)**
   - Video parallax hero
   - Featured articles section
   - Latest articles grid
   - 14 individual news articles with parallax heroes

#### **Work Detail Pages (17 pages):**
- `/work/marketing` - Marketing services showcase
- `/work/web-solutions` - Web development services
- `/work/creative-production` - Creative production services
- `/work/incubator` - Startup incubator services
- 13 individual project case studies:
  - Zesteo (drink brand)
  - Verdella Farms (sustainable agriculture)
  - Neon Dusk (VR branding)
  - Forge & Hide (leather craft)
  - Solstice Bloom (sustainable fashion)
  - Little Mess Makers (educational brand)
  - Luma Glassworks (visual identity)
  - Terra & Tone (ceramics)
  - Moss & Mineral (brand identity)
  - Nailpop (brand campaign)
  - Aerovant Aviation (aviation brand)
  - Syntech Industries (brand identity)
  - Social Distance (campaign)

#### **Special Project Pages:**
- `/foma` - FOMA project with print-optimized styles
- `/granville-place` - Granville Place project with detailed proposal
- `/projects/rifold` - RIFOLD project showcase

#### **News Articles (14 articles):**
1. Blockchain and Creative Ownership
2. Digital Wellness Psychology
3. Digital Art Renaissance
4. Digital Nomadism Future
5. Quantum Computing and Creative Industries
6. Digital Identity Evolution
7. Future of Digital Marketing (2025)
8. AI Content Creation
9. Web Design Future
10. Video Marketing Future
11. E-commerce Optimization
12. Social Media Trends
13. Sustainable Branding
14. AI Transforming Content Creation

---

## VISUAL AESTHETICS

### **Color Palette:**
- **Primary:** Black (#000000) - Main background
- **Secondary:** White (#FFFFFF) - Text and accents
- **Card Colors:** Beige/cream gradients (#f8f5f2, #f3efe9, #f0ebe4, #ede6de, #eae2d9)
- **Accents:** Subtle white overlays (white/5, white/10, white/20)
- **Gradients:** Radial and linear gradients for depth
- **Transparency:** Layered opacity for glass-morphism effects

### **Typography:**
- **Primary Font:** Inter (200, 400, 500, 700 weights)
  - Used for body text, navigation, UI elements
  - Clean, modern, highly legible
  
- **Display Font:** Cormorant Garamond (400, 500, 600 weights)
  - Used for large headings, hero text
  - Elegant, sophisticated serif
  
- **Secondary Font:** Crimson Text (400, 600 weights)
  - Used for drop caps, special emphasis
  - Classic serif with character

### **Typography Scale:**
- **Mobile:** Base sizes (text-sm, text-base, text-lg)
- **Tablet:** Medium sizes (text-xl, text-2xl, text-3xl)
- **Desktop:** Large sizes (text-4xl, text-5xl, text-6xl, text-7xl)
- **Responsive:** Uses clamp() for fluid scaling

### **Design Style:**
- **Minimalist:** Clean layouts, ample whitespace, focused content
- **Modern:** Contemporary design patterns, smooth animations
- **Elegant:** Refined typography, subtle effects, sophisticated color use
- **Bold:** Large typography, high contrast, strong visual hierarchy
- **Immersive:** Full-screen sections, video backgrounds, 3D effects
- **Premium:** High-quality imagery, attention to detail, polished interactions

---

## ANIMATIONS & EFFECTS

### **Animation Libraries:**
1. **Framer Motion** (v12.5.0) - Primary animation library
   - Scroll-based animations with `useScroll`, `useTransform`
   - Gesture handling with `whileHover`, `whileTap`
   - Layout animations with `AnimatePresence`
   - Spring physics for natural motion
   - Viewport-based triggers with `whileInView`

2. **Lenis** (v1.2.3) - Smooth scrolling
   - Custom easing: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
   - Duration: 1.2s, lerp: 0.1
   - Touch multiplier: 2
   - Desktop only (disabled on mobile for performance)

3. **GSAP** (v3.13.0) - Advanced animations
   - ScrollTrigger for scroll-based animations
   - Timeline animations
   - Complex animation sequences

4. **Three.js** (v0.174.0) - 3D graphics
   - 3D globe on contact page
   - WebGL shader effects
   - Interactive 3D elements

### **Signature Animation Effects:**

#### **1. Canvas Reveal Effect**
- **Location:** Homepage hero
- **Description:** Text reveals with video backgrounds in canvas
- **Videos:** 3 WebM videos (deepmind1, deepmind2, deepmind3)
- **Effect:** Morphing canvas with text overlay
- **Desktop only**

#### **2. Parallax Gallery**
- **Location:** Homepage
- **Description:** Multi-column gallery with parallax scrolling
- **Columns:** 4 columns with different scroll speeds
- **Images:** 4 gallery projects with descriptions
- **Desktop only**

#### **3. Zoom Parallax**
- **Location:** Homepage
- **Description:** Images scale and zoom on scroll
- **Effect:** Multiple images with different zoom rates
- **Desktop only**

#### **4. Perspective Sections**
- **Location:** Homepage
- **Description:** Sticky sections with 3D perspective transforms
- **Effect:** Scale and rotate on scroll
- **Images:** 2 sections with CTAs
- **Mobile:** Static images with gradient overlays

#### **5. Double Image Effect**
- **Location:** Homepage "Previous Works"
- **Description:** Mouse-driven image split effect
- **Effect:** Image reveals on mouse position
- **Desktop only, mobile shows card grid**

#### **6. Shuffle Hero**
- **Location:** Work page
- **Description:** Auto-shuffling image grid
- **Effect:** Images shuffle positions with smooth transitions
- **Desktop only**

#### **7. Smooth Scroll Hero**
- **Location:** Work page
- **Description:** Video reveal with clip-path on scroll
- **Effect:** Circular reveal expanding on scroll
- **Desktop only**

#### **8. Background Boxes**
- **Location:** About page hero
- **Description:** Animated flower grid with sparkles
- **Effect:** Morphing text (BUILD, CRAFT, etc.) with particle effects
- **Text:** Rotates through 7 words with blur morphing

#### **9. Card Scroll Effect**
- **Location:** Homepage service cards
- **Description:** Cards stack and scale on scroll
- **Effect:** Progressive stacking with scale transforms
- **Cards:** 5 service cards with images and descriptions

#### **10. Project Hover Effect**
- **Location:** Homepage partnerships
- **Description:** Image reveals on hover/touch
- **Effect:** Width animation from 0 to 12vw
- **Projects:** 5 partnership logos

---

## COMPONENTS LIBRARY (50+ components)

### **Animation Components:**
- `CanvasRevealEffect` - Canvas-based text reveal
- `CardRevealEffect` - Card reveal on hover
- `TextGenerateEffect` - Typewriter text
- `MorphingText` - Text morphing animation
- `FlipWords` - Word rotation
- `VelocityText` - Velocity-based text skew
- `HeroHighlight` - Text highlight effects
- `AnimatedSection` - Scroll-triggered sections
- `AnimatedImage` - Image reveal animations

### **Parallax Components:**
- `ParallaxGallery` - Multi-column parallax
- `ZoomParallax` - Zoom-based parallax
- `BackgroundParallax` - Background parallax
- `HeroParallax` - Hero parallax sections
- `ParallaxScroll` - Parallax scrolling
- `SmoothScrollHero` - Smooth scroll video hero

### **3D & Effects:**
- `GlobeScene` - 3D globe visualization
- `BackgroundBoxes` - Animated box grid
- `AuroraBackground` - Aurora gradient
- `Vortex` - Particle vortex
- `SparklesCore` - Sparkle particles
- `LampEffect` - Spotlight effect
- `FuzzyOverlay` - Blur overlay

### **Cards & Grids:**
- `Card` - Scroll-based card
- `BentoGrid` - Bento grid layout
- `FocusCards` - Blur/focus cards
- `AppleCardsCarousel` - Apple-style carousel
- `LayoutGrid` - Animated layout grid
- `CaseStudyCard` - Case study card

### **Accordions:**
- `AboutAccordion` - About page sections
- `ServicesAccordion` - Services listing
- `FaqAccordion` - FAQ sections
- `ScrollAccordion` - Scroll-triggered accordion
- `ChannelAccordion` - Granville channel accordion

### **Navigation:**
- `Header` - Fixed desktop navbar with bubble text
- `MobileNav` - Slide-in mobile menu
- `Footer` - Footer with links and social
- `Breadcrumb` - Breadcrumb navigation

### **Forms:**
- `ContactForm` - Main contact form
- `Input` - Styled input fields
- `Textarea` - Styled textarea
- `Button` - Button component with variants
- `Checkbox` - Checkbox input
- `Select` - Select dropdown

---

## SERVICES OFFERED

### **1. Strategy & Consulting**
- Marketing strategy
- Brand strategy
- Content strategy
- Business consultation
- Digital strategy
- Campaign strategy
- Data strategy

### **2. Creative & Design**
- Creative direction
- Video production
- Visual design
- Branding
- UX/UI design
- Motion design & 3D
- Graphic design
- Illustration & iconography

### **3. Media Planning & Buying**
- Campaign management
- Traditional media
- Digital media
- Email marketing & automation
- Search engine optimization
- Media tracking & reporting

### **4. Technology & Code**
- Web development
- App development
- System integration
- Cloud solutions
- API development
- Technical consulting
- E-commerce solutions
- CMS integration
- Mobile responsive design
- Website maintenance & hosting

### **5. Content & Social**
- Content creation
- Social media management
- Copywriting
- Community management
- Influencer partnerships
- Social analytics

### **6. Incubator Services**
- Mentorship & coaching
- Office space & co-working
- Networking & workshops
- Funding access & investor pitching
- Legal, accounting & marketing support
- Technical support
- Accelerator programs

---

## TECHNICAL ARCHITECTURE

### **Framework & Core:**
- **Next.js 15.3.2** with App Router
- **React 18.2.0** with Server Components
- **TypeScript 5** for type safety
- **Tailwind CSS 3.4.17** for styling

### **Performance Optimizations:**
- Dynamic imports with `next/dynamic`
- Image optimization with Next.js Image
- Video optimization (WebM, preload metadata)
- Code splitting by route
- Lazy loading for heavy components
- Memoization with React.memo
- Conditional rendering (mobile vs desktop)
- Lenis disabled on mobile
- WebGL/Canvas effects disabled on mobile

### **Responsive Strategy:**
- **Mobile-first design** with progressive enhancement
- **Breakpoints:** 768px (tablet), 1024px (desktop)
- **Conditional rendering:** Different components for mobile/desktop
- **Touch optimization:** 44px minimum touch targets, `touch-manipulation`
- **Performance:** Heavy animations disabled on mobile

### **Animation Architecture:**
- **Scroll-based:** useScroll + useTransform from Framer Motion
- **Intersection Observer:** whileInView for viewport triggers
- **Spring physics:** Natural motion with configurable stiffness/damping
- **Performance:** will-change, transform-gpu, RAF optimization
- **Mobile:** Simplified or disabled animations for performance

---

## DESIGN SYSTEM

### **Color System:**
```css
--background: hsl(0, 0%, 0%)        /* Black */
--foreground: hsl(0, 0%, 100%)      /* White */
--card: hsl(0, 0%, 100%)            /* White cards */
--card-foreground: hsl(0, 0%, 0%)   /* Black text on cards */
--muted: hsl(0, 0%, 96.1%)          /* Light gray */
--accent: hsl(0, 0%, 96.1%)         /* Light accent */
```

### **Typography Scale:**
```css
/* Mobile */
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)

/* Desktop */
text-3xl: 1.875rem (30px)
text-4xl: 2.25rem (36px)
text-5xl: 3rem (48px)
text-6xl: 3.75rem (60px)
text-7xl: 4.5rem (72px)
```

### **Spacing System:**
```css
/* Mobile-first pattern */
py-12 md:py-24    /* Vertical padding */
px-4 md:px-8      /* Horizontal padding */
gap-6 md:gap-12   /* Grid/flex gaps */
space-y-4 md:space-y-6  /* Vertical spacing */
```

### **Component Variants:**
- **Buttons:** default, destructive, outline, secondary, ghost, link
- **Sizes:** default (h-11), sm (h-11), lg (h-12), icon (h-11 w-11)
- **All buttons:** 44px minimum touch targets, touch-manipulation

---

## KEY FEATURES & FUNCTIONALITIES

### **1. Advanced Parallax System**
- Multi-layer parallax with different scroll speeds
- Video backgrounds with parallax movement
- Image zoom on scroll
- 3D perspective transforms
- Smooth scroll integration with Lenis

### **2. Interactive Elements**
- Hover reveals on project cards
- Mouse-driven image split effects
- Touch-optimized for mobile (tap, swipe)
- Scroll-based card stacking
- Auto-shuffling image grids

### **3. Form System**
- Contact form with validation
- 30-second cooldown between submissions
- Success/error states with animations
- Email integration via Resend API
- Fields: First Name, Last Name, Job Title, Company, Email, Location, Market, Message

### **4. Navigation System**
- **Desktop:** Fixed centered pill-shaped navbar with animated bubble text
- **Mobile:** Slide-in panel from right with backdrop
- **Smooth transitions** between pages
- **Social links** in mobile menu

### **5. Content Management**
- Static content in TypeScript files
- News articles with metadata (author, date, category, tags)
- Project data with images and descriptions
- Service listings with hierarchical structure

### **6. Password Protection**
- Middleware-based protection for `/work` routes
- Session-based authentication
- Secure password handling

---

## ANIMATION DETAILS

### **Scroll-Based Animations:**
```typescript
// Hero fade and scale
heroOpacity = useTransform(progress, [0, 0.3], [1, 0])
heroScale = useTransform(progress, [0, 0.3], [1, 1.2])
heroY = useTransform(progress, [0, 0.3], [0, -100])

// Section reveals
opacity = useTransform(progress, [0.2, 0.4], [0, 1])
y = useTransform(progress, [0.2, 0.4], [100, 0])
scale = useTransform(progress, [0.2, 0.4], [0.8, 1])
```

### **Hover Animations:**
```typescript
// Card hover
whileHover={{ scale: 1.05, y: -10 }}
whileTap={{ scale: 0.95 }}

// Button hover
hover:bg-white/90 active:bg-white/80
```

### **Viewport Animations:**
```typescript
// Fade in on scroll into view
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
```

---

## CONTENT & MESSAGING

### **Brand Messaging:**
- **Tagline:** "Less noise. More impact."
- **Mission:** "Turn ideas & imagination into execution"
- **Tagline 2:** "We bring your ideas into reality. Petal by petal. Pixel by pixel."
- **Positioning:** Creative studio that blends strategy, design, and technology

### **About Content:**
**Vision:**
"We see a future where creativity and technology are no longer separate disciplines, but equal partners in the pursuit of great storytelling."

**Approach:**
"We treat every project like a collaboration—not a transaction. It starts with listening."

**What Sets Us Apart:**
- **Innovation:** Experiment with emerging technologies
- **Pixel Perfect:** Obsess over details
- **Collaboration:** Genuine partnership and transparency

### **Service Philosophy:**
"Our curated suite of services deliver integrated end-to-end strategies that unite creative, media, technology, content, and insights."

---

## MOBILE OPTIMIZATION

### **Mobile-Specific Features:**
- **Simplified hero** on homepage (no canvas effect)
- **Disabled heavy components:** ParallaxGallery, ZoomParallax, Globe, WebGL effects
- **Touch optimization:** 44px minimum touch targets, touch-manipulation CSS
- **Active states:** Visual feedback on tap
- **Reduced animations:** Faster, simpler animations
- **Responsive typography:** Smaller base sizes
- **Optimized spacing:** Reduced padding and gaps
- **Video optimization:** preload="metadata"
- **Conditional rendering:** Mobile-specific layouts

### **Mobile Navigation:**
- **Top bar:** Fixed header with logo and hamburger menu
- **Slide-in menu:** 85% width panel from right
- **Backdrop:** Semi-transparent overlay
- **Body scroll lock:** Prevents background scrolling
- **Social links:** Included in mobile menu

### **Mobile Performance:**
- Heavy components conditionally rendered
- Scroll animations simplified or disabled
- Lenis smooth scroll disabled
- Videos use metadata preload
- Images with responsive sizes attributes

---

## TECHNICAL SPECIFICATIONS

### **Dependencies (Key):**
```json
{
  "next": "15.3.2",
  "react": "18.2.0",
  "framer-motion": "12.5.0",
  "tailwindcss": "3.4.17",
  "@studio-freight/lenis": "1.2.3",
  "gsap": "3.13.0",
  "three": "0.174.0",
  "@react-three/fiber": "9.0.0",
  "react-hook-form": "7.54.1",
  "zod": "3.24.1",
  "resend": "4.5.1"
}
```

### **File Structure:**
```
app/
├── page.tsx (Homepage)
├── layout.tsx (Root layout)
├── ClientLayout.tsx (Client-side layout)
├── about/page.tsx
├── contact/page.tsx
├── news/page.tsx
├── work/page.tsx
├── components/ (App-specific components)
├── data/ (Static data files)
└── [various route folders]

components/
├── ui/ (Reusable UI components)
├── granville/ (Granville project components)
└── [utility components]

middleware.ts (Password protection)
```

### **API Routes:**
- `/api/contact` - Contact form submission (Resend email service)

### **Middleware:**
- Password protection for `/work` routes
- Session-based authentication
- Cookie management

---

## UNIQUE SELLING POINTS

### **1. Premium Visual Experience**
- High-end animations and effects
- Video-first design approach
- Sophisticated parallax system
- 3D elements and WebGL effects

### **2. Performance-Focused**
- Conditional rendering for mobile
- Code splitting and lazy loading
- Optimized images and videos
- Efficient animation architecture

### **3. Responsive Excellence**
- Mobile-first approach
- Touch-optimized interactions
- Accessibility standards (WCAG 2.1 AA)
- Cross-device consistency

### **4. Technical Sophistication**
- Advanced animation techniques
- Custom scroll effects
- 3D graphics integration
- Modern React patterns

### **5. Content Depth**
- 17 detailed case studies
- 14 thought leadership articles
- Comprehensive service offerings
- Global presence (6 offices)

---

## USER EXPERIENCE FLOW

### **Desktop Journey:**
1. **Land on homepage** → Immersive canvas reveal hero
2. **Scroll down** → Experience parallax gallery, zoom effects
3. **View service cards** → Cards stack and scale on scroll
4. **Explore sections** → 3D perspective sections with CTAs
5. **See previous works** → Mouse-driven image split effect
6. **View partnerships** → Hover to reveal project images
7. **Navigate** → Fixed navbar with bubble text animation
8. **Explore work** → Shuffle hero, smooth scroll effects
9. **Read articles** → Parallax hero, smooth reading experience
10. **Contact** → 3D globe, comprehensive form

### **Mobile Journey:**
1. **Land on homepage** → Clean hero with "Less noise. More impact."
2. **Tap "Let's Talk"** → Navigate to contact page
3. **Scroll down** → Card-based layouts, simplified sections
4. **View gallery** → Vertical card grid with fade-in animations
5. **Tap menu** → Slide-in navigation panel
6. **Explore pages** → Touch-optimized, fast-loading content
7. **Read articles** → Optimized typography, no scroll delays
8. **Contact** → Touch-friendly form, office accordion

---

## BRAND PERSONALITY

### **Visual Personality:**
- **Sophisticated:** Black & white, refined typography
- **Modern:** Contemporary design, cutting-edge tech
- **Bold:** Large typography, strong contrast
- **Minimalist:** Clean layouts, focused content
- **Premium:** High-quality imagery, polished details

### **Voice & Tone:**
- **Confident:** "Less noise. More impact."
- **Collaborative:** "We treat every project like a collaboration—not a transaction"
- **Creative:** "We exist to craft meaningful experiences"
- **Professional:** Business-focused, results-oriented
- **Human:** "We build for humans, not just users"

### **Key Messages:**
- Creativity + Technology = Great storytelling
- Details matter (pixel-perfect execution)
- Collaboration over transaction
- Innovation and experimentation
- Emotion-driven design

---

## CONTACT INFORMATION

**Phone:** 1800 981 170 (Australian business number)
**Email:** hello@fiveroses.com.au

**Global Offices:**
1. **Sydney, Australia** – 383 George Street, Sydney
2. **New York City, USA** – 575 Fifth Ave, New York, NY 10017
3. **London, United Kingdom** – 16 Great Chapel Street, London W1F 8FL
4. **Hong Kong** – 8 Queen's Road East, Hong Kong
5. **Tokyo, Japan** – Roppongi Hills Mori Tower, 6-10-1 Roppongi, Tokyo
6. **Paris, France** – 33 Rue La Fayette, 75009 Paris

**Social Media:**
- Instagram
- Twitter
- LinkedIn
- YouTube

---

## SUMMARY

Fiveroses is a **premium creative agency website** that pushes the boundaries of web design with:

✅ **30+ pages** of content
✅ **50+ custom components** and animations
✅ **Advanced parallax** and scroll effects
✅ **3D graphics** and WebGL integration
✅ **Video-first** design approach
✅ **Mobile-optimized** with conditional rendering
✅ **Touch-friendly** interactions (44px targets)
✅ **Sophisticated typography** with multiple font families
✅ **Black & white aesthetic** with subtle gradients
✅ **Performance-focused** architecture
✅ **Accessibility compliant** (WCAG 2.1 AA)
✅ **Global presence** with 6 international offices
✅ **Comprehensive services** across 6 disciplines
✅ **Thought leadership** with 14 articles
✅ **Portfolio showcase** with 17 case studies

The website represents the **intersection of art and technology**, delivering an **award-worthy user experience** that's both visually stunning and technically sophisticated.

---

## COPY THIS FOR CHATGPT:

```
I need you to understand the fiveroses website. Here's a comprehensive overview:

WEBSITE: Fiveroses Creative Agency
URL: fiveroses.com.au
TAGLINE: "Less noise. More impact."

TECHNICAL STACK:
- Next.js 15.3.2 with App Router
- React 18.2.0 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lenis for smooth scrolling
- Three.js for 3D graphics
- GSAP for advanced animations

VISUAL AESTHETIC:
- Black and white minimalist design
- Premium, sophisticated, modern
- Large typography with Inter, Cormorant Garamond, Crimson Text
- Video backgrounds and high-quality imagery
- Subtle gradients and glass-morphism effects

PAGES (30+):
- Homepage: Canvas reveal hero, parallax gallery, zoom parallax, service cards, 3D perspective sections
- About: Morphing text (BUILD/CRAFT/CREATE), background boxes animation, accordion sections
- Work: Portfolio with 17 case studies, shuffle hero, smooth scroll effects
- Contact: 3D globe, contact form, office locations accordion
- News: 14 thought leadership articles with parallax heroes

ANIMATIONS & EFFECTS:
- Canvas reveal effect with video backgrounds
- Multi-layer parallax scrolling
- Zoom parallax with scale transforms
- 3D perspective sections
- Mouse-driven image split effects
- Auto-shuffling image grids
- Morphing text animations
- Card stacking on scroll
- Smooth scroll with Lenis
- WebGL shader effects
- Particle systems (sparkles, vortex)
- Background box animations

SERVICES:
1. Strategy & Consulting (marketing, brand, content, digital)
2. Creative & Design (video, branding, UX/UI, motion)
3. Media Planning & Buying (campaign management, digital/traditional media)
4. Technology & Code (web/app development, cloud, APIs)
5. Content & Social (content creation, social media, copywriting)
6. Incubator (mentorship, office space, funding access)

CONTACT INFO:
- Phone: 1800 981 170
- Email: hello@fiveroses.com.au
- Offices: Sydney, NYC, London, Hong Kong, Tokyo, Paris

MOBILE OPTIMIZATION:
- Mobile-first responsive design
- Conditional rendering (heavy effects disabled on mobile)
- Touch-optimized (44px targets, active states)
- Simplified animations for performance
- Separate mobile navigation (slide-in panel)

BRAND PERSONALITY:
- Sophisticated and confident
- Creative and innovative
- Collaborative and human-centered
- Detail-oriented (pixel-perfect)
- Bold and minimalist

KEY DIFFERENTIATORS:
- Advanced animation architecture (50+ custom components)
- Video-first design approach
- 3D graphics integration
- Performance-optimized despite heavy animations
- Award-worthy UX design
- Global presence with 6 offices
- Comprehensive service offerings

The website represents a premium creative agency that blends art and technology to create meaningful, unforgettable experiences.
```

---

*End of Documentation*
