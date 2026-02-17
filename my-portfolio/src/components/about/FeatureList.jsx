import { Code2, Layout, Rocket, Server } from "lucide-react";
import { useState } from "react";
import Reveal from "../scrollAnimation/Reveal";
import { motion } from "framer-motion";

const FeatureList = () => {
  const [isHover, setIsHover] = useState(false);
  const itemRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  };
  const features = [
    {
      icon: Code2,
      title: "Clean & Maintainable Code",
      description:
        "I write clean, readable, and well-structured code that is easy to understand, debug, and scale as applications grow.",
      theme: "Green",
    },
    {
      icon: Rocket,
      title: "Scalable Application Architecture",
      description:
        "I design applications with scalability in mind, ensuring they remain performant and adaptable as features and user demands increase.",
      theme: "Violet",
    },
    {
      icon: Layout,
      title: "Modern UI & User Experience",
      description:
        "I focus on building responsive and intuitive user interfaces that provide smooth interactions and a consistent experience across all devices.",
      theme: "Orange",
    },
    {
      icon: Server,
      title: "Reliable Backend & API Design",
      description:
        "I develop secure and efficient backend systems with well-structured APIs that handle data flow, authentication, and business logic effectively.",
      theme: "Indigo",
    },
  ];

  // theme object for the color combination
  const themeSelector = {
    Green: {
      textColor: "text-green-500",
      groupHover: "group-hover:bg-green-300/20 group-hover:border-green-300",
    },
    Indigo: {
      textColor: "text-indigo-500",
      groupHover: "group-hover:bg-indigo-300/20 group-hover:border-indigo-300",
    },
    Violet: {
      textColor: "text-violet-500",
      groupHover: "group-hover:bg-violet-300/20 group-hover:border-violet-300",
    },
    Orange: {
      textColor: "text-orange-500",
      groupHover: "group-hover:bg-orange-300/20 group-hover:border-orange-300",
    },
  };

  return (
    <Reveal group={true} delay={0.5}>
      <div
        className="p-2 md:p-4 bg-slate-600/30 rounded-2xl "
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {features.map((val, i) => {
          const theme = themeSelector[val.theme];
          return (
            <motion.div
              key={i}
              className={
                "flex  items-center justify-center gap-6  group cursor-pointer"
              }
              variants={itemRight}
            >
              <div
                className={`p-2 md:p-4  ${theme.groupHover} border duration-400 border-transparent   flex gap-4 rounded-xl transition-colors ${i == 0 && !isHover ? "border-green-600 bg-green-300/10" : ""}`}
              >
                <div className="space-y-2">
                  <h3
                    className={`text-xs sm:text-sm flex items-center gap-2 font-semibold ${theme.textColor}`}
                  >
                    {
                      <val.icon
                        className={`size-3 sm:size-4 ${theme.textColor}`}
                      />
                    }
                    {val.title}
                  </h3>
                  <p className="pl-6 text-xs text-justify  group-hover:text-slate-100/70 text-slate-200 ">
                    {val.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Reveal>
  );
};

export default FeatureList;
