"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
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
        alt={`Project ${card.id}`}
        layout="fill"
        objectFit="cover"
        className="transition duration-200"
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={75}
        priority={true}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkLCAgLCAwLDAwLDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/2wBDARISEg4NDhQODhQUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
              {selected.content}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer mt-2"
              >
                Read More →
              </motion.div>
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
