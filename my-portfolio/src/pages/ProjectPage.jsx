import { Rocket } from "lucide-react";
import Banner from "../components/Banner.jsx";
import ProjectCard from "../components/project/ProjectCard.jsx";
import { projects } from "../lib/data.js";
import { motion } from "framer-motion";

const ProjectPage = () => {
  const projectType = [
    {
      id: "MERN",
      heading: "Mern Projects",
    },
    {
      id: "REACT",
      heading: "React Projects",
    },
    {
      id: "HTML",
      heading: "HTML, CSS, JS Projects",
    },
    {
      id: "C/CPP",
      heading: "C/C++ Projects",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden ">
      <Banner />
      <main className="min-h-screen flex flex-col  md:flex-row md:justify-between w-full py-4 px-4 md:px-20 lg:px-24 xl:px-28 overflow-hidden ">
        <div className="container mx-auto pt-10 md:pt-15 z-10">
          {projectType.map((type, i) => {
            const filtered = projects.filter((val) => val.type === type.id);
            return (
              <div key={i} className="flex flex-col mt-10 gap-6">
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: [0, 1], x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="inline-block w-fit px-4 py-1 rounded-full font-bold text-xl bg-linear-to-l text-transparent bg-clip-text from-violet-300 via-violet-400 to-violet-500 shadow-xs shadow-violet-400 "
                >
                  {type.heading}
                </motion.h1>
                {/* grid layout */}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  whileInView={{ opacity: [0, 1], y: 0 }}
                  transition={{ duration: 1.3, delay: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid md:grid-cols-3 gap-6 md:gap-4 "
                >
                  {filtered.length === 0 ? (
                    <div className="col-span-full  flex items-center justify-center py-10 bg-slate-900 rounded-2xl min-h-60">
                      <p className="text-slate-400 px-1 text-sm text-center md:text-md">
                        No projects available in this category.
                      </p>
                    </div>
                  ) : (
                    filtered.map((project, i) => (
                      <ProjectCard key={i} data={project} />
                    ))
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -500 }}
                  whileInView={{ opacity: [0, 1], x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.3, delay: 0.6 }}
                  className="w-full   h-0.5 bg-linear-to-l rounded-full  from-indigo-400 via-indigo-500/50 to-transparent drop-shadow-[0_0_8px_#A78BFA]"
                />
              </div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: [0, 1], x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative mt-8"
          >
            {/* glow div */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-violet-500/30 via-indigo-500/10 to-violet-500/30 blur-md" />

            {/* main card */}
            <div className="flex flex-col items-center justify-center gap-3 h-44 bg-slate-900/80 backdrop-blur-md rounded-2xl  px-8 border border-slate-700 ">
              <span className="text-transparent bg-linear-to-r from-violet-400 via-indigo-400 to-violet-500 bg-clip-text font-semibold text-xs sm:text-sm md:text-lg flex items-center gap-2 text-center">
                More Projects Coming Soon
                <Rocket className="hidden  sm:flex size-4 text-red-400" />
              </span>

              <p className="text-center text-xs md:text-sm text-slate-300 md:leading-relaxed md:max-w-md w-full">
                I'm continuously learning and building new ideas. Stay tuned as
                more exciting projects and experiments will be added here very
                soon.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
