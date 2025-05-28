  "use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ContactModal } from "@/components/ui/contact-modal";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface SquareData {
  id: number;
  src: string;
}

interface ShuffleHeroProps {
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
}

const ShuffleHero = ({ isContactOpen, setIsContactOpen }: ShuffleHeroProps) => {
  return (
    <section 
      className="w-full h-screen relative bg-black text-white overflow-hidden"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Image grid container */}
      <div 
        className="absolute inset-0 px-6"
        style={{ 
          pointerEvents: 'auto',
          zIndex: 1
        }}
      >
        <ShuffleGrid />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"
          style={{ 
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
      </div>

      {/* Text content container */}
      <div 
        className="relative h-full flex items-center justify-center"
        style={{ 
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <div 
          className="w-full max-w-5xl px-6"
          style={{ 
            pointerEvents: 'auto',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <span 
              className="inline-block text-[11px] md:text-[13px] text-white font-bold tracking-[0.3em] uppercase"
              style={{
                letterSpacing: '0.3em',
                fontFamily: 'var(--font-sans)',
                opacity: 0.7
              }}
            >
              A Creative Agency Reimagined
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 1,
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.1em'
            }}>
              <div style={{ whiteSpace: 'nowrap' }}>We work with ambitious</div>
              <div style={{ whiteSpace: 'nowrap', opacity: 0.9 }}>brands and people.</div>
            </div>
          </motion.div>

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <div style={{
              maxWidth: '48rem',
              margin: '0 auto',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              color: 'white',
              opacity: 0.85,
              textAlign: 'center'
            }}>
              <p style={{ 
                marginBottom: '1.5em', 
                fontWeight: 300,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap'
              }}>
                Together, we craft ideas into identities, and ambition into lasting impact.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}>
                <p style={{ 
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 400,
                  opacity: 0.9,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  margin: 0
                }}>
                  Because ambition deserves more than execution. It deserves elevation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <motion.button 
              onClick={() => setIsContactOpen(true)}
              className="group inline-flex items-center gap-6 transition-all duration-300"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'white',
                padding: '1em 0'
              }}
              whileHover="hover"
            >
              <motion.span 
                className="relative"
                initial={{ backgroundSize: "0% 2px" }}
                animate={{ backgroundSize: "0% 2px" }}
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
                Let's Talk
              </motion.span>
              <motion.div
                variants={{
                  hover: {
                    x: 8,
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }
                }}
              >
                <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 transition-transform" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
      <ContactModal open={isContactOpen} setOpen={setIsContactOpen} />
    </section>
  );
};

const shuffle = (array: SquareData[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData: SquareData[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1656618724305-a4257e46e847?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1647456063448-5a8282521b1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUwfHx8ZW58MHx8fHx8",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1490013616775-3ca8865fb129?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUyfHx8ZW58MHx8fHx8",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1633533451638-32f1e337d254?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDgwfHx8ZW58MHx8fHx8",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1612188842101-f976582906fc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1696446970388-0c19e9f44333?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1556228841-7c69921649bb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzB8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTl8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1636247498840-693054bb4bcc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjJ8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1633533452217-8c18a313cb76?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1627577741083-506d0b15a56a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDJ8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1627433347599-331af2c0e120?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDh8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1741024415875-0d6e307ea8fe?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1689872699212-2c7ec82f06c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDl8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1683309733021-c52f23a165be?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1683309732867-f96794fb6007?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTd8fHxlbnwwfHx8fHw%3D",
  },
];

const ImageSquare = ({ src, id }: { src: string; id: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full"
      style={{ 
        cursor: 'pointer',
        zIndex: 1,
        position: 'relative',
        pointerEvents: 'auto',
        aspectRatio: '1/1',
        overflow: 'hidden'
      }}
      onClick={() => console.log('Click on image', id)}
      onMouseEnter={() => {
        console.log('Mouse enter on image', id);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log('Mouse leave on image', id);
        setIsHovered(false);
      }}
    >
      {/* Image container */}
      <div 
        className="absolute inset-0"
        style={{
          filter: isHovered 
            ? 'grayscale(0%) brightness(1.05)' 
            : 'grayscale(100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <Image
          src={src}
          alt={`Grid image ${id}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={id <= 4}
          loading={id <= 4 ? "eager" : "lazy"}
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzYvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLz/2wBDAR0dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dLz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/20"
        style={{ 
          pointerEvents: 'none', 
          zIndex: 1,
          opacity: isHovered ? 0 : 0.2, // Remove overlay completely on hover
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </div>
  );
};

const generateSquares = (): SquareData[] => {
  return shuffle([...squareData]);
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<SquareData[]>(() => generateSquares());

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 5000);
    };

    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="absolute inset-0"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'auto',
        overflow: 'hidden'
      }}
    >
      <div 
        className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 h-full w-full gap-1"
        style={{ 
          position: 'relative',
          height: '100%',
          width: '100%'
        }}
      >
        {squares.map((square) => (
          <motion.div
            key={square.id}
            layout
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              aspectRatio: '1/1'
            }}
          >
            <ImageSquare src={square.src} id={square.id} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShuffleHero; 