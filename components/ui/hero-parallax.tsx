"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Product {
  title: string
  link: string
  thumbnail: string
}

export const HeroParallax = ({
  products,
}: {
  products: Product[]
}) => {
  const firstRow = products.slice(0, 3)
  const secondRow = products.slice(3, 6)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const yFirstRow = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 100 : 250])
  const ySecondRow = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 150])
  const yText = useTransform(scrollYProgress, [0, 0.8], ["0%", "-100%"])
  const xText = useTransform(scrollYProgress, [0, 0.8], ["0%", "-100%"])

  return (
    <div
      ref={ref}
      className="h-[140vh] md:h-[175vh] w-full bg-black overflow-hidden antialiased relative flex flex-col self-auto py-0 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{ y: yText, x: xText }}
        className="relative mt-20 md:mt-32 inset-0 flex items-center justify-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="block">Web Solutions</span>
          <span className="block text-accent">That Drive Results</span>
        </h1>
      </motion.div>

      <div className="h-full w-full absolute inset-0 z-10 pointer-events-none" />

      <div className="flex flex-row items-start gap-4 md:gap-6 px-4 md:px-6 mt-32 md:mt-80">
        <motion.div style={{ y: yFirstRow }} className="flex flex-col gap-4 md:gap-6 w-1/2">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </motion.div>
        <motion.div style={{ y: ySecondRow }} className="flex flex-col gap-4 md:gap-6 w-1/2 mt-10 md:mt-40">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div className="absolute top-0 inset-x-0 z-50 max-w-7xl mx-auto w-full px-4 md:px-6 py-10">
      <h2 className="text-xl md:text-2xl font-light tracking-tighter text-white">Web Solutions</h2>
    </div>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="relative group block w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          width={600}
          height={400}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-light text-white text-lg md:text-xl group-hover:text-accent transition-colors">
          {product.title}
        </h3>
        <p className="text-neutral-300 text-sm">Innovative web solutions for modern businesses</p>
      </div>
    </div>
  )
}

