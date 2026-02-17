import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, DownloadIcon } from "lucide-react";
import Typing from "./hero/Typing.jsx";
import MotionParticles from "./hero/MotionParticles.jsx";
import Reveal from "./scrollAnimation/Reveal.jsx";

const Hero = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const typingSpeed = isMobile ? 200 : 140;
  const deleteSpeed = isMobile ? 160 : 100;
  const roles = ["Full-Stack developer", "Web developer", "UI/UX Designer"];

  const logos = [
    {
      path: "./skills/mongoDb.webp",
      alt: "MongoDb",
      h: "h-[2rem]",
      glow: "#4db33d",
      link: "https://www.mongodb.com/docs/",
    },
    {
      path: "./skills/express.svg",
      alt: "Express.js",
      h: "h-4",
      glow: "#9ca3af",
      link: "https://expressjs.com/en/guide/routing.html",
    },
    {
      path: "./skills/react.png",
      alt: "React.js",
      h: "h-5",
      glow: "#61dafb",
      link: "https://react.dev/learn",
    },
    {
      path: "./skills/nodejs.webp",
      alt: "Node.js",
      h: "h-5",
      glow: "#68a063",
      link: "https://www.w3schools.com/nodejs/",
    },
  ];
  return (
    <section
      id="home"
      className="relative min-h-screen z-1 transition-all duration-200 flex flex-col items-center md:flex-row md:justify-between w-full p-4 md:px-8 lg:px-20 xl:px-24 overflow-hidden "
    >
      {/* background particles */}
      <MotionParticles />
      {/* bg image to look good */}
      <div className=" absolute inset-0">
        <img
          src="/herobg.png"
          alt="hero bg"
          className=" w-full h-full opacity-30 object-cover"
        />
        <div className=" absolute inset-0 bg-linear-to-b from-bg/20 via-bg/30 to-bg" />
      </div>

      {/* content div for the left and right part */}
      <div className="relative container mx-auto md:px-6 pt-32 z-10 ">
        <div className=" grid md:grid-cols-2  lg:mb-10">
          {/* Left part for  intro */}
          <div className="space-y-8">
            <Reveal direction="down" duration={1}>
              <span className="inline-flex gap-2 py-2 px-4 rounded-full text-xs sm:text-sm text-primary bg-slate-800/30 backdrop-blur-lg md:backdrop-blur-xl items-center">
                <span className="h-2 w-2 bg-indigo-600/80 rounded-full animate-pulse" />
                Full Stack Devloper. UI/UX Designer
              </span>
            </Reveal>

            {/* text wala div */}
            <div>
              <Reveal
                direction="left"
                duration={1}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight "
              >
                Hello, It's Me
              </Reveal>
              <Reveal
                direction="up"
                duration={1.5}
                className="text-4xl xs:text-5xl md:text-6xl font-semibold"
              >
                Rupam Dhote
              </Reveal>

              {/* animation on text changing */}
              <Reveal
                direction="left"
                delay={0.8}
                duration={1}
                className="text-lg sm:text-xl mt-2 md:text-2xl lg:text-3xl xl:text-4xl leading-tight "
              >
                I am a{" "}
                <Typing
                  typingSpeed={typingSpeed}
                  deleteSpeed={deleteSpeed}
                  roles={roles}
                />
              </Reveal>
              <Reveal
                direction="up"
                yu={20}
                delay={0.8}
                duration={0.8}
                className="mt-2 "
              >
                <p className="text-slate-400 text-xs sm:text-sm text-justify sm:text-normal mt-5 md:mt-0">
                  I’m a MERN Stack Developer focused on creating clean,
                  efficient, and scalable web applications, continuously
                  learning and improving to build better digital solutions.
                </p>
              </Reveal>
              {/* button div for download cv */}

              <Reveal
                direction="left"
                delay={1.2}
                duration={1}
                className="my-6 md:my-4 flex gap-2 w-full"
              >
                <a href="#cont">
                  <button className=" transition-all duration-200 active:scale-95 cursor-pointer border-none hover:from-indigo-500 hover:via-indigo-400 hover:to-indigo-300 rounded-full flex  items-center gap-1 md:gap-2 py-2 px-3 sm:px-4 md:px-6  text-sm bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-400">
                    Contact Me
                    <ArrowRight className="size-4" />
                  </button>
                </a>
                <button className="cursor-pointer transition-all active:scale-95 duration-200 border-none shadow shadow-slate-700 hover:shadow-slate-500 rounded-full flex  items-center gap-2 py-2 px-4 sm:px-6 md:px-8 bg-transparent text-sm">
                  <DownloadIcon className="size-4" />
                  Resume
                </button>
              </Reveal>
              {/* MERN Images div */}
              <Reveal
                direction="up"
                delay={1}
                duration={1}
                className="flex gap-3 "
              >
                {logos.map((logo, i) => (
                  <span
                    key={i}
                    className="flex transition-all duration-300 ease-in-out items-center justify-center h-10 w-10  rounded-xl bg-white/10 hover:scale-110 cursor-pointer"
                    style={{
                      filter: `drop-shadow(0 0 0 transparent)`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = `drop-shadow(0 0 6px ${logo.glow})`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = `drop-shadow(0 0 0 transparent)`)
                    }
                  >
                    <a href={logo.link} target="_blank">
                      <img
                        src={logo.path}
                        alt={logo.alt}
                        className={`${logo.h} `}
                      />
                    </a>
                  </span>
                ))}
              </Reveal>
            </div>
          </div>

          {/* Right part for image */}
          <motion.div
            initial={{ opacity: 0, x: 250 }}
            animate={{
              x: 0,
              y: [0, -10, 0],
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
              x: { duration: 1.5, ease: "easeOut" },
              y: isMobile
                ? { duration: 0 }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mt-20 md:mt-0 relative max-w-md mx-auto transition-colors duration-300"
          >
            <div
              className="absolute inset-0 bg-linear-to-br from-indigo-500/40 rounded-3xl via-400/40 to-indigo-500/20 blur-lg md:blur-xl  animate-pulse 
    "
            />
            <div className="relative bg-transparent md:backdrop-blur-xl p-2 rounded-3xl w-full">
              <div className="bg-bg/90 rounded-2xl overflow-hidden z-10">
                <img
                  src="./dummy_profile.png"
                  alt="my-pic"
                  className="w-full aspect-4/5 object-cover rounded-2xl z-10 "
                />

                <div className="absolute -bottom-4 bg-bg/40 -right-4 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm font-medium">
                      Available to work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="flex transition-colors duration-500 items-center justify-center  bg-slate-700/20  rounded-full w-5 h-5 p-5  animate-bounce hover:bg-slate-800/70 cursor-pointer hover:text-slate-400 mx-auto mt-14 md:mt-0 "
        >
          <a href="#about" className="inline-flex p-4">
            <ChevronDown className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
