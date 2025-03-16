"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

export const FlipWords = ({
  words = ["First", "Second", "Third"],
}: {
  words: string[]
}) => {
  const [index, setIndex] = useState(0)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.5 })

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isInView) {
      interval = setInterval(() => {
        controls
          .start({
            y: "-100%",
            transition: { duration: 0.5, ease: "easeInOut" },
          })
          .then(() => {
            setIndex((prev) => (prev + 1) % words.length)
            controls.set({ y: "100%" })
            controls.start({
              y: "0%",
              transition: { duration: 0.5, ease: "easeInOut" },
            })
          })
      }, 2000)
    }

    return () => clearInterval(interval)
  }, [isInView, controls, words.length])

  return (
    <span ref={containerRef} className="inline-block h-[1.2em] overflow-hidden relative align-bottom">
      <motion.span animate={controls} className="inline-block" style={{ y: 0 }}>
        <span className="inline-block text-accent">{words[index]}</span>
      </motion.span>
    </span>
  )
}

