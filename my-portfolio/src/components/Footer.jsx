import { motion } from "framer-motion";
import { connect } from "../lib/data.js";
const Footer = () => {
  return (
    <footer className="mt-10 md:mt-20 border-t-2 border-t-slate-800 flex flex-col md:flex-row bg-linear-to-l from-slate-900/10 via-slate-900/20 to-slate-900/30 items-center justify-around w-full py-2 md:py-6 gap-4 md:gap-0">
      <div className="hidden md:block">
        <p className="font-bold text-transparent bg-linear-to-l from-violet-300 via-violet-400 to-violet-500 bg-clip-text">
          Thank you for Visiting
        </p>
      </div>
      <div className="mt-4 md:mt-0 md:hidden block">
        <p className=" text-md sm:text-lg text-transparent font-bold bg-linear-to-l from-indigo-300 via-indigo-400 to-indigo-500 bg-clip-text">
          Let's Connect
        </p>
        <div className=" flex items-center gap-4  text-slate-200">
          <span className=" flex gap-4 py-2 w-fit mx-auto rounded-full  ">
            {connect.map((con, i) => (
              <a
                key={i}
                href={con.path}
                className="gap-1 w-fit flex hover:drop-shadow-[0_0_12px_#477ad0] flex-col items-center justify-center group "
              >
                <div className="p-2 rounded-lg bg-slate-800/40 group-hover:scale-105 transition-transform duration-200">
                  <img src={con.img} alt={con.name} className="w-7" />
                </div>
                <p className="text-xs font-semibold text-slate-600">
                  {con.name}
                </p>
              </a>
            ))}
          </span>
        </div>
      </div>
      <div className="text-fg md:font-bold px-2 md:px-0">
        <p className="text-xs md:text-sm ">
          This Protfolio is created by Rupam with lots of{" "}
          <span className="drop-shadow-[0_0_8px_#f92e2e] text-red-400 animate-pulse p-1">
            ❤️
          </span>
          and{" "}
          <motion.span
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block drop-shadow-[0_0_8px_#b6acac] text-fg  p-1"
          >
            💭
          </motion.span>
          !
        </p>
        <p className="text-xs md:text-sm ">
          Copyright © {new Date().getFullYear()} | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
