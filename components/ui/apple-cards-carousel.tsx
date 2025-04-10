"use client";
import Image, { ImageProps } from "next/image";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  RefObject,
  useMemo,
} from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { JSX } from "react/jsx-runtime";
import ColorThief from 'colorthief';
import { debounce } from 'lodash';

interface CardData {
  category: string;
  title: string;
  src: string;
  content: React.ReactElement<ContentProps>;
}

interface CarouselContextType {
  onCardClose: (index: number) => void;
  currentIndex: number;
}

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

interface CardProps {
  card: CardData;
  index: number;
  layout?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           useOutsideClick Hook                             */
/* -------------------------------------------------------------------------- */
export const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

/* -------------------------------------------------------------------------- */
/*                            MediaContent Component                          */
/* -------------------------------------------------------------------------- */
interface MediaContentProps {
  src: string;
  alt: string;
  type: 'image' | 'video';
  isHero?: boolean;
}

const MediaContent = ({ src, alt, type, isHero = false }: MediaContentProps) => {
  if (type === 'video') {
    return (
      <video
        src={src}
        className="w-full h-full object-cover rounded-2xl"
        controls
        muted
        loop
        playsInline
        preload={isHero ? "auto" : "metadata"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      loading={isHero ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, 50vw"
      quality={75}
      priority={isHero}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                            Content Components                              */
/* -------------------------------------------------------------------------- */
interface ContentProps {
  backgroundColor: string;
}

const Card1Content: React.FC<ContentProps> = ({ backgroundColor }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Social Media Reach
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            The campaign achieved over 1.2 million impressions across platforms. Instagram posts contributed significantly, with some reaching up to 800,000 impressions, highlighting strong cross-channel performance.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://videos.pexels.com/video-files/9750811/9750811-sd_960_506_25fps.mp4"
            alt="heat video"
            type="video"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="heat2.webp"
            alt="heat products"
            type="image"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Conversion Rate
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            The conversion rate from digital interactions to actual purchases stood at an impressive 5.5%, supported by optimized landing pages and persuasive call-to-actions that drove a notable increase in purchase frequency during the campaign period.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Engagement Rate
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            The overall engagement rate averaged 5.5%, with select influencer collaborations and interactive posts exceeding 7%, demonstrating active audience participation and enthusiasm.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="heat3.webp"
            alt="Custom Solutions"
            type="image"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://videos.pexels.com/video-files/9750708/9750708-sd_960_506_25fps.mp4"
            alt="Future Impact Demo"
            type="video"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Click-Through Rate
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Digital ads posted across multiple channels recorded an average CTR of 4.5%. On high-engagement days, some ads even pushed towards 5%, indicating effective creative messaging and targeting.
          </p>
        </div>
      </div>
    </div>
  );
};

const Card2Content: React.FC<ContentProps> = ({ backgroundColor }) => {
        return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Workflow Automation
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Implemented automated workflows that reduced manual tasks by 75% and increased team productivity by 50%.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://example.com/video3.mp4"
            alt="Workflow Automation Demo"
            type="video"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://picsum.photos/seed/workflow2/800/600"
            alt="Team Collaboration"
            type="image"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Team Integration
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Created seamless collaboration tools that improved cross-team communication and reduced project delays by 40%.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Process Optimization
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Streamlined business processes through digital transformation, resulting in 55% faster decision-making and 30% cost savings.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://example.com/video4.mp4"
            alt="Process Optimization Demo"
            type="video"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://picsum.photos/seed/workflow4/800/600"
            alt="Growth Impact"
            type="image"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Growth Impact
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Enabled 150% business growth through scalable processes while maintaining operational efficiency and team satisfaction.
          </p>
        </div>
      </div>
          </div>
        );
};

const Card3Content: React.FC<ContentProps> = ({ backgroundColor }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Product Innovation
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Led the development of a revolutionary product that redefined industry standards and captured 35% market share in 6 months.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://example.com/video5.mp4"
            alt="Product Innovation Demo"
            type="video"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://picsum.photos/seed/product2/800/600"
            alt="Market Strategy"
            type="image"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Market Strategy
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Developed a comprehensive go-to-market strategy that generated $3M in pre-orders and achieved 98% customer satisfaction.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            User Experience
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Designed an intuitive interface that reduced support tickets by 65% and increased user retention by 50%.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://example.com/video6.mp4"
            alt="User Experience Demo"
            type="video"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <MediaContent
            src="https://picsum.photos/seed/product4/800/600"
            alt="Industry Impact"
            type="image"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: getContrastColor(backgroundColor) }}>
            Industry Impact
          </h3>
          <p style={{ color: getSecondaryContrastColor(backgroundColor) }}>
            Set new industry benchmarks for product innovation and customer satisfaction, influencing market standards.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Carousel Data                                  */
/* -------------------------------------------------------------------------- */
const data: CardData[] = [
  {
    category: "Project Heat",
    title: "Sizzle in Style Your Summer, Your Statement.",
    src: "heat-cover.webp",
    content: <Card1Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card2Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Design",
    title: "Creating beautiful experiences.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Development",
    title: "Building the future of web.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Marketing",
    title: "Growing brands digitally.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Strategy",
    title: "Strategic solutions for success.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Innovation",
    title: "Pushing boundaries forward.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
  {
    category: "Technology",
    title: "Advancing digital solutions.",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <Card3Content backgroundColor="rgb(255, 255, 255)" />,
  },
];

/* -------------------------------------------------------------------------- */
/*                           Carousel Context                                 */
/* -------------------------------------------------------------------------- */
export const CarouselContext = createContext<CarouselContextType>({
  onCardClose: () => {},
  currentIndex: 0,
});

/* -------------------------------------------------------------------------- */
/*                            Carousel Component                              */
/* -------------------------------------------------------------------------- */
export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollBehavior = useMemo(() => getScrollBehavior(), []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    setIsScrolling(true);
    checkScrollability();
    
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  const scrollLeft = () => {
    if (carouselRef.current && !isScrolling) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollAmount = cardWidth + gap;
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: scrollBehavior
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && !isScrolling) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollAmount = cardWidth + gap;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: scrollBehavior
      });
    }
  };

  const handleCardClose = (index: number) => {
      setCurrentIndex(index);
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-hidden py-8 md:py-8 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={(e: React.UIEvent<HTMLDivElement>) => handleScroll(e)}
          style={{ willChange: 'scroll-position' }}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>
          <div className={cn("flex flex-row justify-start gap-4 pl-4 w-full")}>
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl w-[230px] md:w-[384px]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Card Component                                */
/* -------------------------------------------------------------------------- */
export const Card = ({ card, index, layout = false }: CardProps) => {
  const [open, setOpen] = useState(false);
  const [isColorLoading, setIsColorLoading] = useState(true);
  const [colorError, setColorError] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMacOrIOS = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
  }, []);

  // Optimize scroll behavior for Mac/iOS
  const scrollBehavior = isMacOrIOS ? 'smooth' : 'auto';

  // Cache color extraction results
  const colorCache = useMemo(() => new Map<string, string>(), []);

  const animationSettings = useMemo(() => getAnimationSettings(), []);

  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Debounced scroll handler
  const debouncedScroll = useMemo(
    () => debounce((e: WheelEvent) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const scrollAmount = e.deltaY;
      container.scrollLeft += scrollAmount;
      e.preventDefault();
    }, 16),
    []
  );

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.addEventListener('wheel', debouncedScroll, { passive: false });
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', debouncedScroll);
      }
    };
  }, [open, debouncedScroll]);

  useEffect(() => {
    const checkImage = async () => {
      if (!imageRef.current) return;
      
      setIsColorLoading(true);
      setColorError(false);

      try {
        const img = imageRef.current;
        
        // If color is cached, use it
        if (colorCache.has(card.src)) {
          setBackgroundColor(colorCache.get(card.src)!);
          setIsColorLoading(false);
          return;
        }

        // Wait for image to load if it hasn't already
        if (!img.complete) {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }

        // Temporarily make the image visible for color extraction
        const originalDisplay = img.style.display;
        img.style.display = 'block';
        
        const color = await extractDominantColor(img);
        const softenedColor = softenColor(color);
        colorCache.set(card.src, softenedColor);
        setBackgroundColor(softenedColor);

        // Restore original display style
        img.style.display = originalDisplay;
      } catch (error) {
        console.error('Error extracting color:', error);
        setColorError(true);
        setBackgroundColor('rgb(255, 255, 255)');
      } finally {
        setIsColorLoading(false);
      }
    };

    checkImage();
  }, [card.src, colorCache]);

  const contentWithBackground = React.cloneElement(card.content as React.ReactElement<ContentProps>, {
    backgroundColor
  });

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationSettings}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              style={{ willChange: 'opacity' }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationSettings}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className={cn(
                "max-w-5xl mx-auto h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative",
                isColorLoading && "bg-white",
                colorError && "bg-white"
              )}
              style={{
                backgroundColor: !isColorLoading && !colorError ? backgroundColor : 'rgb(255, 255, 255)',
                color: getContrastColor(backgroundColor),
                willChange: 'transform, opacity'
              }}
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: getContrastColor(backgroundColor),
                  color: backgroundColor
                }}
                onClick={handleClose}
              >
                <IconX className="h-6 w-6" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium"
                style={{
                  color: getSecondaryContrastColor(backgroundColor)
                }}
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold mt-4"
                style={{
                  color: getContrastColor(backgroundColor)
                }}
              >
                {card.title}
              </motion.p>
              <div className="py-10">
                {contentWithBackground}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <img
          ref={imageRef}
          src={card.src}
          alt={card.title}
          className="absolute z-10 inset-0 w-full h-full object-cover"
          style={{ display: 'none' }}
          crossOrigin="anonymous"
          loading="lazy"
          decoding="async"
        />
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
          crossOrigin="anonymous"
          loading="lazy"
          decoding="async"
        />
      </motion.button>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                           BlurImage Component                              */
/* -------------------------------------------------------------------------- */
export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        error && "opacity-50",
        className
      )}
      onLoad={() => setLoading(false)}
      onError={() => setError(true)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      sizes="(max-width: 768px) 230px, 384px"
      quality={75}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                           Color Utility Functions                          */
/* -------------------------------------------------------------------------- */
function isColorDark(color: string): boolean {
  // Convert RGB string to array of numbers
  const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255];
  
  // Calculate relative luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  
  // Return true if the color is dark (luminance < 0.5)
  return luminance < 0.5;
}

function softenColor(color: string): string {
  const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255];
  
  // Mix with white to create a softer color
  const softenedRgb = rgb.map(c => Math.round(c * 0.7 + 255 * 0.3));
  
  return `rgb(${softenedRgb.join(', ')})`;
}

function getContrastColor(color: string): string {
  const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255];
  
  // Calculate relative luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  
  // Return white for dark backgrounds, dark gray for light backgrounds
  return luminance < 0.5 ? '#ffffff' : '#1a1a1a';
}

function getSecondaryContrastColor(color: string): string {
  const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255];
  
  // Calculate relative luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  
  // Return light gray for dark backgrounds, darker gray for light backgrounds
  return luminance < 0.5 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)';
}

/* -------------------------------------------------------------------------- */
/*                        AppleCardsCarouselDemo Component                    */
/* -------------------------------------------------------------------------- */
export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full bg-black text-white mt-0 py-1">
      <Carousel items={cards} />
    </div>
  );
}

// Add performance optimizations for Mac/iOS
const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Optimize scroll behavior for Mac
const getScrollBehavior = () => {
  if (isMac) {
    return 'smooth';
  }
  return 'auto';
};

// Optimize animation settings for Mac/iOS
const getAnimationSettings = () => {
  if (prefersReducedMotion) {
    return {
      duration: 0,
      ease: 'linear'
    };
  }
  return {
    duration: 0.5,
    ease: 'easeOut'
  };
};

function extractDominantColor(img: HTMLImageElement): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context is not supported');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const colors = new Map<string, number>();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const color = `rgb(${r}, ${g}, ${b})`;
    colors.set(color, (colors.get(color) || 0) + 1);
  }

  let dominantColor = '';
  let maxCount = 0;

  for (const [color, count] of colors.entries()) {
    if (count > maxCount) {
      maxCount = count;
      dominantColor = color;
    }
  }

  return Promise.resolve(dominantColor);
}