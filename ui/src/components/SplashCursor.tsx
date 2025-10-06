"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const SplashCursor: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smooth inertia spring for smoke flow
  const springX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.4 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Core bright smoke center */}
      <motion.div
        style={{
          translateX: springX,
          translateY: springY,
          x: "-50%",
          y: "-50%",
        }}
        className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.9)_0%,rgba(16,185,129,0.4)_40%,transparent_80%)] opacity-80 mix-blend-screen blur-[80px] dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,1)_0%,rgba(5,150,105,0.5)_40%,transparent_80%)]"
      />

      {/* Outer soft glow ring */}
      <motion.div
        style={{
          translateX: springX,
          translateY: springY,
          x: "-50%",
          y: "-50%",
          scale: 1.3,
        }}
        className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(110,231,183,0.4)_0%,rgba(16,185,129,0.15)_50%,transparent_80%)] opacity-70 mix-blend-screen blur-[100px] dark:bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.5)_0%,rgba(5,150,105,0.1)_50%,transparent_80%)]"
      />

      {/* trailing diffusion layers for smoky aura */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            translateX: springX,
            translateY: springY,
            x: "-50%",
            y: "-50%",
            scale: 1.1 + i * 0.15,
          }}
          className={`absolute h-72 w-72 rounded-full mix-blend-screen blur-[120px] opacity-${40 - i * 5} bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.25)_0%,rgba(16,185,129,0.1)_40%,transparent_80%)] dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35)_0%,rgba(5,150,105,0.1)_40%,transparent_80%)]`}
        />
      ))}
    </motion.div>
  );
};
