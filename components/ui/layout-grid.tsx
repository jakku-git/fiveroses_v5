"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type CardContent = {
  title: string;
  subtitle: string;
  description: string;
};

type Card = {
  id: number;
  content: React.ReactNode | CardContent;
  className: string;
  thumbnail: string;
  href?: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (card: Card) => {
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setSelected(null);
  };

  const renderCard = (card: Card, index: number) => (
    <div 
      key={card.id} 
      className={cn(
        card.className, 
        "h-[35vh] md:h-[50vh]", 
        selected?.id === card.id && "opacity-0",
        "transform-gpu"
      )}
    >
      <motion.button
        onClick={() => handleClick(card)}
        className="relative overflow-hidden w-full h-full bg-white rounded-lg"
        layoutId={`card-${card.id}`}
        initial={mounted ? { opacity: 0, scale: 0.95 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <ImageComponent card={card} mounted={mounted} selected={selected} />
      </motion.button>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 relative bg-transparent">
      {/* First Row */}
      {cards.slice(0, 3).map((card, i) => renderCard(card, i))}

      {/* Second Row */}
      {cards.slice(3, 6).reverse().map((card, i) => renderCard(card, i + 3))}

      {/* Third Row */}
      {cards.slice(6, 9).map((card, i) => renderCard(card, i + 6))}

      {/* Fourth Row */}
      {cards.slice(9, 12).reverse().map((card, i) => renderCard(card, i + 9))}

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      {selected && (
        <SelectedCardPortal selected={selected} onClose={handleOutsideClick} />
      )}
    </div>
  );
};

const ImageComponent = ({ card, mounted, selected }: { card: Card; mounted: boolean; selected: Card | null }) => {
  return (
    <motion.div className="relative w-full h-full group">
      <Image
        src={card.thumbnail}
        alt={card.content && typeof card.content === 'object' && 'title' in card.content ? card.content.title : 'Project thumbnail'}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-700 hover:scale-105"
      />
      <div className={cn(
        "absolute inset-0 bg-black/20 transition-all duration-200",
        selected ? (selected.id === card.id ? "opacity-100" : "opacity-0") : "opacity-0 group-hover:opacity-100"
      )} />
    </motion.div>
  );
};

type SelectedCardPortalProps = {
  selected: Card;
  onClose: () => void;
};

const SelectedCardPortal = ({ selected, onClose }: SelectedCardPortalProps) => {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          layoutId={`card-${selected.id}`}
          className="relative w-[95%] md:w-full max-w-5xl h-[60vh] md:h-[80vh] mx-auto bg-black rounded-3xl overflow-hidden z-[60]"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            layoutId={`image-${selected.id}-image`}
            className="relative w-full h-full"
          >
            <ImageComponent card={selected} mounted={true} selected={selected} />
          </motion.div>

          <motion.div
            layoutId={`content-${selected.id}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 text-white"
          >
            <div className="flex flex-col">
              {selected.content && (
                typeof selected.content === 'object' && 'title' in selected.content ? (
                  <>
                    <p className="text-[13px] uppercase tracking-wider text-white/70 mb-1.5">{selected.content.subtitle}</p>
                    <h3 className="text-lg font-extralight mb-0.5 text-white tracking-tight leading-tight">{selected.content.title}</h3>
                    <p className="text-[15px] text-white/80 font-light">{selected.content.description}</p>
                  </>
                ) : (
                  selected.content
                )
              )}
              {selected.href && (
                <Link href={selected.href}>
                  <span>View Project</span>
                </Link>
              )}
            </div>
          </motion.div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white z-50"
          >
            ✖
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default LayoutGrid;
