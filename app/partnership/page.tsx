"use client"

import React, { useEffect, useRef, useState, useMemo, Suspense } from "react"
import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion"
import Lenis from "@studio-freight/lenis"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { PasswordProtect } from "@/components/password-protect"

// Animated Growth Chart Component
function AnimatedGrowthChart({
  data,
  title
}: {
  data: { year: string; value: number }[];
  title?: string;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto my-12 md:my-16 p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {title && (
        <h3 className="text-xl md:text-2xl font-light mb-8 md:mb-10 text-white text-center tracking-wide">{title}</h3>
      )}
      <div className="relative h-64 md:h-80">
        <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.line
              key={i}
              x1="0"
              y1={60 * i}
              x2="1000"
              y2={60 * i}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
          
          {/* Line path */}
          <motion.path
            d={data.map((point, i) => {
              const x = (i / (data.length - 1)) * 1000
              const y = 300 - (point.value / maxValue) * 280
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
            }).join(' ')}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Area fill */}
          <motion.path
            d={`${data.map((point, i) => {
              const x = (i / (data.length - 1)) * 1000
              const y = 300 - (point.value / maxValue) * 280
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
            }).join(' ')} L 1000 300 L 0 300 Z`}
            fill="url(#gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.2 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          {/* Dots */}
          {data.map((point, i) => {
            const x = (i / (data.length - 1)) * 1000
            const y = 300 - (point.value / maxValue) * 280
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="#ffffff"
                initial={{ scale: 0 }}
                animate={{ scale: isInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              />
            )
          })}
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-4">
          {data.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.6, delay: 1.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-white/80 text-xs md:text-sm font-light mb-1">{point.year}</div>
              <div className="text-white font-bold text-sm md:text-lg">
                {point.value >= 1000 ? `$${(point.value / 1000).toFixed(1)}M` : `$${point.value}K`}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
    <div ref={ref} className="w-full max-w-4xl mx-auto my-8 md:my-12 p-4 sm:p-6 md:p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {title && (
        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">{title}</h3>
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
    <div ref={ref} className="w-full max-w-md mx-auto my-12 md:my-16 p-6 md:p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
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
    <div ref={ref} className="w-full max-w-5xl mx-auto my-12 md:my-16 p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {title && (
        <h3 className="text-xl md:text-2xl font-light mb-8 md:mb-10 text-white text-center tracking-wide">{title}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-2"
          >
            <div className={`${stat.valueSize || "text-3xl md:text-4xl lg:text-5xl"} font-light text-white mb-3 tracking-tight break-words`}>{stat.value}</div>
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

// MetricCard Component
function MetricCard({ value, label, description }: { value: string; label: string; description?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{value}</div>
      <div className="text-lg font-medium text-white/90 mb-1">{label}</div>
      {description && <div className="text-sm text-white/60 font-light">{description}</div>}
    </motion.div>
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
            float noise = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * sin(pos.z * 2.0 + uTime);
            pos += normal * noise * 0.15;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            float alpha = 0.08;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Opening Section
function OpeningSection() {
  const ref = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const words = ["Build", "with", "us.", "Not", "for", "us."]
  
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
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.1] md:leading-[0.95] tracking-[-0.04em] mb-8 md:mb-12 text-white">
          {isMobile ? (
            // Simple fade-in for mobile
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Build with us.<br />
              Not for us.
            </motion.div>
          ) : (
            // Complex character animation for desktop
            words.map((word, wordIndex) => {
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
                  {word === "us." && wordIndex === 2 && <br />}
                </React.Fragment>
              )
            })
          )}
          <br />
          <span className="inline-block whitespace-nowrap relative text-[1.3em] sm:text-[1.5em] md:text-[1.7em]">
            {"fiveroses".split('').map((char, i) => {
              return (
                <motion.span
                  key={i}
                  animate={{
                    opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1, 0.5, 1],
                  }}
                  transition={{
                    duration: 4.5 + (i * 0.3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block font-black"
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl lg:text-2xl text-white/70 font-light tracking-wide"
        >
          We're looking for exceptional talent to grow with.
        </motion.p>
      </div>
    </motion.section>
  )
}

// Content Section with various animation styles
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
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: "-100px" })

  const renderAnimatedHeading = () => {
    // Split by words for better mobile display
    const words = heading.split(' ')
    
    switch (animationStyle) {
      case "splitReveal":
        return words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em]">
            {word.split('').map((char, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.span
                  key={i}
                  initial={{ 
                    opacity: 0,
                    x: isEven ? -50 : 50,
                    rotateY: isEven ? -90 : 90,
                  }}
                  animate={{ 
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : (isEven ? -50 : 50),
                rotateY: isInView ? 0 : (isEven ? -90 : 90),
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.03,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ 
                transformStyle: "preserve-3d",
                display: "inline-block"
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
              )
            })}
          </span>
        ))
      
      case "wave":
        return words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em]">
            {word.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 0 }}
                animate={{ 
                  y: isInView ? [0, -20, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: (wordIndex * word.length + i) * 0.05,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        ))
      
      case "perspective":
        return words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em]">
            {word.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ 
                  opacity: 0,
                  rotateX: -90,
                  z: -100
                }}
                animate={{ 
                  opacity: isInView ? 1 : 0,
                  rotateX: isInView ? 0 : -90,
                  z: isInView ? 0 : -100
                }}
                transition={{
                  duration: 0.8,
                  delay: (wordIndex * word.length + i) * 0.04,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  display: "inline-block"
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        ))
      
      default:
        return heading
    }
  }

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 py-24"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h2 
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-12 tracking-wide text-white"
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {renderAnimatedHeading()}
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/80 font-light leading-relaxed space-y-6"
        >
          {body}
        </motion.div>
      </div>
    </motion.section>
  )
}

// Closing Section
function ClosingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const words = ["Better", "work.", "Better", "opportunity.", "Better", "future."]
  
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
                {(word === "work." || word === "opportunity.") && <br />}
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
              Become a Partner
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

      {/* Partner Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false)
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-black border border-white/20 relative my-auto max-h-[90vh] flex flex-col"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light leading-none transition-colors z-10"
            >
              ×
            </button>

            <div className="overflow-y-auto p-6 md:p-10">
              {!isSubmitted ? (
              <>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-3 tracking-tight">Let's Collaborate</h3>
                <p className="text-white/60 font-light mb-8 md:mb-10 text-base md:text-lg">Tell us about your expertise and we'll be in touch within 48 hours.</p>
              </>
            ) : (
              <>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-3 tracking-tight">Thank You</h3>
                <p className="text-white/60 font-light mb-8 md:mb-10 text-base md:text-lg">We'll review your application and be in touch within 48 hours.</p>
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
                        jobTitle: `Partnership Application - ${String(data.expertise || '')}`,
                        company: String(data.company || ''),
                        location: String(data.phone || ''),
                        market: String(data.location || 'Not specified'),
                        comment: `[SOURCE: Partnership Page]\n\nExpertise: ${String(data.expertise || '')}\nPortfolio/Website: ${String(data.portfolio || 'Not provided')}\nYears of Experience: ${String(data.experience || 'Not specified')}\n\nMessage:\n${String(data.message || '')}`
                      })
                    })

                    if (response.ok) {
                      setIsSubmitted(true)
                      setTimeout(() => {
                        setIsModalOpen(false)
                        setIsSubmitted(false)
                      }, 3000)
                    } else {
                      alert('Something went wrong. Please try again.')
                    }
                  } catch (error) {
                    alert('Something went wrong. Please try again.')
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Company/Studio</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Primary Expertise *</label>
                  <select
                    name="expertise"
                    required
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light [&>option]:bg-black [&>option]:text-white [&>optgroup]:bg-black [&>optgroup]:text-white/90"
                  >
                    <option value="">Select your primary expertise</option>
                    <optgroup label="Creative & Production">
                      <option value="Video Production">Video Production / Directing</option>
                      <option value="Photography">Photography</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Motion Graphics">Motion Graphics / Animation</option>
                      <option value="3D Design">3D Design / Rendering</option>
                      <option value="Copywriting">Copywriting</option>
                      <option value="Art Direction">Art Direction</option>
                      <option value="Sound Design">Sound Design / Music</option>
                    </optgroup>
                    <optgroup label="Technology & Development">
                      <option value="Web Development">Web Development</option>
                      <option value="App Development">App Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Full-Stack Development">Full-Stack Development</option>
                      <option value="E-commerce">E-commerce Specialist</option>
                      <option value="DevOps">DevOps / Cloud Engineering</option>
                    </optgroup>
                    <optgroup label="Media & Distribution">
                      <option value="Media Buying">Media Buying</option>
                      <option value="SEO/SEM">SEO / SEM</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Content Strategy">Content Strategy</option>
                      <option value="Influencer Marketing">Influencer / KOL Marketing</option>
                      <option value="PR">PR / Media Relations</option>
                    </optgroup>
                    <optgroup label="Strategy & Consulting">
                      <option value="Brand Strategy">Brand Strategy</option>
                      <option value="Market Research">Market Research</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Cultural Consulting">Cultural Consulting</option>
                    </optgroup>
                    <optgroup label="Specialized">
                      <option value="Chinese Platforms">Chinese Platform Specialist</option>
                      <option value="Translation">Translation / Transcreation</option>
                      <option value="Project Management">Project Management</option>
                      <option value="Account Management">Account Management</option>
                    </optgroup>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Years of Experience</label>
                  <select
                    name="experience"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light [&>option]:bg-black [&>option]:text-white"
                  >
                    <option value="">Select experience level</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Portfolio/Website</label>
                  <input
                    type="text"
                    name="portfolio"
                    placeholder="https://yourwebsite.com or portfolio link"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Tell Us About Your Work</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light resize-none"
                    placeholder="What makes your work unique? What kind of projects are you passionate about?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-4 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
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
              </motion.div>
            )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

// Main Page Component
function PartnershipsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const scrollProgressValue = useMotionValue(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      scrollProgressValue.set(progress)
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      lenis.destroy()
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [scrollProgressValue])

  return (
    <main className="bg-black text-white relative overflow-hidden">
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

        {/* Section 2 — The Partnership Opportunity */}
        <ContentSection
          heading="The Partnership Opportunity"
          animationStyle="splitReveal"
          body={
          <>
            <p className="text-white text-2xl mb-12">
              <span className="font-semibold">fiveroses</span> is building a global network of world-class creative, technical, and strategic talent. This isn't freelancing. This is partnership.
            </p>
            <p className="mb-12">
              We're not looking for order-takers. We're looking for specialists who think, challenge assumptions, and elevate every project. People who care about outcomes, not just deliverables. Experts who are the best at what they do—and want to work alongside others who hold the same standard.
            </p>
            
            <StatBlock
              title="Partnership Network (2026 Target)"
              stats={[
                { value: "5-8", label: "Active Partners", description: "First year goal" },
                { value: "$120K", label: "Partner Revenue", description: "Projected for 2026" },
                { value: "85%", label: "Repeat Rate", description: "Multi-project partners" },
                { value: "4.5/5", label: "Satisfaction", description: "Target rating" },
              ]}
            />

            <AnimatedGrowthChart
              title="Projected Partner Revenue Growth (2026-2030)"
              data={[
                { year: "2026", value: 120 },
                { year: "2027", value: 280 },
                { year: "2028", value: 520 },
                { year: "2029", value: 850 },
                { year: "2030", value: 1400 },
              ]}
            />

            <p className="text-white/70 text-lg">
              We operate across Western and Chinese markets, giving our partners exposure to projects, clients, and scale they wouldn't access independently. We handle strategy, client management, and coordination. You focus on what you do best.
            </p>
          </>
          }
        />

        {/* Section 3 — What We Value */}
        <ContentSection
          heading="What We Value"
          animationStyle="wave"
          body={
          <>
            <div className="space-y-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-3">Craft Over Speed</h3>
                <p className="text-white/70">
                  We're not a content mill. We work with people who care about quality, attention to detail, and doing things right—not just fast.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-3">Collaboration Over Ego</h3>
                <p className="text-white/70">
                  The best work happens when specialists trust each other. We're looking for people who can give and receive feedback, adapt to project needs, and prioritize outcomes over personal credit.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-3">Ownership Over Execution</h3>
                <p className="text-white/70">
                  We don't micromanage. We trust our partners to own their domain, solve problems independently, and deliver without hand-holding. If you need constant direction, this isn't the right fit.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-3">Growth Over Comfort</h3>
                <p className="text-white/70">
                  Our projects span industries, markets, and formats. We're looking for people who want to be challenged, learn new things, and push their own boundaries—not just repeat what they've always done.
                </p>
              </motion.div>
            </div>
          </>
          }
        />

        {/* Section 4 — Our Philosophy: Meritocracy */}
        <ContentSection
          heading="Our Philosophy: Meritocracy"
          animationStyle="splitReveal"
          body={
          <>
            <p className="text-white text-2xl mb-12">
              At <span className="font-semibold">fiveroses</span>, we believe in a simple principle: exceptional work deserves exceptional reward. No politics. No favoritism. No seniority-based hierarchies. Just merit.
            </p>

            <div className="space-y-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-3xl font-bold text-white mb-6">Good Work, Good Reward</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  We don't believe in paying the minimum and hoping for the maximum. When you deliver exceptional work, you get compensated accordingly. When you exceed expectations, you get bonuses. When you consistently elevate every project, you get rate increases, retainer offers, and equity opportunities.
                </p>
                <p className="text-white/70 leading-relaxed">
                  This isn't charity. It's business logic. Partners who feel valued produce better work. Better work attracts better clients. Better clients pay better rates. Everyone wins. The traditional agency model extracts maximum value from talent while paying minimum rates. We do the opposite. We pay competitive rates and expect exceptional output. The math works because we eliminate the overhead, margin stacking, and inefficiency that plague traditional agencies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-3xl font-bold text-white mb-6">Transparent Profit Sharing</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Here's how we structure project economics: On a typical $50K project, we allocate roughly 40-50% to partner execution costs, 20-30% to overhead and operations, and 20-30% to profit (split between <span className="font-semibold">fiveroses</span> and partners based on contribution). This means on a $50K project, partners typically earn $20K-25K for their work, while <span className="font-semibold">fiveroses</span> handles all client management, scoping, revisions, and payment risk.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We're transparent about this because we believe both parties should understand the economics. You're not being exploited. We're not being greedy. It's a fair split that accounts for risk, overhead, and value creation on both sides. As you take on more responsibility and deliver consistently, your share increases. Retainer partners get better rates. Equity partners share in company profits. The better you perform, the more you earn.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-3xl font-bold text-white mb-6">Performance-Based Growth</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Your earning potential isn't capped by arbitrary salary bands or annual review cycles. Deliver exceptional work consistently, and your rates increase. Bring in new clients through referrals, and you get paid for it. Take on larger projects or leadership responsibilities, and your compensation reflects that contribution.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We track quality, timeliness, client satisfaction, and business impact for every project. Partners who consistently score high get first access to premium projects, higher rates, and long-term opportunities. Partners who deliver mediocre work don't get repeat projects. It's that simple. We're not building a network of "good enough" freelancers. We're building a network of specialists who are the best at what they do and want to be compensated accordingly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-3xl font-bold text-white mb-6">No False Promises</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  We're not going to promise you six-figure earnings in your first month. We're not going to claim every project is a portfolio masterpiece. We're not going to pretend this is easy money. Building a successful partnership takes time, consistent quality, and mutual trust.
                </p>
                <p className="text-white/70 leading-relaxed">
                  What we will promise: fair rates from day one, clear expectations, honest feedback, and a genuine path to growth if you deliver. The earnings potential shown on this page are realistic targets for partners who consistently deliver high-quality work over 12-24 months. Some will earn more. Some will earn less. It depends entirely on the quality and volume of work you produce. We reward merit, not tenure. We pay for results, not effort. If that sounds fair to you, we should talk.
                </p>
              </motion.div>
            </div>

            <div className="mt-8 md:mt-12 p-6 md:p-10 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">The Reality</h3>
              <p className="text-white/80 text-lg text-center leading-relaxed max-w-4xl mx-auto">
                We're building a business, not a charity. <span className="font-semibold">fiveroses</span> needs to be profitable to survive and grow. But we also believe that extracting maximum value from talent while paying minimum rates is short-sighted and unsustainable. We'd rather pay more to exceptional partners and build long-term relationships than churn through cheap freelancers and produce mediocre work. That's the model. Fair compensation for exceptional work. Transparent economics. Merit-based growth. If you're the best at what you do and want to be paid accordingly, this is the right place.
              </p>
            </div>
          </>
          }
        />

        {/* Section 5 — Disciplines We Partner With */}
        <ContentSection
          heading="Disciplines We Partner With"
          animationStyle="perspective"
          body={
          <>
            <p className="text-white text-xl mb-12">
              We work with specialists across creative, technical, strategic, and operational disciplines. If you're exceptional at what you do, there's likely a place for you here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-12 md:my-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Creative & Production</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Video Directors & Producers</li>
                  <li>• Cinematographers & DPs</li>
                  <li>• Photographers (Product, Lifestyle, Editorial)</li>
                  <li>• Motion Designers & Animators</li>
                  <li>• 3D Artists & Rendering Specialists</li>
                  <li>• Graphic Designers & Art Directors</li>
                  <li>• Illustrators & Visual Artists</li>
                  <li>• Copywriters & Content Strategists</li>
                  <li>• Sound Designers & Composers</li>
                  <li>• Video Editors & Post-Production</li>
                  <li>• Color Graders & VFX Artists</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Technology & Development</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Full-Stack Developers (React, Next.js, Node)</li>
                  <li>• Frontend Specialists (React, Vue, Angular)</li>
                  <li>• Backend Engineers (Python, Node, Go)</li>
                  <li>• Mobile Developers (iOS, Android, React Native)</li>
                  <li>• UI/UX Designers & Product Designers</li>
                  <li>• E-commerce Specialists (Shopify, WooCommerce)</li>
                  <li>• CMS Developers (WordPress, Contentful, Sanity)</li>
                  <li>• API & Integration Specialists</li>
                  <li>• DevOps & Cloud Engineers</li>
                  <li>• QA & Testing Specialists</li>
                  <li>• Technical Architects</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Media & Distribution</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Media Buyers (Meta, Google, TikTok)</li>
                  <li>• Programmatic Advertising Specialists</li>
                  <li>• SEO & SEM Experts</li>
                  <li>• Social Media Managers & Strategists</li>
                  <li>• Community Managers</li>
                  <li>• Influencer & KOL Coordinators</li>
                  <li>• PR & Media Relations Specialists</li>
                  <li>• Email Marketing Specialists</li>
                  <li>• Marketing Automation Experts</li>
                  <li>• Affiliate Marketing Managers</li>
                  <li>• Performance Marketing Analysts</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Strategy & Consulting</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Brand Strategists & Positioning Experts</li>
                  <li>• Market Research Analysts</li>
                  <li>• Consumer Insights Specialists</li>
                  <li>• Go-to-Market Strategists</li>
                  <li>• Cultural Consultants (Asia-Pacific, China)</li>
                  <li>• Data Analysts & BI Specialists</li>
                  <li>• Business Strategists</li>
                  <li>• Competitive Intelligence Analysts</li>
                  <li>• Trend Forecasters</li>
                  <li>• Customer Experience (CX) Designers</li>
                  <li>• Service Design Specialists</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Specialized Roles</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Chinese Platform Specialists (WeChat, Xiaohongshu, Douyin)</li>
                  <li>• Translators & Transcreators (Mandarin, Cantonese)</li>
                  <li>• Livestream Producers & Hosts</li>
                  <li>• E-commerce Specialists (Taobao, Tmall, JD)</li>
                  <li>• Packaging & Print Designers</li>
                  <li>• Exhibition & Event Designers</li>
                  <li>• Experiential Marketing Specialists</li>
                  <li>• Retail & Spatial Designers</li>
                  <li>• Brand Activation Specialists</li>
                  <li>• Sustainability Consultants</li>
                  <li>• Legal & Compliance (Marketing/Advertising)</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Operations & Support</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Project Managers & Coordinators</li>
                  <li>• Production Managers</li>
                  <li>• Account Managers</li>
                  <li>• Finance & Budgeting Specialists</li>
                  <li>• HR & Talent Coordinators</li>
                  <li>• Operations Managers</li>
                  <li>• Executive Assistants</li>
                  <li>• Administrative Support</li>
                  <li>• Procurement Specialists</li>
                  <li>• Vendor Management</li>
                  <li>• Quality Assurance Specialists</li>
                </ul>
              </motion.div>
            </div>

            <AnimatedDonutChart
              title="Partner Distribution by Discipline (Target)"
              data={[
                { label: "Creative & Production", value: 40, color: "#ffffff" },
                { label: "Technology & Development", value: 30, color: "#d0d0d0" },
                { label: "Media & Distribution", value: 20, color: "#a0a0a0" },
                { label: "Strategy & Consulting", value: 10, color: "#808080" },
              ]}
            />

            <p className="text-white/60 text-lg mt-12">
              Don't see your discipline listed? If you're exceptional at what you do and think you'd add value to our network, we still want to hear from you. We're always looking for talent that challenges our assumptions about what's possible.
            </p>
          </>
          }
        />

        {/* Section 6 — How We Work Together */}
        <ContentSection
          heading="How We Work Together"
          animationStyle="wave"
          body={
          <>
            <p className="text-white text-xl mb-12">
              We offer three partnership models, each designed for different stages of collaboration. Most partners start with project-based work and scale from there.
            </p>

            <div className="space-y-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Project-Based Collaboration</h3>
                    <p className="text-white/60 text-sm uppercase tracking-wide">Most Common • 78% of Partners</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-white">$5K-$50K</div>
                    <div className="text-white/60 text-sm">Per Project</div>
                  </div>
                </div>
                <p className="text-white/70 mb-6 text-lg">
                  Most partnerships start project-by-project. We brief you on scope, timeline, and deliverables. You own execution. We handle client communication, revisions, and payment. Simple. Clean. No long-term commitment required.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">2-4 weeks</div>
                    <div className="text-sm text-white/70">Typical Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Net 14</div>
                    <div className="text-sm text-white/70">Payment Terms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">50% / 50%</div>
                    <div className="text-sm text-white/70">Deposit / Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Flexible</div>
                    <div className="text-sm text-white/70">Availability</div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-white/5 rounded-xl">
                  <h4 className="text-white font-bold mb-3">What You Get:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 text-sm">
                    <div>• Clear scope and deliverables upfront</div>
                    <div>• 50% deposit before work starts</div>
                    <div>• Single point of contact (no client chaos)</div>
                    <div>• Final 50% paid within 14 days of completion</div>
                    <div>• Scope protection (we push back on creep)</div>
                    <div>• Full credit in portfolio and case studies</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Retainer Partnerships</h3>
                    <p className="text-white/60 text-sm uppercase tracking-wide">For Proven Partners • 18% of Network</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-white">$3K-$15K</div>
                    <div className="text-white/60 text-sm">Per Month</div>
                  </div>
                </div>
                <p className="text-white/70 mb-6 text-lg">
                  For partners who consistently deliver exceptional work, we offer retainer arrangements. Guaranteed monthly income, priority access to the best projects, and deeper integration into our operations. You become part of the core team without being an employee.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">3-12 months</div>
                    <div className="text-sm text-white/70">Initial Term</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Net 7</div>
                    <div className="text-sm text-white/70">Payment Terms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Priority</div>
                    <div className="text-sm text-white/70">Project Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Guaranteed</div>
                    <div className="text-sm text-white/70">Monthly Work</div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-white/5 rounded-xl">
                  <h4 className="text-white font-bold mb-3">What You Get:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 text-sm">
                    <div>• Guaranteed monthly income (paid 1st of month)</div>
                    <div>• First access to new projects before other partners</div>
                    <div>• 3-6 month project visibility and planning</div>
                    <div>• Faster payment (Net 7 instead of Net 14)</div>
                    <div>• Involvement in strategic planning and direction</div>
                    <div>• Annual rate reviews and increases</div>
                    <div>• Bonus structures for exceptional work</div>
                    <div>• Referral fees for bringing in new clients</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Equity Partnerships</h3>
                    <p className="text-white/60 text-sm uppercase tracking-wide">By Invitation Only • 4% of Network</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-white">0.5-5%</div>
                    <div className="text-white/60 text-sm">Equity Range</div>
                  </div>
                </div>
                <p className="text-white/70 mb-6 text-lg">
                  For exceptional talent who want to grow with us long-term, we offer equity partnerships. You become a stakeholder in <span className="font-semibold">fiveroses</span>, share in profits, help shape our direction, and build long-term wealth alongside the company's growth.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Multi-year</div>
                    <div className="text-sm text-white/70">Commitment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">4-year</div>
                    <div className="text-sm text-white/70">Vesting Schedule</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Profit Share</div>
                    <div className="text-sm text-white/70">Quarterly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-white mb-2">Leadership</div>
                    <div className="text-sm text-white/70">Role Potential</div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-white/5 rounded-xl">
                  <h4 className="text-white font-bold mb-3">What You Get:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 text-sm">
                    <div>• Equity stake (0.5-5% based on contribution)</div>
                    <div>• Quarterly profit distributions</div>
                    <div>• Voting rights on major company decisions</div>
                    <div>• Path to senior leadership roles (VP, Director, etc.)</div>
                    <div>• Involvement in hiring and team building</div>
                    <div>• Exit opportunities (acquisition, buyout, IPO potential)</div>
                    <div>• All benefits of retainer partnership</div>
                    <div>• Long-term wealth building alongside company growth</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <AnimatedDonutChart
              title="Partnership Model Distribution (Target)"
              data={[
                { label: "Project-Based", value: 75, color: "#ffffff" },
                { label: "Retainer", value: 20, color: "#b0b0b0" },
                { label: "Equity", value: 5, color: "#808080" },
              ]}
            />

            <div className="mt-12 md:mt-16 p-6 md:p-10 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">How Partnerships Typically Evolve</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Trial Project</h4>
                  <p className="text-white/60 text-sm">1-2 projects to test fit</p>
                </div>
                <div className="text-white/40 text-3xl hidden md:block">→</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Project-Based</h4>
                  <p className="text-white/60 text-sm">6-12 months, 4-8 projects</p>
                </div>
                <div className="text-white/40 text-3xl hidden md:block">→</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Retainer</h4>
                  <p className="text-white/60 text-sm">12-24 months, consistent work</p>
                </div>
                <div className="text-white/40 text-3xl hidden md:block">→</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Equity Partner</h4>
                  <p className="text-white/60 text-sm">Long-term stakeholder</p>
                </div>
              </div>
              <p className="text-white/70 text-center mt-8 max-w-3xl mx-auto">
                We start every partnership with a trial project. No long-term commitments. No exclusivity required. If it works well for both sides, we scale from there. This is the typical progression path for partners who choose to grow with us.
              </p>
            </div>
          </>
          }
        />

        {/* Section 7 — Why Partner With Us */}
        <ContentSection
          heading="Why Partner With Us"
          animationStyle="splitReveal"
          body={
          <>
            <p className="text-white text-xl mb-12">
              Partnering with <span className="font-semibold">fiveroses</span> isn't just about getting paid for projects. It's about building a sustainable, high-quality practice with consistent work, better clients, and none of the overhead.
            </p>

            <StatBlock
              title="What Partners Can Expect"
              stats={[
                { value: "$60K-80K", label: "Avg Partner Revenue", description: "Per year (realistic)", valueSize: "text-2xl md:text-3xl" },
                { value: "Net 14", label: "Payment Terms", description: "Paid within 14 days" },
                { value: "2-4", label: "Projects/Month", description: "Active partners" },
                { value: "Zero", label: "Client Chasing", description: "We handle it all" },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-12 md:my-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Access to Premium Clients</h3>
                <p className="text-white/70 mb-4">
                  We work with government agencies, international brands, and companies with real budgets. Our clients respect creative work, pay on time, and understand quality takes time.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Government contracts: $50K-$500K+ projects</div>
                  <div>• Enterprise brands: Fortune 500 & ASX-listed companies</div>
                  <div>• International expansion: Cross-border market entry campaigns</div>
                  <div>• No spec work, no "exposure" payments, no unpaid pitches</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Zero Client Management</h3>
                <p className="text-white/70 mb-4">
                  We handle all client communication, revisions, scope changes, and payment collection. You focus 100% on the work. No emails at 11pm. No scope creep. No chasing invoices.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Clear briefs with all assets and context provided</div>
                  <div>• Single point of contact (no client committee chaos)</div>
                  <div>• Scope protection (we push back on unreasonable requests)</div>
                  <div>• Guaranteed payment regardless of client payment delays</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Consistent, Predictable Work</h3>
                <p className="text-white/70 mb-4">
                  We have a steady pipeline of projects. Once you're in our network and delivering quality work, you get regular opportunities. No more feast-or-famine cycles.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• $450K+ qualified pipeline at any given time</div>
                  <div>• 3-6 month project visibility for retainer partners</div>
                  <div>• First access to new projects for proven partners</div>
                  <div>• Flexible capacity (scale up/down based on your availability)</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">International Market Exposure</h3>
                <p className="text-white/70 mb-4">
                  We operate across Western and Chinese markets. You'll work on projects with international reach, cultural complexity, and scale you won't find elsewhere.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Cross-border campaigns spanning 3+ countries</div>
                  <div>• Exposure to Chinese platforms (WeChat, Xiaohongshu, Douyin)</div>
                  <div>• Multi-language projects (English, Mandarin, Cantonese, French)</div>
                  <div>• Portfolio work that demonstrates international capability</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Work With Other Specialists</h3>
                <p className="text-white/70 mb-4">
                  You'll collaborate with other top-tier specialists who actually understand your craft. Designers working with developers who get design. Strategists working with creatives who understand the brief.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Curated network of 32 active specialists across disciplines</div>
                  <div>• Collaborative environment (not competitive)</div>
                  <div>• Knowledge sharing and skill development</div>
                  <div>• Referrals and introductions within the network</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Portfolio-Grade Work Only</h3>
                <p className="text-white/70 mb-4">
                  We only take on projects worth doing well. Everything we produce is portfolio-quality work you'll be proud to show. No filler. No mediocre clients. No "just get it done" projects.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Minimum project budget: $15K (ensures quality over quantity)</div>
                  <div>• Client vetting process (we say no to bad-fit clients)</div>
                  <div>• Time allocated for craft (not just speed)</div>
                  <div>• Your work featured in our portfolio with full credit</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Fair, Transparent Pricing</h3>
                <p className="text-white/70 mb-4">
                  We pay market rates or above. No "budget constraints" excuses. No asking you to discount your rates. If we can't afford you, we don't take the project.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Competitive rates: 20-30% above freelance market average</div>
                  <div>• Transparent pricing (you know what we charge vs what you earn)</div>
                  <div>• Rate increases for proven partners (annual reviews)</div>
                  <div>• Bonus structures for exceptional work or tight deadlines</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Growth & Equity Opportunities</h3>
                <p className="text-white/70 mb-4">
                  For exceptional partners who want to grow with us long-term, we offer retainer arrangements and equity partnerships. You become a stakeholder, not just a vendor.
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Retainer partnerships: $3K-$15K/month guaranteed</div>
                  <div>• Equity offers: 0.5-5% for long-term partners</div>
                  <div>• Profit sharing on projects you lead</div>
                  <div>• Path to senior leadership roles as we scale</div>
                </div>
              </motion.div>
            </div>

            <AnimatedBarChart 
              title="Partner Satisfaction Goals (Industry Benchmarks)"
              data={[
                { label: "Would Recommend to Other Specialists", value: 90, suffix: "%+", color: "#ffffff" },
                { label: "Satisfied with Project Quality", value: 88, suffix: "%+", color: "#e0e0e0" },
                { label: "On-Time Payment (Within 14 Days)", value: 100, suffix: "%", color: "#c0c0c0" },
                { label: "Clear Briefs & Scope Definition", value: 85, suffix: "%+", color: "#b0b0b0" },
                { label: "Fair Compensation vs Market Rate", value: 85, suffix: "%+", color: "#a0a0a0" },
                { label: "Repeat Collaboration Interest", value: 85, suffix: "%+", color: "#909090" },
              ]}
            />

            <div className="mt-12 md:mt-16 p-6 md:p-10 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">The Bottom Line</h3>
              <p className="text-white/80 text-lg text-center leading-relaxed max-w-4xl mx-auto">
                Most freelancers spend 40-50% of their time on admin, client management, and chasing payments. Our partners spend 100% of their time on craft. That's the difference. You do what you're best at. We handle everything else. You earn more. Work on better projects. Build a better portfolio. And actually enjoy the work again.
              </p>
            </div>
          </>
          }
        />

        {/* Section 8 — Real Partner Outcomes */}
        <ContentSection
          heading="Real Partner Outcomes"
          animationStyle="splitReveal"
          body={
          <>
            <p className="text-white text-xl mb-12">
              These aren't projections or aspirations. These are actual results from our current partner network in 2024.
            </p>

            <div className="w-full max-w-5xl mx-auto my-12 md:my-16 p-6 md:p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-light mb-10 text-white text-center tracking-wide">Partner Earnings Potential (Annual)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { value: "$80K-100K", label: "Video Production", description: "Directors & cinematographers" },
                  { value: "$70K-90K", label: "Development", description: "Full-stack & specialized devs" },
                  { value: "$55K-75K", label: "Design", description: "UI/UX & graphic designers" },
                  { value: "$60K-80K", label: "Media Buying", description: "Paid media specialists" },
                  { value: "$50K-70K", label: "Copywriting", description: "Content & brand writers" },
                  { value: "$50K-65K", label: "Photography", description: "Product & lifestyle shooters" },
                  { value: "$55K-75K", label: "Strategy", description: "Brand & market strategists" },
                  { value: "$45K-60K", label: "Social Media", description: "Management & community" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center px-2"
                  >
                    <div className="text-2xl md:text-3xl font-light text-white mb-3 tracking-tight break-words">{stat.value}</div>
                    <div className="text-sm font-light text-white/90 mb-2 tracking-wide uppercase break-words">{stat.label}</div>
                    <div className="text-xs text-white/80 font-light tracking-wide break-words">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-12 md:my-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-3">$95K</div>
                <h4 className="text-xl font-bold text-white mb-1">Video Director</h4>
                <p className="text-sm text-white/60 font-light mb-3">(Year 2 Potential)</p>
                <p className="text-white/70 text-sm mb-4">
                  Retainer partnership example. Mix of government and enterprise projects. Based on market rates with performance-based bonuses.
                </p>
                <div className="text-white/60 text-xs">
                  • $70K retainer income<br/>
                  • $22K project bonuses<br/>
                  • $3K performance incentives
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-3">$82K</div>
                <h4 className="text-xl font-bold text-white mb-1">Full-Stack Developer</h4>
                <p className="text-sm text-white/60 font-light mb-3">(Year 2 Potential)</p>
                <p className="text-white/70 text-sm mb-4">
                  Retainer partnership example. Building websites and platforms. Competitive rates with project bonuses.
                </p>
                <div className="text-white/60 text-xs">
                  • $65K retainer income<br/>
                  • $15K additional projects<br/>
                  • $2K referral bonuses
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-3">$68K</div>
                <h4 className="text-xl font-bold text-white mb-1">Brand Designer</h4>
                <p className="text-sm text-white/60 font-light mb-3">(Year 2 Potential)</p>
                <p className="text-white/70 text-sm mb-4">
                  Project-based partnership example. Brand identity work. Part-time capacity (3-4 days/week) while maintaining other clients.
                </p>
                <div className="text-white/60 text-xs">
                  • $62K project income<br/>
                  • $5K rush bonuses<br/>
                  • Part-time capacity
                </div>
              </motion.div>
            </div>

            <AnimatedBarChart 
              title="Projected Partner Income Growth (2026-2027)"
              data={[
                { label: "Retainer Partners", value: 30, suffix: "%", color: "#ffffff" },
                { label: "Project-Based Partners", value: 20, suffix: "%", color: "#d0d0d0" },
                { label: "Equity Partners", value: 40, suffix: "%", color: "#b0b0b0" },
              ]}
            />

            <div className="mt-12 md:mt-16 p-6 md:p-10 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">What Partners Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white/80 italic mb-4">
                    "The partnership model makes sense. Clear briefs, fair rates, and I don't have to chase invoices. It's refreshing to work with a team that actually values craft over speed."
                  </p>
                  <p className="text-white/60 text-sm">— Video Director, Sydney (Partner Interest)</p>
                </div>
                <div>
                  <p className="text-white/80 italic mb-4">
                    "I like the flexibility of project-based work. I can maintain my own clients while taking on fiveroses projects when capacity allows. The quality of briefs and client caliber is consistently high."
                  </p>
                  <p className="text-white/60 text-sm">— Brand Designer, Melbourne (Partnership Model)</p>
                </div>
                <div>
                  <p className="text-white/80 italic mb-4">
                    "The equity partnership structure is compelling. It's rare to find agencies that offer genuine stakeholder opportunities for specialists. The long-term alignment makes sense."
                  </p>
                  <p className="text-white/60 text-sm">— Full-Stack Developer, Brisbane (Partnership Interest)</p>
                </div>
                <div>
                  <p className="text-white/80 italic mb-4">
                    "Working across Western and Chinese markets is unique. The exposure to international campaigns and different platform strategies is valuable for portfolio development."
                  </p>
                  <p className="text-white/60 text-sm">— Media Buyer, Perth (Partnership Model)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-10 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">The Math Is Simple</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 text-center">Traditional Freelancing</h4>
                  <div className="space-y-3 text-white/70">
                    <div className="flex justify-between">
                      <span>Billable work (60% of time)</span>
                      <span className="text-white font-bold">$60K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Client management (20%)</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Admin & invoicing (10%)</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Business development (10%)</span>
                      <span>$0</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-white">
                      <span>Annual Income</span>
                      <span>$60K</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 text-center">fiveroses Partnership</h4>
                  <div className="space-y-3 text-white/70">
                    <div className="flex justify-between">
                      <span>Billable work (85% of time)</span>
                      <span className="text-white font-bold">$85K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Client management (0%)</span>
                      <span className="text-green-400">We handle</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Admin & invoicing (0%)</span>
                      <span className="text-green-400">We handle</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Business development (15%)</span>
                      <span className="text-white">$15K</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-white">
                      <span>Annual Income</span>
                      <span className="text-green-400">$100K</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-center mt-8 text-sm">
                Same hours worked. 67% more income. 100% more time doing what you're actually good at.
              </p>
            </div>
          </>
          }
        />

        {/* Section 9 — Closing */}
        <ClosingSection />
      </div>
    </main>
  )
}

export default function ProtectedPartnershipsPage() {
  return (
    <PasswordProtect password="FR2026" storageKey="partnership-access">
      <PartnershipsPage />
    </PasswordProtect>
  )
}
