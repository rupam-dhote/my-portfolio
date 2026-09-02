import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { connect } from "../lib/data";

const MobileMenu = ({ isOpen, onClose, navLinks, isActive, onClick }) => {
  const [mounted, setMounted] = useState(false);

  const icons = {
    Github: Github,
    Linkedin: Linkedin,
    Instagram: Instagram,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-99998 bg-black/70 backdrop-blur-xs"
          />

          {/* Hardware-Accelerated Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[82%] max-w-xs z-99999 bg-[#0b0f19] border-l border-slate-800/80 p-5 flex flex-col justify-between overflow-y-auto text-white transform-gpu will-change-transform shadow-2xl"
          >
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <img
                  src="/my-logo.png"
                  alt="Rupam Logo"
                  className="h-5 w-auto"
                />
                <span className="font-bold tracking-wider text-sm bg-linear-to-r from-indigo-200 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
                  RUPAM
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 active:scale-90 transition-transform cursor-pointer"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Nav Links Section */}
            <div className="my-6 flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase px-2 mb-1">
                Navigation
              </span>

              {navLinks.map((link, i) => {
                const active = isActive === i;
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => {
                      onClose();
                      onClick(i);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 active:scale-98 cursor-pointer ${
                      active
                        ? "text-indigo-400 font-bold bg-indigo-600/10 border-l-2 shadow-slate-400 shadow-2xs border-indigo-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <ArrowRight className="size-4 text-indigo-400" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Footer Section: Hire Me CTA & Social Links */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <a href="#cont" onClick={onClose} className="w-full">
                <button className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs text-white bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-700 shadow-md shadow-indigo-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer">
                  <span>Hire Me</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </a>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-3 pt-1">
                {connect.map((s) => {
                  const Icon = icons[s.name];
                  return (
                    <a
                      key={s.name}
                      href={s.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      aria-label={s.name}
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default MobileMenu;
