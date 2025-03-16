import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Object to store the latest mouse coordinates
    const mouse = { x: 0, y: 0 };

    // This function updates the cursor positions on each animation frame
    const updateCursor = () => {
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      // Continue the loop
      requestAnimationFrame(updateCursor);
    };

    // Capture all mousemove events and update the mouse object
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    // Start the animation loop
    requestAnimationFrame(updateCursor);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={coreRef} className="custom-cursor cursor-core" />
      <div ref={dotRef} className="custom-cursor cursor-dot" />
      <div ref={outlineRef} className="custom-cursor cursor-outline" />
    </>
  );
}
