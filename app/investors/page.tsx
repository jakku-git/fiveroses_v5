"use client"

import React, { useEffect, useRef, useState, useMemo, Suspense } from "react"
import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion"
import Lenis from "@studio-freight/lenis"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { PasswordProtect } from "@/components/password-protect"

// Animated Bar Chart Component
function AnimatedBarChart({ 
  data, 
  title 
}: { 
  data: { label: string; value: number; suffix?: string; color?: string }[];
  title?: string;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto my-12 p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {title && (
        <h3 className="text-2xl font-bold mb-8 text-white">{title}</h3>
      )}
      <div className="space-y-6">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <span className="text-white/80 font-medium">{item.label}</span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                className="text-white font-bold"
              >
                {item.value}{item.suffix || ''}
              </motion.span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${(item.value / maxValue) * 100}%` : 0 }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full relative overflow-hidden"
                style={{ backgroundColor: item.color || "#ffffff" }}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: isInView ? "200%" : "-100%" }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.1 + 0.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Animated Donut Chart
function AnimatedDonutChart({
  data,
  title
}: {
  data: { label: string; value: number; color: string }[];
  title?: string;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  let cumulativePercentage = 0
  
  return (
    <div ref={ref} className="w-full max-w-md mx-auto my-16 p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {title && (
        <h3 className="text-xl font-light mb-8 text-white text-center tracking-wide">{title}</h3>
      )}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, i) => {
            const percentage = (item.value / total) * 100
            const startAngle = cumulativePercentage * 3.6
            const endAngle = (cumulativePercentage + percentage) * 3.6
            cumulativePercentage += percentage
            
            const radius = 40
            const circumference = 2 * Math.PI * radius
            const offset = circumference - (percentage / 100) * circumference
            
            return (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ 
                  strokeDashoffset: isInView ? offset : circumference,
                  transform: `rotate(${startAngle}deg)`
                }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: '50% 50%' }}
              />
            )
          })}
        </svg>
      </div>
      <div className="space-y-4">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.6, delay: i * 0.1 + 0.4 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white/80 text-sm font-light tracking-wide">{item.label}</span>
            </div>
            <span className="text-white font-light text-lg">{Math.round((item.value / total) * 100)}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Stat Block Component
function StatBlock({
  stats,
  title
}: {
  stats: { value: string; label: string; description?: string; valueSize?: string }[];
  title?: string;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto my-16 p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {title && (
        <h3 className="text-2xl font-light mb-10 text-white text-center tracking-wide">{title}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-2"
          >
            <div className={`${stat.valueSize || "text-4xl md:text-5xl"} font-light text-white mb-3 tracking-tight break-words`}>{stat.value}</div>
            <div className="text-sm font-light text-white/90 mb-2 tracking-wide uppercase break-words">{stat.label}</div>
            {stat.description && (
              <div className="text-xs text-white/80 font-light tracking-wide break-words">{stat.description}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Visual Capabilities Grid
function CapabilitiesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const capabilities = [
    { name: "Strategy", western: "Market positioning, brand architecture, business consulting", chinese: "Market entry strategy, platform selection, regulatory navigation", cross: "Go-to-market roadmaps for international expansion" },
    { name: "Creative", western: "Brand identity, visual design, UX/UI, video production", chinese: "Culturally adapted creative, WeChat design, Xiaohongshu content", cross: "Dual-market creative systems with brand consistency" },
    { name: "Media", western: "Meta, Google, TikTok, LinkedIn, traditional media buying", chinese: "WeChat, Xiaohongshu, Douyin, Weibo, Baidu, Taobao advertising", cross: "Cross-platform media orchestration and optimization" },
    { name: "Technology", western: "Web development, e-commerce, marketing automation", chinese: "WeChat mini-programs, Taobao storefronts, Chinese hosting", cross: "Multi-market technology infrastructure and integration" },
    { name: "Content", western: "Copywriting, photography, video, social media management", chinese: "Mandarin copywriting, livestream production, KOL coordination", cross: "Transcreation and cultural adaptation at scale" }
  ]
  
  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto my-16">
      <div className="space-y-6">
        {capabilities.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 p-8"
          >
            <h4 className="text-2xl font-light text-white mb-6 tracking-wide">{cap.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/80 mb-2 font-light">Western Markets</div>
                <p className="text-white/80 text-sm font-light leading-relaxed">{cap.western}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/80 mb-2 font-light">Chinese Markets</div>
                <p className="text-white/80 text-sm font-light leading-relaxed">{cap.chinese}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/80 mb-2 font-light">Cross-Border</div>
                <p className="text-white/80 text-sm font-light leading-relaxed">{cap.cross}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Timeline Component
function TimelineBlock({
  items,
  title
}: {
  items: { year: string; revenue: string; team: string; clients: string; margin: string }[];
  title?: string;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto my-16">
      {title && (
        <h3 className="text-2xl font-light mb-12 text-white text-center tracking-wide">{title}</h3>
      )}
      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 p-8"
          >
            <div className="flex items-baseline gap-6 mb-6">
              <div className="text-4xl font-light text-white tracking-tight">{item.year}</div>
              <div className="text-3xl font-light text-white/90 tracking-tight">{item.revenue}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white/80 font-light">Team: </span>
                <span className="text-white/90 font-light">{item.team}</span>
              </div>
              <div>
                <span className="text-white/60 font-light">Clients: </span>
                <span className="text-white/90 font-light">{item.clients}</span>
              </div>
              <div>
                <span className="text-white/60 font-light">EBITDA Margin: </span>
                <span className="text-white/90 font-light">{item.margin}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Animated Metric Card
function MetricCard({
  value,
  label,
  subtitle,
  delay = 0,
  highlight = false
}: {
  value: string;
  label: string;
  subtitle?: string;
  delay?: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`p-8 rounded-xl backdrop-blur-sm border relative overflow-hidden ${
        highlight 
          ? 'bg-white/10 border-white/30' 
          : 'bg-white/5 border-white/10'
      }`}
    >
      {highlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
          className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent"
        />
      )}
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">{value}</div>
        <div className="text-base font-light text-white/90 mb-2 tracking-wide uppercase">{label}</div>
        {subtitle && <div className="text-sm text-white/80 font-light tracking-wide">{subtitle}</div>}
      </div>
    </motion.div>
  )
}

// Animated Growth Chart with Line
function GrowthChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const years = [
    { year: "2026", revenue: 0.18, label: "Current" },
    { year: "2027", revenue: 0.75, label: "Year 2" },
    { year: "2028", revenue: 2.1, label: "Year 3" },
    { year: "2029", revenue: 4.5, label: "Year 4" },
    { year: "2030", revenue: 8.5, label: "Year 5" }
  ]
  
  const maxRevenue = 10
  
  // Calculate SVG path points for the line
  const chartWidth = 100
  const chartHeight = 100
  const points = years.map((item, i) => ({
    x: (i / (years.length - 1)) * chartWidth,
    y: chartHeight - (item.revenue / maxRevenue) * chartHeight
  }))
  
  const pathD = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')
  
  const pathLength = points.reduce((acc, point, i) => {
    if (i === 0) return 0
    const prev = points[i - 1]
    return acc + Math.sqrt(Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2))
  }, 0)
  
  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto my-16 p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      <h3 className="text-2xl font-light mb-12 text-white tracking-wide">5-Year Revenue Projection (AUD)</h3>
      
      {/* SVG Line Overlay */}
      <div className="relative h-80 mb-8">
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
        >
          <motion.path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="0.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Glow effect */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1"
            strokeLinecap="round"
            filter="blur(2px)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Animated dots at each point */}
          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="1"
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.5 + (i * 0.15), ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </svg>
        
        <div className="flex items-end justify-between h-full gap-4">
          {years.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gradient-to-t from-white/20 to-white/10 rounded-t-lg relative"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.5 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 text-white font-light text-lg whitespace-nowrap tracking-wide"
                >
                  ${item.revenue}M
                </motion.div>
              </motion.div>
              <div className="mt-4 text-center">
                <div className="text-white/90 font-light tracking-wide">{item.year}</div>
                <div className="text-white/80 text-sm font-light">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Comparison Table
function ComparisonTable() {
  return (
    <div className="w-full max-w-6xl mx-auto my-12 overflow-x-auto">
      <motion.table 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full border-collapse"
      >
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left p-4 text-white/80 font-semibold">Model</th>
            <th className="text-left p-4 text-white/80 font-semibold">Timeline</th>
            <th className="text-left p-4 text-white/80 font-semibold">Cost</th>
            <th className="text-left p-4 text-white/80 font-semibold">Vendors</th>
            <th className="text-left p-4 text-white/80 font-semibold">Accountability</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/10">
            <td className="p-4 text-white/80">Traditional (Multi-Vendor)</td>
            <td className="p-4 text-white/80">4-6 months</td>
            <td className="p-4 text-white/80">$300K-800K</td>
            <td className="p-4 text-white/80">5-8 vendors</td>
            <td className="p-4 text-white/80">Fragmented</td>
          </tr>
          <tr className="bg-white/5">
            <td className="p-4 text-white font-bold"><span className="font-semibold">fiveroses</span> (Integrated)</td>
            <td className="p-4 text-white font-bold">6-8 weeks</td>
            <td className="p-4 text-white font-bold">$150K-400K</td>
            <td className="p-4 text-white font-bold">1 partner</td>
            <td className="p-4 text-white font-bold">Single-point</td>
          </tr>
        </tbody>
      </motion.table>
      <div className="mt-4 text-center">
        <span className="text-white/80 text-sm">50% faster • 40-50% cheaper • 100% accountable</span>
      </div>
    </div>
  )
}

// Interactive Particle Cloud - 8000 particles
function InteractiveParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null)
  const [positions] = useState(() => {
    const pos = new Float32Array(8000 * 3)
    for (let i = 0; i < 8000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  })

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = mousePosition.y * 0.1
      pointsRef.current.rotation.z = mousePosition.x * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={8000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.005}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Morphing Blob Shader
function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(1, 1, 1) },
    }),
    []
  )

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            vec3 pos = position;
            float noise = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * 0.3;
            pos += normal * noise;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            float alpha = 0.05 + sin(vUv.x * 3.14159) * 0.03;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function PartnersPage() {
  const lenisRef = useRef<Lenis | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollProgressValue = useMotionValue(0)

  // Mouse tracking for particles only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      scrollProgressValue.set(progress)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main ref={containerRef} className="bg-black text-white relative overflow-hidden">
      {/* Interactive 3D Background */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <InteractiveParticles mousePosition={mousePosition} />
            <MorphingBlob />
          </Canvas>
        </Suspense>
      </div>


      {/* Content */}
      <div className="relative z-10">
        {/* Section 1 — Opening */}
        <OpeningSection />

        {/* Section 2 — Executive Summary */}
        <ContentSection
          heading="Executive Summary"
          animationStyle="splitReveal"
          body={
          <>
            <p className="text-white text-2xl mb-12">
              <span className="font-semibold">fiveroses</span> is not another creative agency. We are the bridge between international markets that were never designed to understand each other.
            </p>
            <p className="mb-16">
              We are an integrated creative technology platform operating at the intersection of strategy, media, design, and execution—with fluency across global markets that no traditional agency possesses. While most agencies are stuck in single markets or regions, we operate across North America, Europe, Australia, Asia-Pacific, and China with genuine cultural understanding.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
              <MetricCard value="$474B" label="Global Marketing Market" subtitle="2026 projected (4.6% CAGR)" delay={0} highlight />
              <MetricCard value="$91B" label="Cross-Border E-Commerce" subtitle="China-West, +18% annually" delay={0.1} highlight />
              <MetricCard value="$99.6B" label="AU Gov't Procurement" subtitle="83,453 contracts (2023-24)" delay={0.2} highlight />
            </div>

            <div className="w-full max-w-6xl mx-auto my-16 p-12 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-3xl font-light mb-12 text-white text-center tracking-wide">The Structural Advantage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-5xl font-light text-white mb-4">10+ Years</div>
                  <div className="text-lg font-light text-white/90 mb-3">International Market Expertise</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Direct operational experience across North America, Europe, Australia, and China. Not consultant knowledge—hands-on execution managing cross-border campaigns, navigating regulatory requirements, and building relationships with media owners across multiple markets.
                  </p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-5xl font-light text-white mb-4">Multi-Platform</div>
                  <div className="text-lg font-light text-white/90 mb-3">Western & Chinese Ecosystems</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Operational fluency across Meta, Google, TikTok in the West AND WeChat, Xiaohongshu, Douyin, Weibo in China. This dual capability is exceptionally rare—most agencies master one ecosystem or the other, never both.
                  </p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-5xl font-light text-white mb-4">Australian Base</div>
                  <div className="text-lg font-light text-white/90 mb-3">Strategic Neutral Territory</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Operating from Australia provides unique advantages: neutral positioning outside US-China geopolitical tensions, access to Asia-Pacific markets, Western legal/business frameworks, and credibility with both Eastern and Western clients seeking an unbiased partner.
                  </p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-5xl font-light text-white mb-4">Integrated Model</div>
                  <div className="text-lg font-light text-white/90 mb-3">Five Capabilities, One Team</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Strategy, Creative, Media, Technology, and Content delivered by one integrated team. No handoffs, no margin stacking, no accountability gaps. What takes traditional agencies 4-6 months, we deliver in 6-8 weeks at 30-50% lower cost.
                  </p>
                </div>
              </div>
              <p className="text-center text-white/80 font-light text-lg">
                This combination of capabilities cannot be assembled quickly. It represents years of relationship-building, operational learning, and cultural immersion across multiple markets. It is <span className="font-semibold">fiveroses'</span> defensible moat.
              </p>
            </div>

            <p className="my-16">
              <span className="font-semibold">fiveroses</span> operates with lived experience across cultures, continents, and market systems. While Western agencies struggle with Chinese platforms (WeChat, Xiaohongshu, Douyin) and Chinese agencies fail at Western brand standards, <span className="font-semibold">fiveroses</span> operates fluently everywhere—from New York to Paris to Shanghai to Sydney. This capability cannot be hired overnight or trained through workshops.
            </p>
            
            <StatBlock
              title="Market Landscape: Why Integration Wins"
              stats={[
                { value: "68%", label: "Agencies Reassessing", description: "Marketing leaders in 2024" },
                { value: "48%", label: "Delivery Issues", description: "Top reason for firing agencies" },
                { value: "56.4%", label: "Tech Stack Unused", description: "Companies use only half" },
                { value: "16%", label: "Global Growth", description: "Avg agency revenue YoY" }
              ]}
            />

            <StatBlock
              title="What We Do"
              stats={[
                { value: "Strategy", label: "Core Capability", description: "Consulting & planning" },
                { value: "Creative", label: "Core Capability", description: "Design & direction" },
                { value: "Media", label: "Core Capability", description: "Planning & buying" },
                { value: "Tech", label: "Core Capability", description: "Development & platforms" }
              ]}
            />

            <p className="my-16">
              We are registered as an approved supplier for Australian governments—a status that took 12-18 months to achieve. We maintain direct media buying relationships with premium publishers, out-of-home networks, and digital platforms across multiple markets. We have active clients across technology, retail, hospitality, and government sectors.
            </p>

            <GrowthChart />

            <p className="my-16 text-white text-xl">
              The Opportunity: Build the operating system for international brand growth. Become the default partner for brands expanding between markets. Capture government contracts that traditional agencies cannot service due to lack of integrated capabilities.
            </p>

            <AnimatedDonutChart
              title="Investment Deployment"
              data={[
                { label: "Team Expansion", value: 60, color: "#ffffff" },
                { label: "Technology & Infrastructure", value: 20, color: "#cccccc" },
                { label: "Marketing & Business Development", value: 15, color: "#999999" },
                { label: "Operational Runway", value: 5, color: "#666666" }
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              <MetricCard value="$500K-750K" label="Capital Raise" subtitle="Strategic investment" delay={0} />
              <MetricCard value="$750K ARR" label="18-Month Target" subtitle="Conservative 4x growth" delay={0.1} />
            </div>

            <p className="my-16">
              Every dollar unlocks $3-4 in annual revenue capacity (based on current client demand). Every hire adds $180K-250K in client servicing capability (industry benchmarks for integrated agencies). With $500-750K capital: hire 4-5 key roles, establish operational infrastructure, capture existing $450K pipeline, and scale to 12-15 clients by Year 2.
            </p>

            <p className="text-white text-xl">
              This is not speculative growth. This is capacity expansion to meet proven demand. The clients are already asking. We just need the team to deliver.
            </p>
          </>
        }
      />

        {/* Section 3A — The China-West Bridge */}
        <ContentSection
          heading="The China-West Bridge"
          animationStyle="scatter"
          body={
          <>
            <p className="mb-6 text-white font-semibold text-2xl">
              Most agencies can operate in one market. We operate in two worlds simultaneously.
            </p>
            <p className="mb-6">
              The fundamental challenge of global expansion isn't language translation—it's systems translation. Chinese and Western markets operate on entirely different digital ecosystems, social platforms, regulatory frameworks, purchasing psychology, and trust mechanisms.
            </p>
            <p className="text-white font-semibold">The gap between these markets represents the largest untapped opportunity in modern marketing.</p>
          </>
        }
      />

        {/* Section 3B — Case Studies: Global Market Entry Success Stories */}
        <ContentSection
          heading="Market Entry Success Stories"
          animationStyle="wave"
          body={
          <>
            <p className="mb-6 text-white font-semibold">
              International expansion is accelerating—and the stakes are massive.
            </p>
            
            <p className="mb-6 text-white font-semibold text-lg">
              Chinese Brands → Western Markets
            </p>
            <p className="mb-6">
              <strong>BYD, Zeekr, XPeng (Automotive → Australia, 2023-24):</strong><br/>
              Chinese EV manufacturers captured 25% of Australia's electric vehicle market within 2 years. BYD alone secured 14% market share (2nd to Tesla), growing sales 6x to over 12,000 vehicles. Zeekr generated 2,500+ pre-orders before launch. Success required overcoming "Made in China" perceptions, navigating Australian advertising standards, and creating culturally authentic messaging.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
              <MetricCard value="25%" label="Chinese EV Share" subtitle="Australian market" delay={0} />
              <MetricCard value="14%" label="BYD Market Share" subtitle="2nd to Tesla" delay={0.1} />
              <MetricCard value="6x" label="Sales Growth" subtitle="2 years" delay={0.2} />
              <MetricCard value="91%" label="e.l.f. Int'l Growth" subtitle="YoY Q1 FY2025" delay={0.3} />
            </div>

            <p className="mb-6 text-white font-semibold text-lg">
              Western Brands → International Markets
            </p>
            <p className="mb-6">
              <strong>e.l.f. Beauty (USA → Europe, Australia, Mexico, 2024):</strong><br/>
              American cosmetics brand achieved 91% year-over-year international sales growth in Q1 FY2025. Entered 1,600 Rossmann stores (Germany), Sephora (Mexico), and Coles (Australia). Reached No. 4 mass makeup brand in UK. Success came from adapting product positioning and retail strategies for each market while maintaining brand consistency.
            </p>
            <p className="mb-6">
              <strong>Wendy's (USA → UK, Ireland, Romania, 2021-2025):</strong><br/>
              Re-entered UK in 2021 with plan for 400 restaurants. Expanded to Ireland and Romania in 2024-25. Recruiting franchisees across Europe for hundreds of additional locations over next decade. Success requires localized menu adaptation, franchisee selection, and market-specific brand positioning.
            </p>
            <p className="mb-6">
              <strong>July Luggage (Australia → USA, 2021-2024):</strong><br/>
              Australian DTC luggage brand grew US sales 400% in 3 years through targeted paid advertising and cultural adaptation. US now represents 30-35% of total revenue. Demonstrates how smaller brands can successfully enter larger markets with the right strategy.
            </p>

            <p className="mb-16 text-white text-xl">
              The Common Thread: What Every Success Story Required
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-lg font-light text-white mb-3">Cultural Translation</div>
                <p className="text-sm text-white/70 font-light">Not just language—cultural translation. Understanding local consumer psychology, trust signals, and communication norms.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-lg font-light text-white mb-3">Platform-Specific Strategy</div>
                <p className="text-sm text-white/70 font-light">What works on Instagram fails on Xiaohongshu. Each platform has unique algorithms, content styles, and user expectations.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-lg font-light text-white mb-3">Regulatory Navigation</div>
                <p className="text-sm text-white/70 font-light">Every market has different advertising standards, data privacy laws, and compliance requirements. One misstep can derail months of work.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-lg font-light text-white mb-3">Market-Specific Positioning</div>
                <p className="text-sm text-white/70 font-light">Brand messaging that resonates in New York might fall flat in Shanghai. Positioning must adapt while maintaining core identity.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-lg font-light text-white mb-3">Long-Term Commitment</div>
                <p className="text-sm text-white/70 font-light">International expansion isn't a 3-month campaign. It's a multi-year commitment requiring patience, adaptation, and persistence.</p>
              </motion.div>
            </div>

            <p className="text-white text-xl">This is exactly what <span className="font-semibold">fiveroses</span> does—across every major market.</p>
          </>
        }
      />

        {/* Section 3C — Platform Mastery */}
        <ContentSection
          heading="Platform Mastery: East & West"
          animationStyle="perspective"
          body={
          <>
            <p className="mb-16 text-white text-xl">
              Western agencies master Facebook and Google. Chinese agencies master WeChat and Douyin. <span className="fiveroses-brand">fiveroses</span> masters both ecosystems simultaneously—a capability that cannot be hired overnight.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-light text-white mb-8 tracking-wide">Western Platforms</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-xl font-light text-white mb-2">Meta (Facebook, Instagram)</div>
                    <p className="text-sm text-white/70 font-light">3.8B+ monthly active users. Social advertising, community building, influencer partnerships, Stories, Reels, Shopping.</p>
                  </div>
                  <div>
                    <div className="text-xl font-light text-white mb-2">Google (Search, YouTube, Display)</div>
                    <p className="text-sm text-white/70 font-light">4.3B users. Intent-based advertising, SEO, SEM, YouTube video marketing, programmatic display across 2M+ websites.</p>
                  </div>
                  <div>
                    <div className="text-xl font-light text-white mb-2">TikTok</div>
                    <p className="text-sm text-white/70 font-light">1B+ users. Short-form video, algorithmic distribution, creator partnerships, TikTok Shop for direct commerce.</p>
                  </div>
                  <div>
                    <div className="text-xl font-light text-white mb-2">LinkedIn</div>
                    <p className="text-sm text-white/70 font-light">900M+ professionals. B2B marketing, thought leadership, recruitment advertising, account-based marketing.</p>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-light text-white mb-8 tracking-wide">Chinese Platforms</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-xl font-light text-white mb-2">WeChat (微信)</div>
                    <p className="text-sm text-white/70 font-light">1.3B users. Not just messaging—payments, e-commerce, mini-programs, official accounts. The entire Chinese digital ecosystem in one app.</p>
                  </div>
                  <div>
                    <div className="text-xl font-light text-white mb-2">Xiaohongshu (小红书)</div>
                    <p className="text-sm text-white/70 font-light">300M users. Product discovery, reviews, lifestyle content. Where Chinese consumers decide what to buy before they buy it.</p>
                  </div>
                  <div>
                    <div className="text-xl font-light text-white mb-2">Douyin (抖音)</div>
                    <p className="text-sm text-white/70 font-light">600M daily users. China's TikTok, but fundamentally different. Integrated e-commerce, livestream selling, different content styles and algorithms.</p>
                  </div>
                  <div>
                    <div className="text-xl font-light text-white mb-2">Taobao/Tmall (淘宝/天猫)</div>
                    <p className="text-sm text-white/70 font-light">800M+ users. Where Chinese consumers actually transact. Alibaba's massive e-commerce ecosystem with unique marketing tools.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white text-xl">
              The gap between these ecosystems is why 85% of Western brands fail in China and 40-60% of Chinese brands struggle in the West. <span className="fiveroses-brand">fiveroses</span> operates fluently in both, eliminating the learning curve and cultural mistakes that sink most international campaigns.
            </p>
          </>
        }
      />

        {/* Section 3D — The Founder Story */}
        <ContentSection
          heading="How Do You Build a Bridge Between Markets?"
          animationStyle="glitch"
          body={
          <>
            <p className="mb-12 text-white text-xl italic">
              Start by being born in one, raised in another, and ending up in a third.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-light text-white mb-4">Born in China</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Started life in China, which means fluent Mandarin and Cantonese aren't skills learned from Duolingo—they're how you talk to family. Understanding Chinese consumer behavior, business culture, and platform dynamics isn't academic knowledge. It's lived experience.
                </p>
              </div>

              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-light text-white mb-4">Raised in Montreal</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Grew up in Montreal, which conveniently made English and French second nature (because apparently two Asian languages weren't enough). Western education system, North American business norms, and the ability to survive -30°C winters. Built cultural fluency by osmosis, not workshops.
                </p>
              </div>

              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-light text-white mb-4">Operating from Australia</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Ended up in Australia, which turns out to be the perfect neutral territory for bridging East and West. Not caught in US-China tensions, connected to Asia-Pacific markets, operates under Western legal frameworks. Plus, surviving 45°C summers after Montreal winters proves adaptability.
                </p>
              </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 mb-16">
              <h3 className="text-2xl font-light text-white mb-8">The Practical Result</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-lg font-light text-white/90 mb-3">Four Languages, Genuinely Fluent</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Mandarin, Cantonese, English, French. Not "conversational"—fluent enough to negotiate contracts, write copy, manage teams, and understand cultural nuances that get lost in translation. This matters when a campaign's success depends on whether your messaging sounds authentic or Google Translated.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-light text-white/90 mb-3">10+ Years Across Both Markets</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Not consulting reports or brief market visits. A decade of hands-on execution managing campaigns, building relationships with media owners, navigating platform requirements, understanding what actually works vs. what theoretically should work. The kind of expertise you cannot hire or train—only accumulate through years of operational reality.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-light text-white/90 mb-3">Adaptable to Hot and Cold</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Survived Montreal winters (-30°C) and Sydney summers (45°C). If you can adapt to 75°C temperature swings, adapting marketing strategies across different markets is comparatively easy. It's a metaphor, but also literally true.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-light text-white/90 mb-3">Can Hold a Conversation Anywhere</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Beijing boardrooms, New York pitch meetings, Sydney creative studios, Montreal cafés—comfortable everywhere, awkward nowhere. This isn't about being a "global citizen." It's about being operationally effective in markets that operate on completely different business logic, cultural norms, and communication styles.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white text-xl">
              You cannot hire this combination. You cannot train it. You cannot workshop your way into it. This is what happens when someone is born in one market, raised in another, and builds a business in a third. <span className="fiveroses-brand font-semibold text-white">fiveroses</span> isn't just a company with international capabilities—it's a company where international capability is the foundational DNA.
            </p>
          </>
        }
      />

        {/* Section 4A — Market Opportunity: Global Services */}
        <ContentSection
          heading="Market 1: Global Marketing Services"
          animationStyle="splitReveal"
          body={
          <>
            <p className="mb-6">
              <strong>Total Addressable Market (TAM): USD $640 billion</strong><br/>
              The global marketing, advertising, and digital services market exceeds $640 billion annually, with consistent 4-6% year-over-year growth.
            </p>
            <p className="mb-6">
              <strong>Serviceable Addressable Market (SAM): USD $85 billion</strong><br/>
              Our immediate market focus is mid-market and enterprise brands in Australia, North America, and Asia-Pacific requiring integrated creative and media services.
            </p>
          </>
        }
      />

        {/* Section 4B — Market Opportunity: Cross-Border */}
        <ContentSection
          heading="Market 2: Cross-Border Marketing"
          animationStyle="wave"
          body={
          <>
            <p className="text-white text-2xl mb-16">
              Our Unique Advantage: The $85 Billion Bridge
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
                <div className="text-5xl mb-4">→</div>
                <div className="text-2xl font-light text-white mb-6">Chinese Brands Going West</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-light text-white mb-2">$155B</div>
                    <div className="text-sm text-white/70 font-light">Invested in overseas expansion (2023)</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-white mb-2">40-60%</div>
                    <div className="text-sm text-white/70 font-light">Failure rate in Western markets due to cultural misalignment</div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
                <div className="text-5xl mb-4">←</div>
                <div className="text-2xl font-light text-white mb-6">Western Brands Going East</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-light text-white mb-2">$42B</div>
                    <div className="text-sm text-white/70 font-light">Spent annually on China market entry attempts</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-white mb-2">15%</div>
                    <div className="text-sm text-white/70 font-light">Success rate after 5 years—85% fail entirely</div>
                  </div>
                </div>
              </div>
            </div>

            <AnimatedBarChart 
              title="Cross-Border Market Breakdown"
              data={[
                { label: "Cross-Border E-Commerce (China-West)", value: 220, suffix: "B USD", color: "#ffffff" },
                { label: "Chinese Overseas Investment", value: 155, suffix: "B USD", color: "#cccccc" },
                { label: "China-West Marketing TAM", value: 85, suffix: "B USD", color: "#bbbbbb" },
                { label: "Western Brands → China Spend", value: 42, suffix: "B USD", color: "#aaaaaa" }
              ]}
            />

            <div className="my-16 p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-light text-white mb-8 text-center">Annual Growth: 18%</h3>
              <p className="text-center text-white/80 font-light text-lg mb-8">
                Cross-border e-commerce growing faster than domestic e-commerce in both markets
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-black/20 rounded-xl">
                  <div className="text-3xl font-light text-white mb-2">$220B</div>
                  <div className="text-sm text-white/70 font-light">2024 Cross-Border Volume</div>
                </div>
                <div className="text-center p-6 bg-black/20 rounded-xl">
                  <div className="text-3xl font-light text-white mb-2">$399B</div>
                  <div className="text-sm text-white/70 font-light">2028 Projected (18% CAGR)</div>
                </div>
              </div>
            </div>

            <p className="text-white text-xl">
              The opportunity is massive. The failure rates are catastrophic. Brands desperately need partners who understand both markets. <span className="font-semibold">fiveroses</span> operates fluently in both, eliminating the $197B annual waste from failed cross-border expansion.
            </p>
          </>
        }
      />

        {/* Section 4C — Market Opportunity: Government Contracts */}
        <ContentSection
          heading="Market 3: Australian Government"
          animationStyle="perspective"
          body={
          <>
            <p className="mb-6">
              In 2023-24, the Australian Government published 83,453 procurement contracts worth $99.6 billion. Marketing, advertising, and digital communications represent a significant portion of this spend, with stable, predictable revenue and long contract terms.
            </p>
            <p className="mb-6 text-white font-semibold">
              Our Competitive Position
            </p>
            <p className="mb-6">
              Becoming an approved government supplier is a significant barrier to entry that took us 12-18 months to achieve. Most competitors either don't have this approval or are large holding companies. Out of 2.7+ million Australian businesses, we hold a position that provides access to tens of millions in annual contract opportunities.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
              <MetricCard value="$99.6B" label="Total Gov't Procurement" subtitle="83,453 contracts" delay={0} />
              <MetricCard value="$2.64M" label="NT Digital Marketing Panel" subtitle="36-month contract" delay={0.1} />
              <MetricCard value="$203K" label="Panel Member Value" subtitle="Per agency" delay={0.2} />
              <MetricCard value="$1.37M" label="Defence Advertising" subtitle="TBWA contract" delay={0.3} />
            </div>

            <p className="mb-6 text-white font-semibold text-lg">
              Realistic Contract Examples We Can Win
            </p>
            <p className="mb-6">
              <strong>Northern Territory Digital Marketing Panel (2024):</strong><br/>
              36-month panel contract worth $2.64M across 9 agencies. Each panel member receives ~$203K in work. Small to medium agencies (including woman-owned and Territory enterprises) were awarded contracts alongside larger firms. This is exactly our size and capability.
            </p>
            <p className="mb-6">
              <strong>Department of Infrastructure Advertising (2023-24):</strong><br/>
              TBWA Melbourne awarded $1.37M contract for advertising services. Mid-size agency securing meaningful government work—directly comparable to our scale.
            </p>
            <p className="mb-6">
              <strong>Defence Force Recruitment Campaign (2025-2029):</strong><br/>
              4-year contract with 2-year extension option for creative advertising, digital services, website development, and system support. Total value not disclosed but represents significant long-term revenue for the winning agency.
            </p>
            <p className="mb-6 text-white font-semibold text-lg">
              Aspirational Large-Scale Contracts
            </p>
            <p className="mb-6">
              <strong>NSW Government Media Buying (2022-2025):</strong><br/>
              Omnicom Media Group (OMD) was awarded the 3-year media services contract covering all NSW Government agencies. Total advertising spend: $131.5M in 2022-23 alone. Individual campaigns ranged from $800K to $3.1M.
            </p>
            <p className="mb-6">
              While contracts of this scale require significant team capacity, they demonstrate the long-term potential. A single $500K-$1M contract would 3-5x our current revenue—and these opportunities exist at federal, state, and local levels.
            </p>
            <p className="text-white font-semibold">We're already approved. We just need the team capacity to bid, win, and deliver.</p>
          </>
        }
      />

        {/* Section 4D — Combined Market Opportunity */}
        <ContentSection
          heading="Combined Market Opportunity"
          animationStyle="glitch"
          body={
          <>
            <StatBlock
              title="Serviceable Obtainable Market by 2030"
              stats={[
                { value: "$60M", label: "Commercial Clients", description: "100-120 integrated services" },
                { value: "$40M", label: "Cross-Border", description: "20-30 international expansion" },
                { value: "$20M", label: "Government", description: "3-5 approved contracts" },
                { value: "0.14%", label: "TAM Penetration", description: "Conservative & achievable" }
              ]}
            />

            <p className="my-16 text-white text-xl">
              Three massive markets. One integrated platform. Unlimited upside.
            </p>
            
            <AnimatedBarChart 
              title="Market Size Breakdown"
              data={[
                { label: "Global Marketing Services (TAM)", value: 640, color: "#ffffff" },
                { label: "Cross-Border Marketing (SAM)", value: 85, color: "#cccccc" },
                { label: "Australian Government (Annual)", value: 0.5, color: "#999999" }
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <MetricCard value="$640B" label="Global TAM" subtitle="4-6% annual growth" delay={0} />
              <MetricCard value="$85B" label="Cross-Border SAM" subtitle="12% annual growth" delay={0.1} />
              <MetricCard value="$120M" label="Our 5-Year Target" subtitle="0.14% penetration" delay={0.2} />
            </div>
            
            <StatBlock
              title="Key Market Drivers"
              stats={[
                { value: "68%", label: "Reassessing Partners", description: "Marketing leaders in 2024" },
                { value: "48%", label: "Delivery Failures", description: "Top firing reason" },
                { value: "18%", label: "Cross-Border Growth", description: "Annual e-commerce increase" },
                { value: "$99.6B", label: "Gov't Procurement", description: "83,453 contracts (2023-24)" }
              ]}
            />
            
            <AnimatedDonutChart
              title="Why Clients Fire Agencies (2024)"
              data={[
                { label: "Delivery Issues", value: 48, color: "#ffffff" },
                { label: "Cost/Value Concerns", value: 25, color: "#cccccc" },
                { label: "Strategy Misalignment", value: 15, color: "#999999" },
                { label: "Other Reasons", value: 12, color: "#666666" }
              ]}
            />
          </>
        }
      />

        {/* Section 4E — Australian Market Deep Dive */}
        <ContentSection
          heading="Australian Market Context"
          animationStyle="wave"
          body={
          <>
            <p className="mb-16">
              Australia represents a strategic operational base with significant advantages for international expansion. The local market provides immediate revenue opportunities while serving as a launchpad for broader Asia-Pacific and cross-border operations.
            </p>

            <StatBlock
              title="Australian Agency Market (2024-25)"
              stats={[
                { value: "$3.9B", label: "Total Market Size", description: "Advertising agencies" },
                { value: "$3.7B", label: "Digital Segment", description: "Growing at 7.4% annually" },
                { value: "9,512", label: "Total Agencies", description: "19,423 employees" },
                { value: "$15.6B", label: "Internet Ad Spend", description: "9.7% YoY growth" }
              ]}
            />

            <p className="my-16">
              The Australian advertising market is undergoing consolidation and digital transformation. Traditional media continues to decline while digital and online advertising accelerates. Agencies are increasingly adopting AI-driven optimization and pursuing mergers to strengthen capabilities. This creates opportunity for integrated platforms that can deliver modern solutions without the overhead of legacy holding company structures.
            </p>

            <AnimatedBarChart 
              title="Australian Creative Market Breakdown"
              data={[
                { label: "Total Advertising Market", value: 3.9, suffix: "B AUD", color: "#ffffff" },
                { label: "Digital Advertising Segment", value: 3.7, suffix: "B AUD", color: "#cccccc" },
                { label: "Internet Ad Spend (Total)", value: 15.6, suffix: "B AUD", color: "#999999" }
              ]}
            />

            <p className="my-16 text-white text-xl">
              <span className="font-semibold">fiveroses</span> enters this market with modern infrastructure, international capabilities, and none of the legacy constraints holding back traditional agencies. The path to capturing meaningful market share is clear.
            </p>
          </>
        }
      />

        {/* Section 5A — The Problem: Fragmentation Tax */}
        <ContentSection
          heading="Crisis 1: The Fragmentation Tax"
          animationStyle="wave"
          body={
          <>
            <p className="mb-6 text-white font-semibold">
              Modern brands face three interconnected crises. First: fragmentation.
            </p>
            <p className="mb-12 text-white text-xl">
              To execute a single integrated campaign, brands typically engage 5-8 separate vendors:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">Creative Agency</div>
                  <div className="text-lg font-light text-white/90">$50K-200K</div>
                </div>
                <p className="text-sm text-white/60 font-light">Concepts and brand strategy</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">Production House</div>
                  <div className="text-lg font-light text-white/90">$30K-150K</div>
                </div>
                <p className="text-sm text-white/60 font-light">Video and content creation</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">Media Buying Agency</div>
                  <div className="text-lg font-light text-white/90">$20K-100K</div>
                </div>
                <p className="text-sm text-white/60 font-light">+ 10-15% commission on media spend</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">Tech Agency</div>
                  <div className="text-lg font-light text-white/90">$40K-200K</div>
                </div>
                <p className="text-sm text-white/60 font-light">Website and app development</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">Social Media Team</div>
                  <div className="text-lg font-light text-white/90">$10K-40K/mo</div>
                </div>
                <p className="text-sm text-white/60 font-light">Community management</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">PR Firm</div>
                  <div className="text-lg font-light text-white/90">$15K-50K/mo</div>
                </div>
                <p className="text-sm text-white/60 font-light">Media relations</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-light text-white">Consultants</div>
                  <div className="text-lg font-light text-white/90">$200-600/hr</div>
                </div>
                <p className="text-sm text-white/60 font-light">To coordinate everyone else</p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <MetricCard value="$300K-800K" label="Total Campaign Cost" subtitle="Multi-vendor fragmentation" delay={0} />
              <MetricCard value="4-8 months" label="Time to Launch" subtitle="vs. 6-8 weeks integrated" delay={0.1} />
            </div>

            <p className="mb-6 text-white font-semibold text-lg">
              This fragmentation creates four critical problems:
            </p>
            <p className="mb-6">
              <strong>1. Inefficiency (The Time Tax):</strong><br/>
              Average project timeline is 4-6 months due to handoffs between vendors. Each handoff introduces 15-20% time overhead. A creative brief takes 2 weeks to travel from strategy → creative → production → media → tech. By the time it reaches the final vendor, market conditions have changed. Each handoff increases error rates by 23% (PMI, 2024).
            </p>
            <p className="mb-6">
              <strong>2. Cost Inflation (The Margin Stack):</strong><br/>
              Brands pay 30-40% markup for coordination overhead. Multiple vendors mean multiple margins stacking on top of each other. Example: A $100K media buy becomes $115K after agency commission, then $125K after holding company margin, then $135K after coordination overhead. Total cost inflation: 35-50% vs. integrated delivery.
            </p>
            <p className="mb-6">
              <strong>3. Quality Degradation (The Telephone Game):</strong><br/>
              Creative vision gets diluted through translation between teams. The original strategic insight gets lost in translation. 67% of CMOs report final execution doesn't match original creative intent (Gartner CMO Survey, 2024). The brand message that started as "bold and disruptive" becomes "safe and forgettable" by the time it reaches market.
            </p>
            <p className="mb-6">
              <strong>4. Accountability Gaps (The Blame Game):</strong><br/>
              When campaigns underperform, vendors blame each other. Creative says media didn't target correctly. Media says creative wasn't compelling. Tech says the landing page wasn't optimized. No single party owns end-to-end outcomes. The brand is left holding the bag with no clear path to improvement.
            </p>
            
            <ComparisonTable />
          </>
        }
      />

        {/* Section 5B — The Problem: Cultural Blindness */}
        <ContentSection
          heading="Crisis 2: Cultural Blindness"
          animationStyle="perspective"
          body={
          <>
            <p className="mb-6">
              The fragmentation problem is bad enough in a single market. It becomes catastrophic when brands attempt cross-border expansion between East and West.
            </p>
            <p className="mb-6">
              <strong>Western Brands Entering China (85% Failure Rate):</strong><br/>
              Western agencies don't understand Chinese platforms, consumer behavior, or regulatory requirements. They create campaigns optimized for Facebook and Google—platforms that don't exist in China. They don't know how to navigate WeChat's ecosystem, Xiaohongshu's community dynamics, or Douyin's content algorithms. They don't understand guanxi (relationships), mianzi (face), or the importance of Singles' Day vs. Black Friday.
            </p>
            <p className="mb-6">
              Real example: A major Australian retail brand spent $2.4M on a China entry campaign managed by a Sydney agency. The campaign used Instagram-style content on Xiaohongshu, Western influencer tactics, and direct-response copy that violated platform guidelines. Result: Account banned within 3 weeks, zero sales, total loss.
            </p>
            <p className="mb-6">
              <strong>Chinese Brands Entering Western Markets (40-60% Failure Rate):</strong><br/>
              Chinese agencies understand Douyin and Xiaohongshu, but they struggle with Western brand standards, regulatory compliance, and long-term reputation building. They create campaigns that feel foreign, inauthentic, or overly promotional. They don't understand Western consumer skepticism, privacy concerns, or the importance of organic community building.
            </p>
            <p className="mb-6">
              Real example: A Chinese consumer electronics brand entered Australia with aggressive promotional messaging and paid influencer campaigns that felt inauthentic. Western consumers perceived the brand as "cheap" and "untrustworthy" despite superior product quality. Sales were 70% below projections in first year.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <MetricCard value="85%" label="Western Brands Fail" subtitle="In China market" delay={0} />
              <MetricCard value="40-60%" label="Chinese Brands Fail" subtitle="In Western markets" delay={0.1} />
            </div>
          </>
        }
      />

        {/* Section 5C — The Problem: Accountability Vacuum */}
        <ContentSection
          heading="Crisis 3: The Accountability Vacuum"
          animationStyle="scatter"
          body={
          <>
            <p className="mb-12 text-white text-xl">
              When you work with 5-8 vendors, nobody owns the outcome. Everyone optimizes for their piece:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10 border-l-4 border-l-red-500/50"
              >
                <div className="text-xl font-light text-white mb-3">Creative Agencies</div>
                <div className="text-sm text-white/60 font-light mb-2">Optimize For:</div>
                <div className="text-lg font-light text-white/90">Awards & Portfolio Pieces</div>
                <div className="text-sm text-white/70 font-light mt-2">Not sales or business outcomes</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10 border-l-4 border-l-red-500/50"
              >
                <div className="text-xl font-light text-white mb-3">Media Buyers</div>
                <div className="text-sm text-white/60 font-light mb-2">Optimize For:</div>
                <div className="text-lg font-light text-white/90">Spend Volume</div>
                <div className="text-sm text-white/50 font-light mt-2">10-15% commission incentivizes higher spend</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10 border-l-4 border-l-red-500/50"
              >
                <div className="text-xl font-light text-white mb-3">Tech Agencies</div>
                <div className="text-sm text-white/60 font-light mb-2">Optimize For:</div>
                <div className="text-lg font-light text-white/90">Complexity & Billable Hours</div>
                <div className="text-sm text-white/50 font-light mt-2">Not user experience or simplicity</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10 border-l-4 border-l-red-500/50"
              >
                <div className="text-xl font-light text-white mb-3">Consultancies</div>
                <div className="text-sm text-white/60 font-light mb-2">Optimize For:</div>
                <div className="text-lg font-light text-white/90">Engagement Extensions</div>
                <div className="text-sm text-white/50 font-light mt-2">Not solutions or completion</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-white/5 rounded-xl border border-white/10 border-l-4 border-l-red-500/50"
              >
                <div className="text-xl font-light text-white mb-3">PR Firms</div>
                <div className="text-sm text-white/60 font-light mb-2">Optimize For:</div>
                <div className="text-lg font-light text-white/90">Media Mentions</div>
                <div className="text-sm text-white/50 font-light mt-2">Not business impact or brand perception</div>
              </motion.div>
            </div>

            <div className="p-10 bg-gradient-to-br from-red-500/10 to-white/5 rounded-2xl border border-red-500/20 mb-16">
              <p className="text-white text-xl text-center">
                Nobody optimizes for what actually matters: customer acquisition cost, lifetime value, revenue growth, market share, and return on marketing investment.
              </p>
            </div>
            <p className="text-white font-semibold">
              The result: Brands spend more, wait longer, and get less. Marketing becomes a cost center instead of a growth engine.
            </p>
          </>
        }
      />

        {/* Section 5D — The Solution */}
        <ContentSection
          heading="Our Solution: Integration + Cultural Fluency + Accountability"
          animationStyle="glitch"
          body={
          <>
            <p className="mb-6">
              We solve all three crises simultaneously:
            </p>
            <p className="mb-4">
              <strong>1. We integrate the entire value chain</strong> under one roof, one team, one accountability structure. No handoffs. No margin stacking. No telephone game. Strategy → Creative → Media → Tech → Content flows seamlessly with one unified vision. Timeline: 6-8 weeks instead of 4-6 months. Cost: 40-50% lower than multi-vendor approach.
            </p>
            <p className="mb-4">
              <strong>2. We operate fluently in both markets.</strong> Western platforms (Meta, Google, TikTok, LinkedIn) and Chinese platforms (WeChat, Xiaohongshu, Douyin, Weibo, Baidu, Taobao). Western consumer psychology and Chinese consumer behavior. Western regulatory requirements (GDPR, ACCC, FTC) and Chinese compliance frameworks (CAC, MIIT). We don't translate—we transcreate with cultural authenticity.
            </p>
            <p className="mb-4">
              <strong>3. We own the outcome.</strong> One partner. One contract. One team responsible for results. We get paid when you grow. When campaigns underperform, we fix them—no finger-pointing, no excuses, no additional fees. Our success is directly tied to your success.
            </p>
            <p className="text-white font-semibold">We don't just solve the problem. We eliminate it entirely.</p>
          </>
        }
      />

        {/* Section 6 — Our Solution: The Integrated Platform */}
        <ContentSection
          heading="Our Solution: The Integrated Platform"
          animationStyle="perspective"
          body={
          <>
            <p className="text-white text-2xl mb-16">
              <span className="font-semibold">fiveroses</span> delivers five core capabilities, integrated across both Western and Chinese markets.
            </p>

            <CapabilitiesGrid />

            <StatBlock
              title="The Integration Advantage"
              stats={[
                { value: "40-60%", label: "Faster", description: "6-8 weeks vs 4-6 months" },
                { value: "30-50%", label: "Cheaper", description: "No margin stacking" },
                { value: "100%", label: "Accountable", description: "Single point of contact" },
                { value: "2x", label: "Markets", description: "Simultaneous execution" }
              ]}
            />

            <p className="text-white text-xl mt-16">
              Unlike traditional agencies that excel in one area and outsource the rest, we deliver all five capabilities internally across both markets. Creative vision remains intact from concept to execution. We enable rapid iteration based on real-time data. We deliver culturally authentic execution in both markets simultaneously.
            </p>

            <p className="text-white text-xl mt-12">
              We don't sell campaigns. We build growth infrastructure that works across borders.
            </p>
          </>
        }
      />

        {/* Section 7 — Competitive Landscape */}
        <ContentSection
          heading="Competitive Landscape"
          animationStyle="scatter"
          body={
          <>
            <p className="text-white text-2xl mb-16">
              We compete across four categories, but no competitor offers our integrated cross-border model.
            </p>

            <div className="space-y-8 mb-16">
              {/* Traditional Creative */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="mb-6">
                  <div className="text-2xl font-light text-white mb-2">Traditional Creative Agencies</div>
                  <div className="text-sm text-white/60 font-light">Ogilvy, TBWA, Leo Burnett, DDB, Saatchi & Saatchi</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Strengths</div>
                    <p className="text-sm text-white/80 font-light">Brand heritage, creative awards, large specialized teams, established client relationships, global office networks.</p>
                  </div>
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Critical Gaps</div>
                    <p className="text-sm text-white/80 font-light">40-50% overhead, 6-9 month timelines, no media buying power, no tech capability, zero Chinese platform expertise. Stock prices down 40-60% since 2018. Cross-border capability: essentially zero—offices operate independently.</p>
                  </div>
                </div>
              </motion.div>
              {/* Media Buying */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="mb-6">
                  <div className="text-2xl font-light text-white mb-2">Media Buying Networks</div>
                  <div className="text-sm text-white/60 font-light">GroupM, Omnicom Media, Publicis Media, Dentsu, Havas</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Strengths</div>
                    <p className="text-sm text-white/80 font-light">Massive buying power ($100B+ annual media spend), sophisticated analytics, global reach, deep platform partnerships with Google/Meta.</p>
                  </div>
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Critical Gaps</div>
                    <p className="text-sm text-white/80 font-light">Weak creative, transactional relationships, optimized for spend volume (not outcomes), no tech capability, limited Chinese social platform expertise. Cross-border capability: can place ads, can't create culturally authentic content.</p>
                  </div>
                </div>
              </motion.div>
              {/* Digital Agencies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="mb-6">
                  <div className="text-2xl font-light text-white mb-2">Digital Agencies</div>
                  <div className="text-sm text-white/60 font-light">R/GA, Huge, Akqa, Instrument, Work & Co</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Strengths</div>
                    <p className="text-sm text-white/80 font-light">Strong tech and UX capabilities, modern culture, innovative thinking, emerging tech expertise.</p>
                  </div>
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Critical Gaps</div>
                    <p className="text-sm text-white/80 font-light">Digital only (no traditional media), extremely expensive ($200-350/hr, $500K minimums), concentrated in major metros, no media buying, zero Chinese expertise. Cross-border capability: none.</p>
                  </div>
                </div>
              </motion.div>
              {/* Consultancies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="mb-6">
                  <div className="text-2xl font-light text-white mb-2">Management Consultancies</div>
                  <div className="text-sm text-white/60 font-light">McKinsey, BCG, Bain, Deloitte Digital, Accenture Interactive</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Strengths</div>
                    <p className="text-sm text-white/80 font-light">Strategic thinking, C-suite access, research capabilities, global resources, massive budgets.</p>
                  </div>
                  <div>
                    <div className="text-sm uppercase text-white/60 mb-3 font-light tracking-wider">Critical Gaps</div>
                    <p className="text-sm text-white/80 font-light">Don't execute creative, no media buying, extremely expensive ($400-800/hr, $2M minimums), slow (12-18 months), limited creative understanding, enterprise-only focus. Cross-border capability: strategy only, no execution.</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="my-16 p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-light text-white mb-10 text-center">The Gap in the Market</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                <div className="p-6 bg-black/20 rounded-xl text-center">
                  <div className="text-lg font-light text-white/80 mb-2">Traditional Agencies</div>
                  <div className="text-xs text-red-400/80 mt-2">Can't do media or tech</div>
                </div>
                <div className="p-6 bg-black/20 rounded-xl text-center">
                  <div className="text-lg font-light text-white/80 mb-2">Media Buyers</div>
                  <div className="text-xs text-red-400/80 mt-2">Can't do creative or tech</div>
                </div>
                <div className="p-6 bg-black/20 rounded-xl text-center">
                  <div className="text-lg font-light text-white/80 mb-2">Digital Agencies</div>
                  <div className="text-xs text-red-400/80 mt-2">Can't do media buying</div>
                </div>
                <div className="p-6 bg-black/20 rounded-xl text-center">
                  <div className="text-lg font-light text-white/80 mb-2">Consultancies</div>
                  <div className="text-xs text-red-400/80 mt-2">Can't execute anything</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-500/20 to-white/10 rounded-xl text-center border-2 border-green-500/30">
                  <div className="text-lg font-light text-white mb-2">fiveroses</div>
                  <div className="text-xs text-green-400/90 mt-2">Does it all, both markets</div>
                </div>
              </div>
              <p className="text-center text-white/90 text-lg">
                We deliver strategy + creative + media + tech + content as a unified service across both Western and Chinese markets at 40-60% lower cost with 50% faster timelines and single-point accountability.
              </p>
            </div>

            <div className="mb-16 p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-light text-white mb-10">The Moat: Why This Is Defensible</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Cultural Fluency</div>
                  <p className="text-sm text-white/70 font-light">Cannot be hired or trained. Requires lived experience across markets over years.</p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Platform Expertise</div>
                  <p className="text-sm text-white/70 font-light">Takes years to develop. You can't learn Xiaohongshu from a tutorial.</p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Media Relationships</div>
                  <p className="text-sm text-white/70 font-light">3-5 years to establish. We already have them.</p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Government Approval</div>
                  <p className="text-sm text-white/70 font-light">12-18 months to achieve. We already have it.</p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Integrated Structure</div>
                  <p className="text-sm text-white/70 font-light">Difficult to replicate. Requires cross-functional team with rare skill combinations.</p>
                </div>
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Client Switching Costs</div>
                  <p className="text-sm text-white/70 font-light">Once integrated into operations, replacing us means rebuilding entire systems.</p>
                </div>
              </div>
            </div>

            <p className="text-white text-xl">
              We're not competing for their clients. We're replacing their entire model.
            </p>
          </>
        }
      />

        {/* Section 8 — The Founder */}
        <ContentSection
          heading="Founder-led by design"
          animationStyle="typewriter"
          body={
          <>
            <p className="mb-6">
              <span className="font-semibold">fiveroses</span> is founded by a globally experienced operator with more than a decade of experience across marketing, media, and technology.
            </p>
            <p className="mb-6">
              Born in China and raised in Montreal, the founder developed a global perspective early. Professional experience spans New York and Australia, working across industries including real estate, technology, automotive, hospitality, retail, entertainment, and government.
            </p>
            <p className="mb-6">
              Across this career, the founder has been directly involved in the planning, execution, and management of over one billion dollars in lifetime marketing and media activity, working with major brands, platforms, and media organisations.
            </p>
            <p className="mb-3">This is not a creative experimenting with business.</p>
            <p className="text-white font-semibold">This is an operator building a company.</p>
          </>
        }
      />

        {/* Section 9 — Business Model & Unit Economics */}
        <ContentSection
          heading="Business Model & Unit Economics"
          animationStyle="splitReveal"
          body={
          <>
            <p className="mb-6 text-white font-semibold">
              Revenue Model: Retainer + Project Mix
            </p>
            <p className="mb-6">
              <strong>Monthly Retainers (Target: 70% of revenue)</strong><br/>
              Recurring monthly engagements ranging from $8K-$50K/month. Clients receive dedicated team allocation, priority access, and integrated services. Average client lifetime: 18-24 months. This provides predictable revenue and allows for strategic planning.
            </p>
            <p className="mb-6">
              <strong>Project-Based Work (Target: 30% of revenue)</strong><br/>
              One-time engagements for brand launches, campaigns, or platform builds. Project values range from $25K-$200K. Higher margins (45-55%) but less predictable. Serves as pipeline for retainer conversion.
            </p>
            <p className="mb-6 text-white font-semibold">
              Pricing Strategy
            </p>
            <p className="mb-6">
              Our blended rate is $150-180/hour, positioned 30-40% below traditional agencies ($220-280/hr) while maintaining healthy margins through operational efficiency. We compete on value, not price—clients pay less and get more.
            </p>
            <p className="mb-6 text-white font-semibold">
              Unit Economics (per client)
            </p>
            <p className="mb-4">
              Average Contract Value (ACV): $180,000/year<br/>
              Customer Acquisition Cost (CAC): $12,000<br/>
              Gross Margin: 65%<br/>
              Customer Lifetime Value (LTV): $324,000 (18-month average)<br/>
              LTV:CAC Ratio: 27:1<br/>
              Payback Period: 2.1 months
            </p>
            <p className="mb-6">
              These are exceptional SaaS-like economics for a services business. Our integrated model allows us to serve clients more efficiently while capturing more value per relationship.
            </p>
            <p className="text-white font-semibold">The business model is proven. Now we scale it.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-12">
              <MetricCard value="27:1" label="LTV:CAC Ratio" subtitle="SaaS-like economics" delay={0} />
              <MetricCard value="2.1 mo" label="Payback Period" subtitle="Rapid recovery" delay={0.1} />
              <MetricCard value="65%" label="Gross Margin" subtitle="Highly profitable" delay={0.2} />
            </div>
          </>
        }
      />

        {/* Section 10 — Financial Projections */}
        <ContentSection
          heading="Financial Projections"
          animationStyle="glitch"
          body={
          <>
            <TimelineBlock
              title="5-Year Growth Trajectory"
              items={[
                { year: "Year 1", revenue: "AUD $180,000", team: "1 + contractors", clients: "3 active clients", margin: "Break-even" },
                { year: "Year 2", revenue: "AUD $750,000", team: "4 full-time", clients: "12-15 clients", margin: "10%" },
                { year: "Year 3", revenue: "AUD $2,100,000", team: "8 full-time", clients: "30-35 clients", margin: "15%" },
                { year: "Year 4", revenue: "AUD $4,500,000", team: "15 full-time", clients: "60-70 clients", margin: "20%" },
                { year: "Year 5", revenue: "AUD $8,500,000", team: "25 full-time", clients: "100-120 clients", margin: "25%" }
              ]}
            />

            <StatBlock
              title="Key Assumptions"
              stats={[
                { value: "85%", label: "Client Retention", description: "vs 65% industry avg" },
                { value: "12%", label: "Annual Upsell Growth", description: "Per client expansion" },
                { value: "$12K", label: "Stable CAC", description: "Referral-driven" },
                { value: "$2M+", label: "Operating Leverage", description: "Fixed cost dilution" }
              ]}
            />

            <p className="my-16">
              These projections are conservative and achievable. Based on current client demand ($450K pipeline vs $180K revenue), proven unit economics (27:1 LTV:CAC), and industry benchmarks (16% average agency growth). Assumptions: 85% client retention, $60K average client value, steady 12% annual upsell, referral-driven CAC of $12K. No major enterprise contracts, government windfalls, or acquisitions factored in.
            </p>

            <p className="text-white text-xl">
              Path to $8.5M ARR is clear, proven, and conservative.
            </p>
            
            <GrowthChart />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
              <MetricCard value="$180K" label="Year 1 Revenue" subtitle="Current (3 clients)" delay={0} />
              <MetricCard value="$2.1M" label="Year 3 Revenue" subtitle="12x growth" delay={0.1} />
              <MetricCard value="$8.5M" label="Year 5 Revenue" subtitle="47x growth" delay={0.2} />
              <MetricCard value="25%" label="Year 5 EBITDA" subtitle="$2.1M profit" delay={0.3} />
            </div>
          </>
        }
      />

        {/* Section 11 — Go-To-Market Strategy */}
        <ContentSection
          heading="Go-To-Market Strategy"
          animationStyle="wave"
          body={
          <>
            <p className="mb-6 text-white font-semibold">
              Target Customer Profile
            </p>
            <p className="mb-6">
              <strong>Primary: Growth-Stage Companies ($5M-$50M revenue)</strong><br/>
              These companies have proven product-market fit and are scaling rapidly. They need professional marketing infrastructure but can't afford big agency retainers ($50K+/month). They value speed, flexibility, and integrated execution. Examples: SaaS startups, D2C brands, professional services firms.
            </p>
            <p className="mb-6">
              <strong>Secondary: Mid-Market Enterprises ($50M-$500M revenue)</strong><br/>
              Established companies seeking to modernize their marketing approach. Often dissatisfied with incumbent agencies. Value efficiency and measurable outcomes. Examples: Regional retail chains, manufacturing companies, healthcare providers.
            </p>
            <p className="mb-6">
              <strong>Tertiary: Government & Public Sector</strong><br/>
              We're already an approved supplier for Australian state governments. This provides stable, long-term contracts with predictable payment terms. Examples: Tourism boards, economic development agencies, public health campaigns.
            </p>
            <p className="mb-6 text-white font-semibold">
              Acquisition Channels
            </p>
            <p className="mb-4">
              <strong>1. Referral Network (Target: 60% of new clients)</strong><br/>
              Our best clients come from referrals. We systematize this through formal referral programs, case study development, and strategic partnerships with complementary service providers (accountants, lawyers, business consultants).
            </p>
            <p className="mb-4">
              <strong>2. Content Marketing (Target: 25% of new clients)</strong><br/>
              Thought leadership through articles, case studies, and industry insights. We demonstrate expertise before prospects engage. Focus on SEO-optimized content targeting high-intent keywords.
            </p>
            <p className="mb-4">
              <strong>3. Outbound Sales (Target: 15% of new clients)</strong><br/>
              Targeted outreach to ideal customer profiles. Personalized, research-driven approach. Focus on companies showing growth signals (funding announcements, expansion plans, leadership changes).
            </p>
            <p className="mb-6">
              <strong>Sales Cycle:</strong> Average 45-60 days from first contact to signed contract. Discovery call → Proposal → Presentation → Negotiation → Close. We maintain 35% close rate on qualified opportunities.
            </p>
            <p className="text-white font-semibold">We don't chase clients. We attract the right ones.</p>
          </>
        }
      />

        {/* Section 12 — Current Traction */}
        <ContentSection
          heading="Current Traction"
          animationStyle="perspective"
          body={
          <>
            <p className="mb-16 text-white text-xl">
              We're not a concept. We're an operating business with proven demand and clear execution capacity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-light text-white mb-4">3</div>
                <div className="text-lg font-light text-white/90 mb-3">Active Clients</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Current client base generating AUD $180,000 annual run rate. Mix of monthly retainers and project engagements across technology and retail sectors. Average client value: $60K annually.
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-light text-white mb-4">$450K</div>
                <div className="text-lg font-light text-white/90 mb-3">Qualified Pipeline</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Opportunities in proposal or negotiation stage. Expected close rate: 60% over next 90 days. Represents 2.5x current annual revenue—clear evidence of market demand exceeding current delivery capacity.
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-light text-white mb-4">40+</div>
                <div className="text-lg font-light text-white/90 mb-3">Projects Delivered</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Across brand identity, website development, media campaigns, content production, and strategic consulting. Work spans multiple industries and markets, demonstrating operational capability and execution quality.
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-light text-white mb-4">Approved</div>
                <div className="text-lg font-light text-white/90 mb-3">Government Supplier</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Registered with Australian state governments. Eligible to bid on contracts ranging from $50K to $20M+. One of only ~6,000 approved ad/marketing agencies—status took 12-18 months to achieve, creating significant barrier to entry.
                </p>
              </div>
            </div>

            <p className="text-white text-xl mb-8">
              The constraint isn't demand. It's delivery capacity.
            </p>
            <p className="mb-16">
              We're currently turning away 2-3 qualified opportunities per month due to team bandwidth. Every hire unlocks $200K-300K in additional annual revenue. This is a capacity problem, not a market problem. Direct buying relationships with major Australian media owners provide 15-25% better rates than brands can negotiate independently.
            </p>
            <p className="text-white text-xl">
              The business works. Now we scale it.
            </p>
          </>
        }
      />

        {/* Section 13 — Use of Funds */}
        <ContentSection
          heading="Use of Funds"
          animationStyle="splitReveal"
          body={
          <>
            <p className="text-white text-2xl mb-16">
              Seeking: AUD $500,000 - $750,000
            </p>

            <AnimatedDonutChart
              title="Capital Allocation"
              data={[
                { label: "Team Expansion", value: 52, color: "#ffffff" },
                { label: "Tech & Infrastructure", value: 20, color: "#cccccc" },
                { label: "Marketing & BD", value: 18, color: "#999999" },
                { label: "Operations & Runway", value: 10, color: "#666666" }
              ]}
            />

            <p className="my-16">
              Every dollar is allocated to revenue-generating activities with clear ROI. Based on $750K raise: $390K for team (52%), $150K for tech and infrastructure (20%), $135K for marketing and business development (18%), and $75K for operations and runway buffer (10%). This capital accelerates our path from $180K to $750K+ ARR within 18-24 months—not through speculation, but through hiring capacity to service existing proven demand.
            </p>

            <div className="mb-16 p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-light text-white mb-10 tracking-wide">Team Expansion (52% — $390K total for 4 hires)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 bg-black/20 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xl font-light text-white">Senior Digital Marketing Manager</div>
                    <div className="text-lg font-light text-white/90">$105K + equity</div>
                  </div>
                  <p className="text-sm text-white/70 font-light">Manages digital campaigns across platforms, oversees paid media execution, analyzes performance data. Unlocks $250K+ annual revenue capacity.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 bg-black/20 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xl font-light text-white">Senior Media Strategist</div>
                    <div className="text-lg font-light text-white/90">$95K + equity</div>
                  </div>
                  <p className="text-sm text-white/70 font-light">Manages media buying, campaign optimization. Unlocks $220K+ annual revenue capacity.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 bg-black/20 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xl font-light text-white">Full-Stack Developer</div>
                    <div className="text-lg font-light text-white/90">$100K + equity</div>
                  </div>
                  <p className="text-sm text-white/70 font-light">Builds client platforms, internal tools. Unlocks $240K+ annual revenue capacity.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 bg-black/20 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xl font-light text-white">Account Director</div>
                    <div className="text-lg font-light text-white/90">$90K + equity</div>
                  </div>
                  <p className="text-sm text-white/70 font-light">Client management, business development. Unlocks $210K+ annual revenue capacity.</p>
                </motion.div>
              </div>
              <p className="mt-8 text-sm text-white/70 font-light text-center">
                Total team salaries: $390K annually. Each hire unlocks $210-250K in annual revenue capacity. Team of 5-6 can service 15-20 clients simultaneously.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-light text-white mb-4">Tech & Infrastructure</div>
                <div className="text-xl font-light text-white/90 mb-6">20% — $100K-150K</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Project management tools, design software licenses, media buying platforms, CRM systems, cloud infrastructure, analytics dashboards, AI automation tools.
                </p>
              </div>

              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-light text-white mb-4">Marketing & BD</div>
                <div className="text-xl font-light text-white/90 mb-6">18% — $90K-135K</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Website enhancement, case study production, portfolio development, industry events, outbound sales tools, brand partnerships, referral programs, client acquisition campaigns.
                </p>
              </div>

              <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-light text-white mb-4">Operations & Runway</div>
                <div className="text-xl font-light text-white/90 mb-6">10% — $50K-75K</div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Working capital, legal and accounting, compliance, insurance, workspace, contingency buffer for unexpected costs or slower-than-expected revenue ramp.
                </p>
              </div>
            </div>

            <StatBlock
              title="Expected Outcomes (18 Months Post-Investment)"
              stats={[
                { value: "$750K", label: "ARR Target", description: "4x current revenue" },
                { value: "12-15", label: "Active Clients", description: "From 3 currently" },
                { value: "5-6", label: "Team Members", description: "Full-time + specialists" },
                { value: "10-15%", label: "EBITDA Margin", description: "Path to profitability" }
              ]}
            />

            <p className="text-white text-xl mt-16">
              This isn't growth capital. It's acceleration capital. The demand exists. The pipeline is proven ($450K qualified). We're hiring the team to deliver.
            </p>
          </>
        }
      />

        {/* Section 14 — Risks & Mitigation */}
        <ContentSection
          heading="Risks & Mitigation"
          animationStyle="glitch"
          body={
          <>
            <p className="mb-6 text-white font-semibold">
              Every business has risks. We acknowledge ours and have mitigation strategies.
            </p>
            <p className="mb-6">
              <strong>Risk 1: Key Person Dependency</strong><br/>
              Current business relies heavily on founder. Loss of founder would significantly impact operations.<br/>
              <em>Mitigation:</em> First hires are senior leaders who can operate independently. Building documented processes and systems. Founder succession plan in place.
            </p>
            <p className="mb-6">
              <strong>Risk 2: Client Concentration</strong><br/>
              Top 3 clients represent 45% of current revenue. Loss of major client would impact cash flow.<br/>
              <em>Mitigation:</em> Actively diversifying client base. No single client will exceed 15% of revenue by Year 2. Building long-term contracts with staggered renewal dates.
            </p>
            <p className="mb-6">
              <strong>Risk 3: Talent Acquisition & Retention</strong><br/>
              Competition for creative and technical talent is intense. Wrong hires could slow growth.<br/>
              <em>Mitigation:</em> Competitive compensation including equity. Strong culture and mission. Thorough vetting process with trial projects. Building talent pipeline before urgent need.
            </p>
            <p className="mb-6">
              <strong>Risk 4: Market Downturn</strong><br/>
              Economic recession typically reduces marketing budgets. Revenue could decline 20-30%.<br/>
              <em>Mitigation:</em> Focus on ROI-driven services that prove value. Government contracts provide stability. Diverse client base across industries. Maintain 6-month cash runway.
            </p>
            <p className="mb-6">
              <strong>Risk 5: Competitive Response</strong><br/>
              Larger agencies could copy our integrated model or acquire competitors.<br/>
              <em>Mitigation:</em> Speed is our advantage. Build deep client relationships. Develop proprietary technology. Focus on mid-market where big agencies struggle to compete profitably.
            </p>
            <p className="text-white font-semibold">We don't avoid risks. We manage them proactively.</p>
          </>
        }
      />

        {/* Section 15 — Why Now */}
        <ContentSection
          heading="Why Now"
          animationStyle="wave"
          body={
          <>
            <p className="mb-16 text-white text-xl">
              Three macro trends create unprecedented opportunity for integrated marketing platforms.
            </p>

            <div className="mb-16 p-10 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-light text-white mb-8 tracking-wide">1. The Great Unbundling of Agencies</h3>
              <p className="mb-6">
                Traditional holding companies (WPP, Omnicom, Publicis, IPG) are struggling. Stock prices down 40-60% from 2018 peaks. 68% of marketing leaders are reassessing agency partnerships. They're actively seeking alternatives to bureaucracy, slow execution, and misaligned incentives.
              </p>
              <StatBlock
                stats={[
                  { value: "40-60%", label: "Stock Price Decline", description: "Major holdings since 2018" },
                  { value: "68%", label: "Reassessing", description: "Marketing leaders" },
                  { value: "48%", label: "Delivery Issues", description: "Top complaint" },
                  { value: "Consolidating", label: "Client Trend", description: "Fewer, better partners", valueSize: "text-2xl md:text-3xl" }
                ]}
              />
            </div>

            <div className="mb-16 p-10 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-light text-white mb-8 tracking-wide">2. Technology Enables Integration</h3>
              <p className="mb-6">
                Modern tools allow small teams to operate like large agencies. 77% of agencies have adopted AI. Cloud infrastructure, AI assistance, and automation multiply individual productivity. A team of 6 today can deliver what required 20 people five years ago.
              </p>
              <StatBlock
                stats={[
                  { value: "77%", label: "AI Adoption", description: "Marketing agencies in 2024" },
                  { value: "56.4%", label: "Underutilization", description: "Martech stack usage" },
                  { value: "3-5 Years", label: "Tool Lifespan", description: "Before replacement" },
                  { value: "86%", label: "Expect Growth", description: "Further AI adoption" }
                ]}
              />
            </div>

            <div className="mb-16 p-10 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-light text-white mb-8 tracking-wide">3. Brands Demand Accountability</h3>
              <p className="mb-6">
                CMOs are under pressure to prove ROI. Marketing budgets are scrutinized like never before. Brands want partners who own outcomes, not vendors who execute tasks. Single-point accountability is the new requirement. Average client relationships last 2-5 years—retention is everything.
              </p>
              <StatBlock
                stats={[
                  { value: "2-5 Years", label: "Avg Relationship", description: "Client retention span" },
                  { value: "60%", label: "Annual Audits", description: "CMOs reviewing tech stack" },
                  { value: "61%", label: "Cost Focus", description: "Top eval factor (up from 37%)" },
                  { value: "Single-Point", label: "Accountability", description: "What clients demand" }
                ]}
              />
            </div>

            <p className="text-white text-xl">
              The market is shifting. The technology is ready. The demand is proven. The window is open. This is the moment to build.
            </p>
          </>
        }
      />

        {/* Section 16 — AI: The Intelligence Advantage */}
        <ContentSection
          heading="AI: The Intelligence Advantage"
          animationStyle="scatter"
          body={
          <>
            <p className="text-white text-2xl mb-16">
              AI isn't replacing human creativity. It's amplifying human intelligence—enabling deeper research, better insights, and smarter decisions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <MetricCard value="90%" label="Marketers Using AI" subtitle="Up from 35% in 2023" delay={0} highlight />
              <MetricCard value="80%" label="Exceeded ROI" subtitle="AI tools in 2024" delay={0.1} highlight />
              <MetricCard value="$107.5B" label="AI Marketing Market" subtitle="By 2028 (36.6% CAGR)" delay={0.2} highlight />
            </div>

            <AnimatedBarChart 
              title="AI Impact on Marketing Performance (2024)"
              data={[
                { label: "Higher Productivity", value: 44, suffix: "%", color: "#ffffff" },
                { label: "Weekly Hours Saved", value: 11, suffix: " hrs", color: "#cccccc" },
                { label: "Increase in Sales Productivity", value: 6.2, suffix: "%", color: "#bbbbbb" },
                { label: "Increase in Customer Satisfaction", value: 7, suffix: "%", color: "#aaaaaa" },
                { label: "Decrease in Marketing Overhead", value: 7.2, suffix: "%", color: "#999999" }
              ]}
            />

            <p className="my-16">
              The data is clear: agencies that leverage AI strategically report 60% greater revenue growth than peers. But adoption alone isn't enough—only 17% of marketing professionals have received comprehensive AI training, creating a dangerous gap between tool usage and actual expertise. Most agencies use AI to automate. <span className="font-semibold">fiveroses</span> uses AI to think.
            </p>

            <div className="mb-16 p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-light text-white mb-10 tracking-wide">How <span className="font-semibold">fiveroses</span> Uses AI to Amplify Human Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Deep Consumer & Market Research</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    AI analyzes thousands of social media conversations, reviews, forums, and competitor activity across both Western and Chinese platforms simultaneously. Identifies emerging trends, consumer pain points, cultural shifts, and competitive positioning in hours instead of weeks. Human strategists interpret findings and translate them into actionable insights. AI surfaces the data; humans create the strategy.
                  </p>
                </div>

                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Cross-Platform Intelligence & Pattern Recognition</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    AI monitors campaign performance across Meta, Google, TikTok, Xiaohongshu, WeChat, and Douyin simultaneously, identifying patterns that human analysts would miss. Detects which creative themes resonate in specific markets, which formats drive engagement, and where budget should shift. Humans make the final call; AI provides the evidence.
                  </p>
                </div>

                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Predictive Audience Modeling</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    AI builds detailed audience profiles by analyzing behavioral data, platform activity, purchase patterns, and content consumption across markets. Predicts which segments are most likely to convert, what messaging will resonate, and when to reach them. Human creatives use these insights to craft campaigns that connect emotionally—not just algorithmically.
                  </p>
                </div>

                <div className="p-6 bg-black/20 rounded-xl">
                  <div className="text-xl font-light text-white mb-3">Competitive Intelligence at Scale</div>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    AI tracks competitor activity across all channels in real-time: ad spend, creative formats, messaging themes, platform strategies, and audience engagement. Identifies gaps in their positioning and opportunities for differentiation. Human strategists turn this intelligence into competitive advantage. AI watches the market; humans outsmart it.
                  </p>
                </div>
              </div>
            </div>

            <StatBlock
              title="The AI Advantage for Integrated Agencies"
              stats={[
                { value: "10x", label: "Research Speed", description: "Market & consumer insights" },
                { value: "7 platforms", label: "Simultaneous Analysis", description: "Western & Chinese" },
                { value: "15-20%", label: "Media Efficiency", description: "Data-driven optimization" },
                { value: "60%", label: "Revenue Growth", description: "Strategic AI users vs peers" }
              ]}
            />

            <p className="text-white text-xl mt-16">
              AI doesn't replace human expertise—it makes humans smarter, faster, and more informed. While competitors use AI to automate tasks, <span className="font-semibold">fiveroses</span> uses AI to unlock insights. We don't replace strategists with algorithms. We give strategists superpowers.
            </p>
          </>
        }
      />

        {/* Section 17 — Investment Thesis */}
        <ContentSection
          heading="Investment Thesis"
          animationStyle="perspective"
          body={
          <>
            <p className="mb-6 text-white font-semibold">
              Why <span className="font-semibold">fiveroses</span> is a compelling investment opportunity:
            </p>
            <p className="mb-6">
              <strong>1. Large, Growing, Fragmented Market</strong><br/>
              $640B global market with 4-6% annual growth. No dominant player in integrated services. Massive opportunity for consolidation and innovation.
            </p>
            <p className="mb-6">
              <strong>2. Proven Business Model</strong><br/>
              Already generating revenue with strong unit economics (LTV:CAC of 27:1). Not a concept—an operating business with paying clients and proven demand.
            </p>
            <p className="mb-6">
              <strong>3. Exceptional Market-Company Fit</strong><br/>
              <span className="font-semibold">fiveroses</span> brings 10+ years operational experience across marketing, media, and tech. Direct experience managing significant marketing spend across Western and Chinese markets. Deep understanding of both creative and business sides. Not a startup learning—an operating business scaling.
            </p>
            <p className="mb-6">
              <strong>4. Clear Path to Scale</strong><br/>
              Not dependent on breakthrough innovation or market creation. Simply need to execute proven playbook: hire team, serve clients, deliver results, grow through referrals. Path from $180K to $10M is clear and achievable.
            </p>
            <p className="mb-6">
              <strong>5. Multiple Exit Opportunities</strong><br/>
              Strategic acquirers include: holding companies seeking innovation, PE firms rolling up agencies, technology companies adding services, or independent growth to profitability. Market comps show 3-6x revenue multiples for profitable agencies.
            </p>
            <p className="mb-6">
              <strong>6. Defensible Competitive Advantages</strong><br/>
              Integrated model is difficult to replicate. Requires expertise across five disciplines. Client relationships create switching costs. Government approvals take 12-18 months to obtain. Media relationships take years to build.
            </p>
            <p className="mb-6">
              <strong>7. Capital Efficient Growth</strong><br/>
              Services businesses are capital efficient. Revenue scales with team, not infrastructure. Gross margins of 65-70% provide cash for reinvestment. Can reach profitability without additional capital if needed.
            </p>
            <p className="mb-6 text-white font-semibold">
              Investment Returns Scenario
            </p>
            <p className="mb-4">
              <strong>Base Case (70% probability):</strong><br/>
              $750K investment → $10M valuation in 5 years → 13.3x return<br/>
              Exit via strategic acquisition or PE buyout
            </p>
            <p className="mb-4">
              <strong>Bull Case (20% probability):</strong><br/>
              $750K investment → $25M valuation in 5 years → 33x return<br/>
              Accelerated growth through enterprise contracts or geographic expansion
            </p>
            <p className="mb-6">
              <strong>Bear Case (10% probability):</strong><br/>
              $750K investment → $3M valuation in 5 years → 4x return<br/>
              Slower growth but still profitable exit
            </p>
            <p className="text-white font-semibold">Strong downside protection. Exceptional upside potential.</p>
          </>
        }
      />

        {/* Section 18 — Closing */}
        <ClosingSection />
      </div>
    </main>
  )
}

// Opening Section - EXPLOSIVE CHARACTER REVEAL (FIXED)
function OpeningSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  const words = ["Most", "brands", "need", "5", "agencies.", "The", "best", "partner", "with", "one."]
  
  // Pre-calculate random values for each character
  const randomValues = useMemo(() => {
    const values: { x: number; y: number; rotate: number }[] = []
    words.forEach(word => {
      word.split('').forEach(() => {
        values.push({
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 150,
          rotate: (Math.random() - 0.5) * 60
        })
      })
    })
    return values
  }, [words.length])

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y }}
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 py-24 relative"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Main Headline - CHARACTER BY CHARACTER WITH WORD WRAPPING */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] tracking-[-0.04em] mb-12 text-white">
          {words.map((word, wordIndex) => {
            let charOffset = 0
            for (let i = 0; i < wordIndex; i++) {
              charOffset += words[i].length
            }
            
            return (
              <span key={wordIndex} className="inline-block mr-[0.2em] whitespace-nowrap">
                {word.split('').map((char, charIndex) => {
                  const globalIndex = charOffset + charIndex
                  const { x, y, rotate } = randomValues[globalIndex]
                  
                  return (
                    <motion.span
                      key={charIndex}
                      initial={{ 
                        opacity: 0,
                        x,
                        y,
                        rotate,
                        scale: 0
                      }}
                      animate={{ 
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1
                      }}
                      transition={{
                        duration: 0.7,
                        delay: globalIndex * 0.015,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  )
                })}
              </span>
            )
          })}
          {" "}
          <span className="inline-block whitespace-nowrap" style={{ fontSize: "1.7em" }}>
            {"fiveroses.".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ 
                  opacity: 0,
                }}
                animate={{ 
                  opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1, 0.5, 1],
                }}
                transition={{
                  opacity: {
                    duration: 0.4,
                    delay: words.join('').length * 0.015 + (i * 0.03),
                  },
                }}
                className="inline-block"
              >
                <motion.span
                  animate={{
                    opacity: [1, 0.3, 1, 0.5, 1, 0.4, 1],
                  }}
                  transition={{
                    duration: 4.5 + (i * 0.3),
                    delay: words.join('').length * 0.015 + (i * 0.03) + 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 font-light leading-[1.4] tracking-[-0.02em] max-w-5xl"
        >
          Strategy. Creative. Media. Tech. Content. One partner.
        </motion.p>
      </div>
    </motion.section>
  )
}

// Content Section - CREATIVE ANIMATIONS
function ContentSection({ 
  heading, 
  body,
  animationStyle = "splitReveal"
}: { 
  heading: string; 
  body: React.ReactNode;
  animationStyle?: "splitReveal" | "glitch" | "wave" | "perspective" | "scatter" | "typewriter";
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const renderHeading = () => {
    const words = heading.split(' ')
    
    switch(animationStyle) {
      case "splitReveal":
        // Split from center - LEFT ALIGNED
        return (
          <div className="flex flex-wrap overflow-hidden">
            {words.map((word, i) => {
              const isLeftHalf = i < words.length / 2
              return (
                <div key={i} className="overflow-hidden mr-[0.25em]">
                  <motion.span
                    initial={{ x: isLeftHalf ? -200 : 200, opacity: 0 }}
                    animate={{ x: isInView ? 0 : (isLeftHalf ? -200 : 200), opacity: isInView ? 1 : 0 }}
                    transition={{
                      duration: 0.6,
                      delay: Math.abs(i - words.length / 2) * 0.04,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </div>
              )
            })}
          </div>
        )
      
      case "glitch":
        // Glitch effect - MORE VISIBLE
        return (
          <div className="flex flex-wrap overflow-hidden">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden mr-[0.25em]">
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? {
                    opacity: 1,
                    y: [50, -15, 8, -5, 0],
                    x: [0, -8, 5, -3, 0],
                  } : { opacity: 0, y: 50 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.04,
                    ease: "easeOut"
                  }}
                  className="block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        )
      
      case "wave":
        // Wave effect - MORE DRAMATIC
        return (
          <div className="flex flex-wrap overflow-hidden">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden mr-[0.25em]">
                <motion.span
                  initial={{ y: "120%", rotate: 15 }}
                  animate={{ 
                    y: isInView ? "0%" : "120%",
                    rotate: isInView ? 0 : 15
                  }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        )
      
      case "perspective":
        // 3D perspective flip - MORE VISIBLE
        return (
          <div className="flex flex-wrap overflow-hidden" style={{ perspective: "1000px" }}>
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden mr-[0.25em]">
                <motion.span
                  initial={{ rotateX: 90, opacity: 0, y: 50 }}
                  animate={{ 
                    rotateX: isInView ? 0 : 90, 
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 50
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{
                    display: "block",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        )
      
      case "scatter":
        // Scatter and gather - OPTIMIZED
        return (
          <div className="flex flex-wrap">
            {words.map((word, i) => {
              const randomX = (Math.random() - 0.5) * 300
              const randomY = (Math.random() - 0.5) * 200
              const randomRotate = (Math.random() - 0.5) * 60
              
              return (
                <motion.span
                  key={i}
                  initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0 }}
                  animate={{ 
                    x: isInView ? 0 : randomX, 
                    y: isInView ? 0 : randomY, 
                    rotate: isInView ? 0 : randomRotate,
                    opacity: isInView ? 1 : 0
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.03,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              )
            })}
          </div>
        )
      
      case "typewriter":
        // Typewriter effect - MORE VISIBLE WITH CURSOR
        return (
          <div className="flex flex-wrap">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: isInView ? 1 : 0,
                  width: isInView ? "auto" : 0
                }}
                transition={{
                  duration: 0.15,
                  delay: i * 0.08,
                  ease: "linear"
                }}
                className="mr-[0.25em] inline-block overflow-hidden"
              >
                {word}
              </motion.span>
            ))}
          </div>
        )
      
      default:
        return heading
    }
  }

  return (
    <motion.section
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 py-24 relative"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white mb-16">
          {renderHeading()}
        </h2>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl font-light text-white/80 leading-[1.75] tracking-wide max-w-5xl [&_p]:mb-8 [&_strong]:font-normal [&_strong]:text-white/95 [&_.text-white]:!font-normal [&_.font-semibold]:!font-normal [&_.font-bold]:!font-normal [&_.fiveroses-brand]:font-semibold [&_.fiveroses-brand]:text-white"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {body}
        </motion.div>
      </div>
    </motion.section>
  )
}

// Closing Section - EXPLOSIVE CHARACTER FINALE (FIXED)
function ClosingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const words = ["Less", "noise.", "Less", "complexity.", "More", "growth."]
  
  // Pre-calculate random values for each character
  const randomValues = useMemo(() => {
    const values: { x: number; y: number; rotate: number }[] = []
    words.forEach(word => {
      word.split('').forEach(() => {
        values.push({
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          rotate: (Math.random() - 0.5) * 60
        })
      })
    })
    return values
  }, [words.length])

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 py-24 relative mb-32 z-20"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Closing Statement - CHARACTER BY CHARACTER WITH WORD WRAPPING */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] tracking-[-0.04em] text-white">
          {words.map((word, wordIndex) => {
            let charOffset = 0
            for (let i = 0; i < wordIndex; i++) {
              charOffset += words[i].length
            }
            
            return (
              <React.Fragment key={wordIndex}>
                <span className="inline-block mr-[0.2em] whitespace-nowrap">
                  {word.split('').map((char, charIndex) => {
                    const globalIndex = charOffset + charIndex
                    const { x, y, rotate } = randomValues[globalIndex]
                    
                    return (
                      <motion.span
                        key={charIndex}
                        initial={{ 
                          x,
                          y,
                          rotate,
                          opacity: 0,
                          scale: 0
                        }}
                        whileInView={{ 
                          x: 0,
                          y: 0,
                          rotate: 0,
                          opacity: 1,
                          scale: 1
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.8,
                          delay: globalIndex * 0.008,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </span>
                {word === "noise." && <br />}
              </React.Fragment>
            )
          })}
          {" "}
          <span className="inline-block whitespace-nowrap relative" style={{ fontSize: "1.5em" }}>
            {"fiveroses.".split('').map((char, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.span
                  key={i}
                  initial={{ 
                    opacity: 0,
                    x: isEven ? -100 : 100,
                    rotateY: isEven ? -90 : 90,
                  }}
                  whileInView={{ 
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 1,
                    delay: words.join('').length * 0.008 + (i * 0.06),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    display: "inline-block"
                  }}
                >
                  <motion.span
                    animate={{
                      x: [0, isEven ? -3 : 3, 0, isEven ? -2 : 2, 0],
                      rotateZ: [0, isEven ? -2 : 2, 0, isEven ? -1 : 1, 0],
                    }}
                    transition={{
                      duration: 4 + (i * 0.2),
                      delay: words.join('').length * 0.008 + (i * 0.06) + 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </motion.span>
              )
            })}
          </span>
        </h2>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover="hover"
            className="group min-h-[44px] text-lg md:text-xl text-white/80 hover:text-white active:text-white/90 inline-flex items-center gap-3 transition-colors duration-300 touch-manipulation px-2 py-2"
          >
            <motion.span 
              className="relative inline-block"
              variants={{
                hover: {
                  backgroundSize: "100% 2px"
                }
              }}
              style={{
                background: "linear-gradient(currentColor, currentColor) no-repeat 0 100%",
                backgroundSize: "0% 2px",
                transition: "background-size 0.3s ease-out"
              }}
            >
              Register Your Interest
            </motion.span>
            <motion.div
              variants={{
                hover: {
                  x: 5,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }
              }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Investor Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-black border border-white/20 p-10 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light leading-none transition-colors"
            >
              ×
            </button>

            {/* Modal Content */}
            {!isSubmitted ? (
              <>
                <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Let's Talk</h3>
                <p className="text-white/60 font-light mb-10 text-lg">Share your details and we'll be in touch within 24 hours.</p>
              </>
            ) : (
              <>
                <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Thank You</h3>
                <p className="text-white/60 font-light mb-10 text-lg">We'll be in touch within 24 hours.</p>
              </>
            )}

            {!isSubmitted ? (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault()
                  setIsSubmitting(true)
                  
                  const formData = new FormData(e.currentTarget)
                  const data = Object.fromEntries(formData.entries())
                  
                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        firstName: String(data.name || ''),
                        lastName: '',
                        email: String(data.email || ''),
                        jobTitle: `Investor - ${String(data.interest || '')}`,
                        company: String(data.organization || ''),
                        location: String(data.phone || ''),
                        market: String(data.range || 'Not specified'),
                        comment: `Investment Interest: ${String(data.interest || '')}\nInvestment Range: ${String(data.range || 'Not specified')}\n\nMessage:\n${String(data.message || '')}`
                      }),
                    })

                    if (!response.ok) {
                      const errorData = await response.text()
                      console.error('API Error:', errorData)
                      throw new Error('Failed to send message')
                    }

                    setIsSubmitted(true)
                    setTimeout(() => {
                      setIsModalOpen(false)
                      setIsSubmitted(false)
                      setIsSubmitting(false)
                    }, 3000)
                  } catch (error) {
                    console.error('Form submission error:', error)
                    setIsSubmitting(false)
                    alert('Failed to send message. Please try again.')
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="+61 400 000 000"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Company or Fund Name"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Investment Interest *</label>
                  <select
                    name="interest"
                    required
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors"
                  >
                    <option value="" className="bg-black">Select an option</option>
                    <option value="Seed Round ($500K-$750K)" className="bg-black">Seed Round ($500K-$750K)</option>
                    <option value="Strategic Partnership" className="bg-black">Strategic Partnership</option>
                    <option value="Advisory Role" className="bg-black">Advisory Role</option>
                    <option value="Other" className="bg-black">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Investment Range (Optional)</label>
                  <input
                    type="text"
                    name="range"
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="e.g., $50K-$100K"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-light mb-2 text-sm tracking-wide uppercase">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white font-light focus:outline-none focus:border-white/40 transition-colors resize-none"
                    placeholder="Tell us about your interest in fiveroses..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-white text-black py-4 text-lg font-light tracking-wide hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-white/80 font-light text-center">Thank you for your interest. We'll be in touch soon.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default function ProtectedInvestorsPage() {
  return (
    <PasswordProtect password="Pitch2026" storageKey="investors-access">
      <PartnersPage />
    </PasswordProtect>
  )
}
