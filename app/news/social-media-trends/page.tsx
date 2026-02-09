"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articleSections = [
  {
    title: "The Evolution of Social Media Marketing",
    description: "How social media platforms are transforming digital marketing strategies",
    content: `The social media landscape has undergone a remarkable transformation in recent years, evolving from simple networking platforms into sophisticated marketing ecosystems. As we navigate this dynamic environment, understanding the current state of social media marketing is crucial for businesses looking to maintain a competitive edge.

## The New Social Media Paradigm

Gone are the days when social media marketing meant simply posting updates and hoping for engagement. Today's social media landscape is a complex ecosystem where content, commerce, and community converge. The most successful brands are those that understand this evolution and adapt their strategies accordingly.

Consider the case of a mid-sized fashion brand that recently revamped its social media strategy. By shifting from a purely promotional approach to a community-focused model, they saw a 300% increase in engagement and a 150% boost in direct-to-consumer sales. Their secret? Understanding that modern social media success isn't just about broadcasting messages—it's about building meaningful connections.

## Platform Dynamics and User Behavior

The social media landscape is constantly evolving, with each platform developing its own unique ecosystem. Short-form video content has emerged as a dominant force, with platforms like TikTok and Instagram Reels reshaping how brands connect with audiences. But it's not just about the format—it's about understanding how these platforms influence user behavior and expectations.

Take Instagram's recent evolution, for example. What began as a photo-sharing app has transformed into a comprehensive social commerce platform. Brands that have adapted to this shift—integrating shopping features, leveraging Stories for engagement, and building authentic community connections—are seeing remarkable results.

## Content Strategy in the Modern Age

The most successful social media strategies today are those that balance creativity with data-driven insights. It's no longer enough to create content and hope it resonates. Modern social media marketing requires a sophisticated understanding of audience behavior, platform algorithms, and content performance metrics.

One particularly effective approach is the "content ecosystem" model, where brands create interconnected content pieces that work together across platforms. For instance, a major beauty brand recently implemented this strategy, using Instagram Reels for trend-driven content, Stories for behind-the-scenes engagement, and long-form content on YouTube for deeper storytelling. The result? A 200% increase in cross-platform engagement and a significant boost in brand loyalty.

## Building Meaningful Connections

The true power of social media lies in its ability to foster genuine connections between brands and their audiences. The most successful social media strategies today focus on building communities rather than just growing follower counts.

Consider how leading brands are approaching community building:

They're leveraging user-generated content to create authentic connections, turning customers into brand advocates. This approach not only builds trust but also creates a sustainable content pipeline that resonates with audiences.

They're implementing social listening strategies to understand and respond to audience needs in real-time. This isn't just about monitoring mentions—it's about actively engaging in conversations and using insights to inform strategy.

They're developing influencer partnerships that go beyond simple endorsements, creating long-term relationships that deliver genuine value to both brands and audiences.

## Analytics and Measurement

The evolution of social media analytics has transformed how we measure success. Modern measurement goes beyond vanity metrics like likes and follows, focusing instead on meaningful engagement and business impact.

Leading brands are now using advanced analytics to:

Track the full customer journey across social platforms, understanding how social media contributes to overall business goals.

Measure the impact of social media on brand perception and customer loyalty, using sophisticated sentiment analysis and brand health metrics.

Optimize content strategy in real-time, using data to inform everything from content creation to posting schedules.

The future of social media marketing lies in creating authentic, engaging content while leveraging data-driven insights to build meaningful connections with audiences.`,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2874&auto=format&fit=crop",
    imageAlt: "Social media trends visualization showing platform evolution"
  },
  {
    title: "Emerging Social Media Trends",
    description: "New developments shaping the future of social media marketing",
    content: `As we look toward the future of social media marketing, several transformative trends are emerging that will redefine how brands connect with their audiences. These developments present both exciting opportunities and new challenges for marketers navigating the evolving digital landscape.

## The Rise of Immersive Experiences

The next frontier in social media marketing is the integration of immersive technologies. Augmented reality (AR) and virtual reality (VR) are moving beyond novelty status to become essential tools for brand engagement. Leading platforms are already implementing these technologies in innovative ways.

For instance, a major beauty brand recently launched an AR-powered virtual try-on experience on Instagram, allowing users to test products in real-time. The results were impressive: a 40% increase in product engagement and a 25% boost in conversion rates. This success story highlights how immersive technologies are becoming crucial for creating engaging, interactive brand experiences.

## The Evolution of Social Commerce

Social commerce is undergoing a significant transformation, moving beyond simple "buy now" buttons to create seamless shopping experiences within social platforms. The integration of shopping features across platforms is changing how consumers discover and purchase products.

Consider the success of Instagram's shopping features, which have evolved from basic product tags to comprehensive shopping experiences. Brands that have embraced these features are seeing remarkable results. One fashion retailer reported a 300% increase in social-driven sales after implementing a comprehensive social commerce strategy that included live shopping events, AR try-ons, and seamless checkout experiences.

## The Power of Community-Driven Content

The future of social media marketing lies in community-driven content strategies. Modern audiences crave authentic connections and meaningful interactions, leading to the rise of community-focused features across platforms.

Leading brands are leveraging this trend by:

Creating dedicated community spaces where users can connect, share experiences, and engage with the brand on a deeper level.

Developing user-generated content campaigns that turn customers into brand advocates.

Implementing social listening strategies to understand and respond to community needs in real-time.

## Technology Integration and Innovation

Advanced technologies are reshaping how brands approach social media marketing. Artificial intelligence and machine learning are becoming essential tools for content creation, audience targeting, and performance optimization.

The most forward-thinking brands are using these technologies to:

Develop predictive analytics models that anticipate audience needs and preferences.

Create personalized content experiences at scale.

Optimize content strategy in real-time based on performance data.

## The Future of Social Media Marketing

Looking ahead, several key trends will shape the future of social media marketing:

Privacy-first approaches will become essential as platforms implement stricter data protection measures. Brands will need to find new ways to build meaningful connections while respecting user privacy.

Sustainability and social responsibility will play an increasingly important role in social media strategy. Consumers are demanding more transparency and accountability from brands.

Cross-platform integration will become more sophisticated, allowing brands to create seamless experiences across different social channels.

The future of social media marketing lies in creating authentic, engaging content while leveraging emerging technologies to build meaningful connections with audiences. Success will depend on understanding these trends and adapting strategies accordingly.`,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2874&auto=format&fit=crop",
    imageAlt: "Future of social media marketing visualization"
  }
];

const relatedArticles = [
  {
    title: "The Future of Digital Marketing in 2025",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/future-of-digital-marketing",
    excerpt: "Explore the key trends and technologies that will define digital marketing in the coming years."
  },
  {
    title: "How AI is Transforming Content Creation",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/ai-content-creation",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we create and distribute content."
  },
  {
    title: "The Future of Web Design",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2874&auto=format&fit=crop",
    slug: "/news/web-design-future",
    excerpt: "Learn about the emerging trends and technologies shaping the future of web design."
  }
];

export default function ArticlePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          ref={containerRef}
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm" />
          <Image
            src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2874&auto=format&fit=crop"
            alt="Social Media Trends"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 md:px-8 h-full flex items-end pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl space-y-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium tracking-wider">
                Social Media
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Social Media Trends to Watch in 2023: The Complete Guide
            </h1>

            <p className="text-xl text-neutral-300 font-light">
              Stay ahead of the curve with these emerging social media trends that are reshaping digital marketing. From AI-powered features to the rise of social commerce, discover what's next in the world of social media.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium">editor @ fiveroses</p>
                  <p className="text-xs text-neutral-400">April 22, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <motion.section 
        className="py-16 px-4 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            {articleSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mt-12 mb-6">{section.title}</h2>
                <p className="text-xl text-neutral-300 font-light mb-8">{section.description}</p>
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6">
                  {section.content.split("\n\n").map((paragraph, pIndex) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={pIndex} className="text-2xl font-bold mt-8 mb-4">
                          {paragraph.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h4 key={pIndex} className="text-xl font-bold mt-6 mb-3">
                          {paragraph.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={pIndex} className="list-disc list-inside space-y-2">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i} className="text-neutral-300">
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIndex} className="text-neutral-300 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags and Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-neutral-800"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-rose-400" />
                <h3 className="text-lg font-medium">Tags</h3>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <BookmarkPlus className="w-4 h-4" />
                  Save
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Social Media", "Digital Marketing", "Technology", "Trends", "Innovation", "Strategy"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-900/50 text-neutral-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Related Articles Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-12">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <Link key={index} href={article.slug} className="group">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-light mb-2 group-hover:text-rose-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-2">{article.excerpt}</p>
                <p className="text-sm text-neutral-500">{article.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 