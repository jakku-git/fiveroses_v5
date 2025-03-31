"use client";

import { motion } from "framer-motion";
import { FocusCards } from "./focus-cards";
import { LayoutGrid } from "./layout-grid";
import { Card } from "./card";
import { CardRevealEffect } from "./card-reveal-effect";

interface Service {
  title: string;
  slug: string;
}

export const ArchivedSections = () => {
  const focusCardsData = [
    {
      title: "Marketing Strategy",
      src: "https://videos.pexels.com/video-files/4630097/4630097-uhd_2560_1440_25fps.mp4",
    },
    {
      title: "Web Development",
      src: "https://videos.pexels.com/video-files/5483085/5483085-uhd_2732_1440_25fps.mp4",
    },
    {
      title: "Creative Production",
      src: "https://videos.pexels.com/video-files/9810701/9810701-uhd_2732_1440_25fps.mp4",
    },
    {
      title: "Brand Identity",
      src: "https://videos.pexels.com/video-files/5310858/5310858-uhd_2560_1440_25fps.mp4",
    },
    {
      title: "Content Strategy",
      src: "https://videos.pexels.com/video-files/4994039/4994039-uhd_2560_1440_25fps.mp4",
    },
    {
      title: "Social Media Management",
      src: "https://videos.pexels.com/video-files/7793361/7793361-uhd_2732_1440_25fps.mp4",
    },
  ];

  const layoutGridData = [
    {
      id: 1,
      content: <p className="text-white text-lg font-light">Media Buying Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-evonics-1058276.jpg",
    },
    {
      id: 2,
      content: <p className="text-white text-lg font-light">Metro Banners</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      id: 3,
      content: <p className="text-white text-lg font-light">AIS Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-freestockpro-1031700.jpg",
    },
    {
      id: 4,
      content: <p className="text-white text-lg font-light">Use Your Voice Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-polina-kovaleva-6185245.jpg",
    },
    {
      id: 5,
      content: <p className="text-white text-lg font-light">DKNY Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-garrison-gao-56316964-31165586.jpg",
    },
    {
      id: 6,
      content: <p className="text-white text-lg font-light">Flipkart Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-twotriangles-14647786.jpg",
    },
  ];

  return (
    <>
      {/* Layout Grid Section (Our Work) */}
      <section className="w-full py-20 bg-white text-black">
        <div className="w-full px-4 md:px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.h2>
          <LayoutGrid cards={layoutGridData} />
        </div>
      </section>

      {/* Grow Your Brand Section */}
      <section className="w-full py-20 bg-black text-white">
        <div className="w-full px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left">
            Grow Your Brand
          </h2>
          <FocusCards cards={focusCardsData} />
        </div>
      </section>

      {/* Archived Our Services Section */}
      <OurServicesHorizontal />
    </>
  );
};

// Archived Our Services Section
const OurServicesHorizontal = () => {
  const revealColors = [
    [236, 72, 153],
    [232, 121, 249],
  ];
  const services: Service[] = [
    { title: "Marketing & Strategy", slug: "marketing" },
    { title: "Development & Solutions", slug: "web-solutions" },
    { title: "Creation & Production", slug: "creative-production" },
    { title: "Incubator & Consulting", slug: "incubator" },
  ];
  const serviceDetails: { [key: string]: string[] } = {
    "Marketing & Strategy": [
      "Marketing & Digital Strategy",
      "Brand & Campaign Strategy",
      "Content & Data Strategy",
      "Customer Experience Strategy",
      "Social Media & SEO/SEM Strategy",
      "Email & Partnership Strategy",
    ],
    "Development & Solutions": [
      "Website Design & UI/UX",
      "Web Development & Custom Applications",
      "E-Commerce & CMS Integration",
      "Mobile Responsive & SEO-Friendly Design",
      "Website Maintenance, Hosting & Security",
      "Conversion Optimization & Analytics",
    ],
    "Creation & Production": [
      "Graphic & Branding Design",
      "Video Production & Animation",
      "Content Creation & Copywriting",
      "Photography, Illustration & Iconography",
      "Interactive & Multimedia Design",
      "Audio Production",
    ],
    "Incubator & Consulting": [
      "Mentorship & Business Coaching",
      "Office Space & Co-working",
      "Networking & Workshops",
      "Funding Access & Investor Pitching",
      "Legal, Accounting & Marketing Support",
      "Technical Support & Accelerator Programs",
    ],
  };

  return (
    <section className="w-full py-20 relative bg-black text-white">
      <div className="w-full px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left">
          Our Services
        </h2>
        <div className="flex gap-2">
          {services.map((service, i) => (
            <Card key={i} title={service.title} link={`/work/${service.slug}`}>
              <div className="absolute inset-0">
                <CardRevealEffect
                  animationSpeed={4.0}
                  containerClassName="bg-black"
                  colors={revealColors}
                  dotSize={3}
                  showGradient={false}
                  loop={true}
                  loopDelay={2000}
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-full flex justify-center">
                    <ul className="space-y-3 text-base font-medium text-white/90 leading-relaxed text-left w-[70%] pl-12">
                      {serviceDetails[service.title].map((item, index) => (
                        <li key={index} className="transition-all duration-300 hover:text-white flex items-center gap-2 overflow-hidden">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70 flex-shrink-0">
                            <path
                              d="M4 4C4 4 13.5 6.5 14 8C14.5 9.5 4 13 4 13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 