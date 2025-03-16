"use client"

import { useRef, useEffect, useState } from "react"

export const GithubGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const radius = Math.min(dimensions.width, dimensions.height) * 0.3

    // Create points on the globe
    const points: { x: number; y: number; z: number; size: number; color: string }[] = []
    const numPoints = 200

    for (let i = 0; i < numPoints; i++) {
      // Generate random spherical coordinates
      const theta = Math.random() * Math.PI * 2 // longitude
      const phi = Math.acos(2 * Math.random() - 1) // latitude

      // Convert to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      points.push({
        x,
        y,
        z,
        size: Math.random() * 2 + 1,
        color: `rgba(255, 182, 193, ${Math.random() * 0.5 + 0.5})`, // Pastel red with varying opacity
      })
    }

    // Create connections between points
    const connections: { from: number; to: number; opacity: number }[] = []
    const maxConnections = 100

    for (let i = 0; i < maxConnections; i++) {
      const from = Math.floor(Math.random() * numPoints)
      const to = Math.floor(Math.random() * numPoints)

      if (from !== to) {
        // Calculate distance between points
        const dx = points[from].x - points[to].x
        const dy = points[from].y - points[to].y
        const dz = points[from].z - points[to].z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        // Only connect points that are relatively close
        if (distance < radius * 0.8) {
          connections.push({
            from,
            to,
            opacity: 1 - distance / (radius * 0.8), // Fade out with distance
          })
        }
      }
    }

    let rotationX = 0
    let rotationY = 0
    const rotationSpeed = 0.001

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update rotation based on mouse position
      const targetRotationX = (mousePosition.y - 0.5) * Math.PI * 0.5
      const targetRotationY = (mousePosition.x - 0.5) * Math.PI * 0.5

      rotationX += (targetRotationX - rotationX) * 0.05
      rotationY += (targetRotationY - rotationY) * 0.05

      // Automatic rotation
      rotationY += rotationSpeed

      // Sort points by z-coordinate for proper depth rendering
      const sortedPoints = [...points]
        .map((point, index) => {
          // Apply rotation
          const cosX = Math.cos(rotationX)
          const sinX = Math.sin(rotationX)
          const cosY = Math.cos(rotationY)
          const sinY = Math.sin(rotationY)

          // Rotate around X axis
          const y1 = point.y * cosX - point.z * sinX
          const z1 = point.y * sinX + point.z * cosX

          // Rotate around Y axis
          const x2 = point.x * cosY + z1 * sinY
          const z2 = -point.x * sinY + z1 * cosY

          return { ...point, x: x2, y: y1, z: z2, index }
        })
        .sort((a, b) => a.z - b.z)

      // Draw connections
      ctx.lineWidth = 0.5
      connections.forEach((conn) => {
        const fromPoint = sortedPoints.find((p) => p.index === conn.from)
        const toPoint = sortedPoints.find((p) => p.index === conn.to)

        if (fromPoint && toPoint) {
          const x1 = centerX + fromPoint.x
          const y1 = centerY + fromPoint.y
          const x2 = centerX + toPoint.x
          const y2 = centerY + toPoint.y

          // Only draw connections for visible points
          if (fromPoint.z > -radius && toPoint.z > -radius) {
            const opacity = 
  conn.opacity *
  Math.min(
    (fromPoint.z + radius) / (2 * radius),
    ((toPoint.z + radius) / (2 * radius)) * radius
  );

ctx.strokeStyle = `rgba(255, 182, 193, ${opacity * 0.3})`;

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      })

      // Draw points
      sortedPoints.forEach((point) => {
        if (point.z > -radius) {
          // Only draw points on the visible side
          const x = centerX + point.x
          const y = centerY + point.y
          const scaleFactor = (point.z + radius) / (2 * radius) // Scale based on z-coordinate
          const size = point.size * scaleFactor

          ctx.fillStyle = point.color
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [dimensions, mousePosition])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

