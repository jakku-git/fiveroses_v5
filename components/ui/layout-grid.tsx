"use client";
import React, { useState } from "react";
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

  const handleClick = (card: Card) => {
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setSelected(null);
  };

  return (
    // ✅ Keeps background black & grid unchanged
    <div className="w-full p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative bg-transparent">
      {/* ✅ First Row: Keep original order */}
      {cards.slice(0, 3).map((card, i) => (
        <div key={i} className={cn(card.className, "h-[50vh]")}>
          <motion.button
            onClick={() => handleClick(card)}
            className="relative overflow-hidden w-full h-full bg-white rounded-lg"
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} />
          </motion.button>
        </div>
      ))}

      {/* ✅ Second Row: Reorder 3 → 2 → 1 */}
      {cards.slice(3, 6).reverse().map((card, i) => (
        <div key={i} className={cn(card.className, "h-[50vh]")}>
          <motion.button
            onClick={() => handleClick(card)}
            className="relative overflow-hidden w-full h-full bg-white rounded-lg"
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} />
          </motion.button>
        </div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      {selected && (
        <SelectedCardPortal selected={selected} onClose={handleOutsideClick} />
      )}
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.div className="relative w-full h-full">
      <Image
        src={card.thumbnail}
        alt="thumbnail"
        layout="fill"
        objectFit="cover"
        className="transition duration-200"
      />
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
          className="relative w-full max-w-5xl h-[80vh] mx-auto bg-black rounded-3xl overflow-hidden z-[60]"
          onClick={onClose} // ✅ Clicking image now closes it
        >
          {/* ✅ Dark tint over the image for better text visibility */}
          <motion.div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

          {/* ✅ Full-size image */}
          <motion.div
            layoutId={`image-${selected.id}-image`}
            className="relative w-full h-full"
          >
            <ImageComponent card={selected} />
          </motion.div>

          {/* ✅ Text now overlays the image, aligned at the bottom */}
          <motion.div
            layoutId={`content-${selected.id}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-full p-6 z-20 text-white"
          >
            {selected.content}
          </motion.div>

          {/* ✅ Removed extra button styling */}
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
