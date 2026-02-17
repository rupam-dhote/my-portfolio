import FeatureList from "./about/FeatureList.jsx";
import IntroDiv from "./about/IntroDiv.jsx";
import Reveal from "./scrollAnimation/Reveal.jsx";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col  md:flex-row md:justify-between w-full py-4 px-4 md:px-8 lg:px-20 xl:px-24 overflow-hidden "
    >
      {/* div glow */}
      <div className=" absolute inset-0 bg-linear-to-l from-indigo-500/10 via-transparent to-slate-900/40 -z-10" />
      {/* content div */}
      <div className="container mx-auto md:px-6 pt-16 md:pt-24 z-10 ">
        <Reveal
          direction="down"
          duration={1}
          className="w-fit mb-6 md:mx-auto md:mb-10 text-center"
        >
          <span className="text-sm md:text-lg font-semibold drop-shadow-[0_0_8px_rgba(129,140,248,0.6)] text-indigo-400">
            About Me
          </span>

          <Reveal direction="left" duration={0.6} delay={1}>
            <div className="mx-auto md:mt-1 h-0.5 w-16 md:w-[5.4rem] rounded-full bg-linear-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
          </Reveal>
        </Reveal>

        <div className=" grid md:grid-cols-2 gap-3">
          {/* left part div about text */}
          <IntroDiv />
          {/* right part div */}
          <div className="sm:ml-2 mt-5 md:mt-0 lg:ml-0">
            <FeatureList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
