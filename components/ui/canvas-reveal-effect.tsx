"use client"

import { useEffect, useRef, useState } from "react"

export const CanvasRevealEffect = ({
  revealText,
  textClassName,
  containerClassName,
  animationSpeed = 1,
}: {
  revealText: string
  textClassName?: string
  containerClassName?: string
  animationSpeed?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const xPercent = x / rect.width
      const yPercent = y / rect.height

      const videos = containerRef.current.querySelectorAll(".hero-video")
      videos.forEach((video, index) => {
        const factor = (index + 1) * 10
        ;(video as HTMLElement).style.transform = `translate(${
          (xPercent - 0.5) * factor
        }px, ${(yPercent - 0.5) * factor}px)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
        // Particles are now a lot smaller
        this.size = 1
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
          // Increase the displacement to space particles out more upon interaction
          const interactionMultiplier = 3
          this.x -= directionX * interactionMultiplier
          this.y -= directionY * interactionMultiplier
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
            // All particles are white
            particleArray.push(new Particle(x, y, "#ffffff"))
          }
        }
      }
    }

    function getImageData() {
      if (!ctx || !textRef.current) return null

      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return null

      tempCanvas.width = dimensions.width
      tempCanvas.height = dimensions.height

      const computedStyle = window.getComputedStyle(textRef.current)
      // Force the font to be bold while keeping the original size and font family
      const fontStyle = `bold ${computedStyle.fontSize} ${computedStyle.fontFamily}`

      tempCtx.font = fontStyle
      tempCtx.fillStyle = "white"
      tempCtx.textBaseline = "middle"
      tempCtx.textAlign = "center"

      tempCtx.fillText(revealText, tempCanvas.width / 2, tempCanvas.height / 2)

      return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
    }

    const mouse = {
      x: 0,
      y: 0,
      radius: 100,
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
  }, [dimensions, isInView, revealText, animationSpeed])

  return (
    <div className={`relative overflow-hidden ${containerClassName}`} ref={containerRef}>
      {/* Original video setup */}
      <div className="absolute inset-0 z-0 flex">
        <video
          className="hero-video w-1/3 h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://videos.pexels.com/video-files/18069237/18069237-uhd_1440_1440_24fps.mp4"
        ></video>
        <video
          className="hero-video w-1/3 h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://videos.pexels.com/video-files/17485992/17485992-uhd_1440_1800_25fps.mp4"
        ></video>
        <video
          className="hero-video w-1/3 h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://videos.pexels.com/video-files/18069473/18069473-sd_360_640_24fps.mp4"
        ></video>
      </div>

      {/* Tint overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />

      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full" />
      <div
        ref={textRef}
        className={`opacity-0 absolute inset-0 flex items-center justify-center ${textClassName}`}
      >
        {revealText}
      </div>
    </div>
  )
}
