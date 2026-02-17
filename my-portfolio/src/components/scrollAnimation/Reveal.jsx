import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  group = false,
  distance = 40,
}) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(ref, {
    amount: 0.6,
  });

  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    let timer;

    if (isInView && !hasPlayed) {
      timer = setTimeout(() => {
        setHasPlayed(true);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [isInView, hasPlayed]);

  const getInitial = () => {
    if (shouldReduceMotion) return false;

    switch (direction) {
      case "left":
        return { opacity: 0, x: -distance };
      case "right":
        return { opacity: 0, x: distance };
      case "down":
        return { opacity: 0, y: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const parentCon = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: delay,
      },
    },
  };

  return group ? (
    <motion.div
      ref={ref}
      variants={parentCon}
      initial="hidden"
      animate={hasPlayed ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={
        shouldReduceMotion
          ? {}
          : hasPlayed
            ? { opacity: 1, x: 0, y: 0 }
            : getInitial()
      }
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
