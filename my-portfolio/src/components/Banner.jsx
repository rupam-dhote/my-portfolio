import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed top-0 left-0 z-9999 flex gap-1 flex-wrap items-center justify-between w-full px-4 md:px-14 py-2 font-medium text-sm text-white text-center bg-linear-to-r from-indigo-500 via-indigo-400 to-indigo-300"
    >
      <Link to={"/"}>
        <button className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-lg text-indigo-600 bg-violet-100 cursor-pointer hover:bg-indigo-200 transition active:scale-95 md:ml-3 text-xs sm:text-sm outline-0">
          <ArrowLeft className="size-3 md:size-4 " />
          Back
        </button>
      </Link>
      <p className="text-sm text-fg">
        <span className="hidden md:flex">
          My all projects which i learn or build from scratch
        </span>
        <span className="md:hidden">My all projects</span>
      </p>
    </motion.div>
  );
};

export default Banner;
