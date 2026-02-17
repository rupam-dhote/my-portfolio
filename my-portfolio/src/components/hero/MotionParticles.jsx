import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionParticles = () => {
  const reduceMotion = useReducedMotion();
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (reduceMotion || viewport.w === 0) return null;

  const isMobile = viewport.w < 768;
  const count = isMobile ? 15 : 35;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        // random start
        const startX = Math.random() * viewport.w;
        const startY = Math.random() * viewport.h;

        // random drift direction
        const dx = (Math.random() - 0.5) * 120;
        const dy = (Math.random() - 0.5) * 120;

        return (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/70 shadow-[0_0_8px_rgba(99,102,241,0.8)]
"
            style={{ left: startX, top: startY }}
            animate={{
              x: [0, dx],
              y: [0, dy],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        );
      })}
    </div>
  );
};

export default MotionParticles;
