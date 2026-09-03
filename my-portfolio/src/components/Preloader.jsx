import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader Component
 * -------------------------------------------------------------
 * HOW IT WORKS STEP-BY-STEP:
 * 1. Receives the `progress` prop (0-100%) calculated by `useImagePreloader`.
 * 2. `getStatusText()` dynamically returns the current loading stage message based on progress:
 *    - 0% - 29%: "INITIALIZING PORTFOLIO..."
 *    - 30% - 69%: "LOADING CREATIVE ASSETS..."
 *    - 70% - 99%: "OPTIMIZING EXPERIENCE..."
 *    - 100%: "WELCOME!"
 * 3. Uses Framer Motion's `<motion.div>` for the progress bar width, animating smoothly as `progress` increases.
 * 4. Uses `<AnimatePresence>` around status text so whenever `statusText` changes, the old text slides up and fades out while the new text slides in smoothly.
 * 5. When `useImagePreloader` completes (`isLoading` becomes false), the outer `<motion.div>` triggers its `exit` animation:
 *    blurring out (`filter: blur(8px)`), scaling up slightly (`scale: 1.02`), and fading out (`opacity: 0`).
 */
const Preloader = ({ progress }) => {
  // Determine dynamic status text based on current percentage range
  const getStatusText = () => {
    if (progress < 30) return "INITIALIZING PORTFOLIO...";
    if (progress < 70) return "LOADING CREATIVE ASSETS...";
    if (progress < 100) return "OPTIMIZING EXPERIENCE...";
    return "WELCOME!";
  };

  const statusText = getStatusText();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      // Exit animation played when preloader unmounts
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      className=" fixed inset-0 z-99999 flex flex-col items-center justify-center  overflow-hidden select-none"
    >
      {/* Background Image */}
      <img
        src="./loaderbg.png"
        alt="Loder Image"
        className="absolute -z-999 bg-bg brightness-75  opacity-20  object-cover w-full h-full"
      />
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none" />
      {/* Main Preloader Content Box */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 max-w-sm w-full">
        {/* Animated Brand Logo Badge */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 bg-slate-900/30 px-5 py-3 rounded-2xl border border-indigo-500/30 shadow-2xl backdrop-blur-lg"
        >
          <img
            src="/my-logo.png"
            alt="Portfolio Logo"
            className="h-7 w-auto drop-shadow-[0_0_12px_rgba(95, 98, 224, 0.8)]"
          />
          <span className="text-xl font-bold tracking-wider bg-linear-to-r from-indigo-200 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
            RUPAM
          </span>
        </motion.div>

        {/* Outer Progress Bar Container */}
        <div className="w-full bg-slate-900/90 p-1.5 rounded-full border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.2)] backdrop-blur-md">
          {/* Animated Inner Progress Bar */}
          <motion.div
            className="h-2 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Dynamic Percentage & Animated Status Text Label */}
        <div className="flex justify-between items-center w-full text-xs font-mono tracking-widest text-indigo-300/80">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            {/* Animated Status Text Switcher */}
            <AnimatePresence mode="wait">
              <motion.span
                key={statusText}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {statusText}
              </motion.span>
            </AnimatePresence>
          </span>
          {/* Real-time Percentage Display */}
          <span className="text-sm font-bold text-indigo-400 font-sans">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
