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
    <section className="w-full h-screen relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 px-6">
        <ShuffleGrid />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="w-full max-w-[90%] px-6">
          <div className="relative z-10">
            <div className="w-full md:w-[30vw] backdrop-blur-2xl bg-gradient-to-r from-black/40 via-black/30 to-black/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block mb-4 text-[11px] md:text-sm text-white/80 font-medium tracking-wider uppercase"
              >
                A Creative Agency Reimagined For Creative People
              </motion.span>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-6xl font-light tracking-tight leading-[1.1] text-white mb-4"
              >
                We work with ambitious<br />
                brands and people.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm md:text-lg text-white/80 leading-relaxed mb-6"
              >
                Together, we craft ideas into identities, and ambition into lasting impact.<br />
                Because ambition deserves more than execution. It deserves elevation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.button 
                  onClick={() => setIsContactOpen(true)}
                  className="group text-base md:text-2xl text-white/80 hover:text-white inline-flex items-center gap-2 transition-all duration-300 font-light"
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
                      transition: "background-size 0.3s"
                    }}
                  >
                    Let's Talk
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
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
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

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ 
        duration: 1.5, 
        type: "spring",
        layout: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      className="w-full h-full overflow-hidden relative aspect-square"
    >
      <div className="absolute inset-0 bg-black/20" />
      <Image
        src={sq.src}
        alt={`Grid image ${sq.id}`}
        fill
        className="object-cover transition-transform duration-500"
        sizes="(max-width: 768px) 50vw, 25vw"
        priority={sq.id <= 4}
        loading={sq.id <= 4 ? "eager" : "lazy"}
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzYvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLz/2wBDAR0dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dLz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 5000);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 h-full w-full gap-1 will-change-transform [transform:translateZ(0)] [backface-visibility:hidden] overflow-hidden">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero; 