import Reveal from "./scrollAnimation/Reveal.jsx";
import { skills } from "../lib/data.js";
import { Rocket } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SkillCard from "./skill/SkillCard.jsx";
import { useState } from "react";
import useSound from "../hook/useSound.js";

const Skills = () => {
  const upToDown = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  };
  const [selectedSkill, setSelectedSkill] = useState(null);
  const playOnOpen = useSound("./sound/cardOpen.mp3");
  const shadows = {
    react: {
      glow: "hover:drop-shadow-[0_0_12px_#61DAFB]",
      drop: "drop-shadow-[0_0_12px_#61DAFB]",
    },
    node: {
      glow: "hover:drop-shadow-[0_0_12px_#3C873A]",
      drop: "drop-shadow-[0_0_12px_#3C873A]",
    },
    mongo: {
      glow: "hover:drop-shadow-[0_0_12px_#4DB33D]",
      drop: "drop-shadow-[0_0_12px_#4DB33D]",
    },
    express: {
      glow: "hover:drop-shadow-[0_0_12px_#AAAAAA]",
      drop: "drop-shadow-[0_0_12px_#AAAAAA]",
    },
    js: {
      glow: "hover:drop-shadow-[0_0_12px_#F7DF1E]",
      drop: "drop-shadow-[0_0_12px_#F7DF1E]",
    },
    tailwind: {
      glow: "hover:drop-shadow-[0_0_12px_#38BDF8]",
      drop: "drop-shadow-[0_0_12px_#38BDF8]",
    },
    html: {
      glow: "hover:drop-shadow-[0_0_12px_#E34F26]",
      drop: "drop-shadow-[0_0_12px_#E34F26]",
    },
    css: {
      glow: "hover:drop-shadow-[0_0_12px_#1572B6]",
      drop: "drop-shadow-[0_0_12px_#1572B6]",
    },
    cpp: {
      glow: "hover:drop-shadow-[0_0_12px_#00599C]",
      drop: "drop-shadow-[0_0_12px_#00599C]",
    },
    git: {
      glow: "hover:drop-shadow-[0_0_12px_#F05032]",
      drop: "drop-shadow-[0_0_12px_#F05032]",
    },
    c: {
      glow: "hover:drop-shadow-[0_0_12px_#A8B9CC]",
      drop: "drop-shadow-[0_0_12px_#A8B9CC]",
    },
    github: {
      glow: "hover:drop-shadow-[0_0_12px_#6E5494]",
      drop: "drop-shadow-[0_0_12px_#6E5494]",
    },
    vs: {
      glow: "hover:drop-shadow-[0_0_12px_#007ACC]",
      drop: "drop-shadow-[0_0_12px_#007ACC]",
    },
    postman: {
      glow: "hover:drop-shadow-[0_0_12px_#FF6C37]",
      drop: "drop-shadow-[0_0_12px_#FF6C37]",
    },
  };

  return (
    <section
      id="skill"
      className="relative min-h-screen flex flex-col  md:flex-row md:justify-between w-full py-4 px-4 md:px-8 lg:px-20 xl:px-24 overflow-hidden "
    >
      <div className="container mx-auto md:px-6 pt-16 md:pt-24 z-10 ">
        <Reveal direction="left" duration={1} delay={0.5} distance={60}>
          <span className="bg-linear-to-l from-indigo-300 via-indigo-400 to-indigo-500 px-3 py-1 rounded-full text-transparent bg-clip-text font-bold text-md md:text-lg drop-shadow-[0_0_8px_#8196f899] shadow shadow-slate-600">
            My Current Skills
          </span>
        </Reveal>
        <Reveal
          group={true}
          delay={1}
          duration={1}
          className="mt-4  flex flex-wrap gap-4  justify-center md:justify-start rounded-2xl w-full  p-4 bg-slate-900/60 shadow shadow-slate-600"
        >
          {skills.map((skill, i) => (
            <motion.div
              variants={upToDown}
              key={i}
              onClick={() => {
                playOnOpen();
                setTimeout(() => setSelectedSkill(skill), 80);
                document.body.style.overflow = "hidden";
              }}
              className={`w-24 h-24 md:w-30 md:h-30 transition-shadow duration-200 ${shadows[skill.glow].glow} 
            cursor-pointer  p-2 rounded-xl bg-slate-700/30 group  flex flex-col gap-2 justify-center items-center`}
            >
              <img
                src={skill.img}
                className="h-8 md:h-10 group-hover:scale-105 transition-all duration-200 "
                alt={skill.name}
              />
              <p className="text-sm text-slate-500">{skill.name}</p>
            </motion.div>
          ))}
        </Reveal>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: [0, 1], x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative mt-5 mb-4 md:mb-0 "
        >
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-violet-500/30 via-indigo-500/10 to-violet-500/30 blur-md" />
          <div className="flex flex-col items-center justify-center gap-3 h-44 bg-slate-900/80 backdrop-blur-md rounded-2xl  px-8 border border-slate-700 ">
            <span className="text-transparent bg-linear-to-r from-indigo-400 via-indigo-400 to-indigo-500 bg-clip-text font-semibold text-xs sm:text-sm md:text-lg flex items-center gap-2 ">
              <Rocket className="hidden sm:flex size-4 text-pink-400" />
              More Skills Coming Soon
            </span>

            <p className="w-full text-center text-xs sm:text-sm text-slate-300 md:leading-relaxed md:max-w-md">
              I’m constantly learning and exploring new technologies to improve
              my development skills. More tools and expertise will be added here
              as I continue growing as a developer.
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedSkill && (
            <SkillCard
              skill={selectedSkill}
              onClose={() => {
                setSelectedSkill(null);
                document.body.style.overflow = "auto";
              }}
              shadow={shadows[selectedSkill.glow].drop}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
