import Reveal from "./scrollAnimation/Reveal.jsx";
import { projects } from "../lib/data.js";
import ProjectCard from "./project/ProjectCard.jsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
const Projects = () => {
  const latestProject = projects.slice(0, 3);
  const [isSmall, setIsSmall] = useState(false);

  // for the small device direction changing on screen size change
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const listener = (e) => setIsSmall(e.matches);

    setIsSmall(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const getDirection = (i) => {
    if (isSmall) return i % 2 === 0 ? "left" : "right";
    return i % 2 === 0 ? "up" : "down";
  };

  return (
    <section
      id="project"
      className="relative min-h-screen flex flex-col  w-full py-2 px-4 md:px-8 lg:px-20 xl:px-32 overflow-hidden"
    >
      <div className="container mx-auto pt-16 md:pt-24 z-10 ">
        <Reveal
          direction="left"
          duration={1}
          className="w-fit text-center mb-6"
        >
          <span className="text-md z-10 md:text-lg font-semibold drop-shadow-[0_0_8px_#8196f899] text-secondary-fg/80 px-4 py-1  rounded-full bg-slate-900/80 text-center">
            My Latest Projects
          </span>
        </Reveal>

        {/* All Latest Project show Here */}
        <div className="grid gap-6  md:grid-cols-3  md:gap-4">
          {latestProject.map((project, i) => (
            <Reveal
              key={`${i}-${isSmall}`}
              direction={getDirection(i)}
              distance={100}
              duration={isSmall ? 1 : 2}
              delay={0.4}
              className="flex"
            >
              <ProjectCard data={project} />
            </Reveal>
          ))}
        </div>

        {/* view all Projects div */}
        <Reveal
          className="mt-5 mx-auto w-fit"
          direction="up"
          duration={0.8}
          delay={0.5}
        >
          <p className="text-xs md:text-lg mb-2 font-bold text-transparent bg-linear-to-l from-indigo-300 via-indigo-400 to-indigo-500 bg-clip-text ">
            Want to see my all projects{" "}
            <span className="text-indigo-400 animate-pulse [animation-duration:1.5s] ">
              ?
            </span>
          </p>

          <Link to={"/projects"}>
            <button className="mx-auto px-4 py-1 mb-10 md:mb-0 transition-colors duration-300 rounded-full bg-linear-to-l from-violet-400 via-violet-500 to-violet-600 cursor-pointer hover:from-violet-300 hover:via-violet-400 hover:to-violet-500 flex text-xs sm:text-sm">
              View All
              <ArrowRight className="ml-2 size-3 md:size-4 self-center" />
            </button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
