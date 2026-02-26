import { motion } from "framer-motion";
import { connect } from "../lib/data.js";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: 1, duration: 1 }}
      className="bg-slate-900 border-t border-slate-600 mt-4 md:mt-10 "
    >
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            Rupam Dhote
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            This Portfolio is created by me with lots of{" "}
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
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex md:hidden gap-6 text-gray-400">
          <span className=" flex gap-4 py-2 w-fit mx-auto rounded-full  ">
            {connect.map((con, i) => (
              <a
                key={i}
                target={con.path === "/" ? "" : "_blank"}
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

        {/* MEDIUM SCREEN GREETINGS */}
        <div className="hidden md:flex flex-col gap-1 ">
          <p className="text-gray-200 text-lg ">
            Thanks for visiting my portfolio !
          </p>
          <p className="text-gray-400 text-sm">
            let’s create something great together.
          </p>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t border-slate-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Rupam Dhote. All rights reserved.
      </div>
    </motion.footer>
  );
}
