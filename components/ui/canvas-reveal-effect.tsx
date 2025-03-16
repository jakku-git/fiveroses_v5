"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const CanvasRevealEffect = ({
  revealText,
  textClassName,
  containerClassName,
  colors = ["#111", "#fff"],
  animationSpeed = 1,
}: {
  revealText: string
  textClassName?: string
  containerClassName?: string
  colors?: string[]
  animationSpeed?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || !textRef.current) return

    const updateDimensions = () => {
      if (!textRef.current) return
      const { width, height } = textRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    observer.observe(textRef.current)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (textRef.current) observer.unobserve(textRef.current)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !textRef.current || !isInView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let particleArray: Particle[] = []
    const numberOfParticles = 350
    const detail = 1

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      distance: number
      color: string
      constructor(x: number, y: number, color: string) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = x
        this.baseY = y
        this.density = Math.random() * 30 + 1
        this.distance = 0
        this.color = color
      }
      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      update() {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        this.distance = distance
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = mouse.radius
        const force = (maxDistance - distance) / maxDistance
        const directionX = forceDirectionX * force * this.density * animationSpeed
        const directionY = forceDirectionY * force * this.density * animationSpeed

        if (distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
        this.draw()
      }
    }

    function init() {
      particleArray = []
      if (!ctx || !textRef.current) return

      const textData = getImageData()
      if (!textData) return

      for (let y = 0, y2 = textData.height; y < y2; y += detail) {
        for (let x = 0, x2 = textData.width; x < x2; x += detail) {
          const index = y * 4 * textData.width + x * 4
          const alpha = textData.data[index + 3]
          if (alpha > 128) {
            const color = colors[Math.floor(Math.random() * colors.length)]
            particleArray.push(new Particle(x, y, color))
          }
        }
      }
    }

    function getImageData() {
      if (!ctx || !textRef.current) return null

      // Create a temporary canvas to render the text
      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return null

      tempCanvas.width = dimensions.width
      tempCanvas.height = dimensions.height

      // Get computed style of the text element
      const computedStyle = window.getComputedStyle(textRef.current)
      const fontStyle = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`

      tempCtx.font = fontStyle
      tempCtx.fillStyle = "white"
      tempCtx.textBaseline = "middle"
      tempCtx.textAlign = "center"

      // Draw text in the center of the canvas
      tempCtx.fillText(revealText, tempCanvas.width / 2, tempCanvas.height / 2)

      return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
    }

    const mouse = {
      x: 0,
      y: 0,
      radius: 20000,
    }

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    })

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      particleArray = []
    }
  }, [dimensions, isInView, colors, revealText, animationSpeed])

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full" />
      <div ref={textRef} className={`opacity-0 absolute inset-0 flex items-center justify-center ${textClassName}`}>
        {revealText}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-10 left-0 right-0 z-20 text-center text-white"
      >
        <p className="text-lg md:text-xl font-light">Full-service marketing agency</p>
      </motion.div>
    </div>
  )
}

