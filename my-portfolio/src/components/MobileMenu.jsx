import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

const MobileMenu = ({ isOpen, onClose, navLinks, isActive, onClick }) => {
  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className=" px-4 w-full min-h-screen fixed inset-0  z-9999 bg-slate-900  flex flex-col items-center justify-center  gap-6 text-white md:hidden"
        >
          <button className="absolute top-4 right-4" onClick={onClose}>
            <X className="size-6 text-slate-400" />
          </button>

          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              onClick={() => {
                onClose();
                onClick(i);
              }}
              className={`rounded-full shadow ${isActive === i && "shadow-slate-50/25"} w-full bg-slate-800/25 hover:shadow-slate-50/20 px-2 py-2 text-center cursor-pointer`}
            >
              {link.name}
            </a>
          ))}

          {/* cta button */}
          <a href="#cont">
            <button className="w-full px-5 py-2 rounded-full  transition-all duration-500  shadow-slate-300 bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white font-semibold hover:bg-linear-to-r hover:from-indigo-400 hover:via-indigo-500 hover:to-indigo-700 ">
              Hire me
            </button>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileMenu;
