"use client"

import { useEffect, useRef, useState } from "react"

// Add throttle utility with proper typing
const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): T => {
  let inThrottle: boolean
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}

export const CanvasRevealEffect = ({
  revealText,
  textClassName,
  containerClassName,
  animationSpeed = 1,
  videoUrls = {
    video1: "deepmind1.webm",
    video2: "deepmind3.webm",
    video3: "deepmind2.webm"
  }
}: {
  revealText: string
  textClassName?: string
  containerClassName?: string
  animationSpeed?: number
  videoUrls?: {
    video1: string
    video2: string
    video3: string
  }
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videosLoaded, setVideosLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isInView, setIsInView] = useState(false)

  // Handle video loading
  const handleVideoLoad = () => {
    const videos = containerRef.current?.querySelectorAll('video')
    if (videos) {
      const allLoaded = Array.from(videos).every(video => video.readyState >= 3)
      if (allLoaded) {
        setVideosLoaded(true)
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
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
    }, 16) // Throttle to ~60fps

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
    let animationFrameId: number
    const detail = 3

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
            particleArray.push(new Particle(x, y, "rgba(255, 255, 255, 0.9)"))
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

    const handleCanvasMouseMove = throttle((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }, 16) // Throttle to ~60fps

    window.addEventListener("mousemove", handleCanvasMouseMove)

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("mousemove", handleCanvasMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      particleArray = []
    }
  }, [dimensions, isInView, revealText, animationSpeed])

  return (
    <div className={`relative overflow-hidden ${containerClassName}`} ref={containerRef}>
      <div className="absolute inset-0 z-0 flex">
        {!videosLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        <video
          className="hero-video w-1/3 h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={handleVideoLoad}
          src={videoUrls.video1}
        />
        <video
          className="hero-video w-1/3 h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={handleVideoLoad}
          src={videoUrls.video2}
        />
        <video
          className="hero-video w-1/3 h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={handleVideoLoad}
          src={videoUrls.video3}
        />
      </div>

      <div 
        className={`absolute inset-0 z-5 pointer-events-none transition-opacity duration-500 ${
          videosLoaded ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} 
      />

      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 z-10 w-full h-full transition-opacity duration-500 ${
          videosLoaded ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      <div
        ref={textRef}
        className={`opacity-0 absolute inset-0 flex items-center justify-center ${textClassName}`}
        style={{ color: "rgba(255, 255, 255, 0.9)", textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
      >
        {revealText}
      </div>
    </div>
  )
}
