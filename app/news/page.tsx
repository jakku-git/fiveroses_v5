import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NewsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">News & Insights</h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto">
              Stay updated with the latest news, insights, and case studies from fiveroses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-rose-200/50 transition-colors">
                <div className="aspect-[21/9] w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=1200"
                    alt="Featured Article"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="mb-4">
                    <span className="inline-block bg-rose-200 text-black px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 group-hover:text-rose-200 transition-colors">
                    The Future of Digital Marketing in 2025
                  </h2>
                  <p className="text-white/80 mb-4 max-w-3xl">
                    Explore the emerging trends and technologies that will shape the future of digital marketing in the
                    coming years.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src="/placeholder.svg?height=100&width=100"
                          alt="Author"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Sarah Johnson</span>
                    </div>
                    <span className="text-sm text-white/60">June 15, 2023</span>
                  </div>
                </div>
                <Link href="/news/future-of-digital-marketing" className="absolute inset-0">
                  <span className="sr-only">Read more</span>
                </Link>
              </div>
            </div>

            {latestArticles.slice(0, 2).map((article, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-rose-200/50 transition-colors"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-neutral-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-rose-200 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-white/80 mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={article.authorImage || "/placeholder.svg"}
                          alt={article.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{article.author}</span>
                    </div>
                    <span className="text-sm text-white/60">{article.date}</span>
                  </div>
                </div>
                <Link href={article.slug} className="absolute inset-0">
                  <span className="sr-only">Read more</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">All Articles</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 transition-colors">
                Latest
              </button>
              <button className="px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 transition-colors">
                Popular
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allArticles.map((article, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-rose-200/50 transition-colors"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-neutral-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-200 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-neutral-300 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img
                          src={article.authorImage || "/placeholder.svg"}
                          alt={article.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{article.author}</span>
                    </div>
                    <span className="text-sm text-white/60">{article.date}</span>
                  </div>
                  <Link href={article.slug} className="absolute inset-0">
                    <span className="sr-only">Read more</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-rose-200 transition-all duration-300">
              Load more articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-neutral-300 mb-8">
            Stay updated with the latest news, insights, and case studies from fiveroses.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:border-rose-200"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black rounded-md hover:bg-rose-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

const latestArticles = [
  {
    title: "How AI is Transforming Content Creation",
    excerpt: "Discover how artificial intelligence is revolutionizing the way brands create and distribute content.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "May 28, 2023",
    slug: "/news/ai-transforming-content-creation",
  },
  {
    title: "Building a Sustainable Brand in 2023",
    excerpt: "Learn how to build a sustainable brand that resonates with environmentally conscious consumers.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Branding",
    author: "Jessica Williams",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "May 15, 2023",
    slug: "/news/sustainable-brand-2023",
  },
]

const allArticles = [
  {
    title: "The Power of Video Marketing",
    excerpt: "Why video content should be at the center of your marketing strategy in 2023.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Marketing",
    author: "David Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 30, 2023",
    slug: "/news/power-of-video-marketing",
  },
  {
    title: "Social Media Trends to Watch",
    excerpt: "Stay ahead of the curve with these emerging social media trends for marketers.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Social Media",
    author: "Emily Patel",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 22, 2023",
    slug: "/news/social-media-trends",
  },
  {
    title: "E-commerce Optimization Strategies",
    excerpt: "Proven strategies to optimize your e-commerce store for higher conversions.",
    image: "/placeholder.svg?height=400&width=600",
    category: "E-commerce",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 15, 2023",
    slug: "/news/ecommerce-optimization",
  },
  {
    title: "The Art of Brand Storytelling",
    excerpt: "How to craft compelling brand stories that connect with your audience.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Branding",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 8, 2023",
    slug: "/news/brand-storytelling",
  },
  {
    title: "SEO Best Practices for 2023",
    excerpt: "The latest SEO strategies to improve your website's visibility in search results.",
    image: "/placeholder.svg?height=400&width=600",
    category: "SEO",
    author: "Jessica Williams",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "March 30, 2023",
    slug: "/news/seo-best-practices",
  },
  {
    title: "Measuring Marketing ROI",
    excerpt: "How to effectively measure and optimize your marketing return on investment.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Analytics",
    author: "David Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "March 22, 2023",
    slug: "/news/measuring-marketing-roi",
  },
]

