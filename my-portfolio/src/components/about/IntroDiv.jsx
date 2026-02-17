import Reveal from "../scrollAnimation/Reveal.jsx";

const IntroDiv = () => {
  const para = [
    "I’m a MERN Stack Developer who enjoys building modern, scalable web applications using MongoDB, Express.js, React.js, and Node.js.",

    "I focus on writing clean, maintainable code and structuring applications to scale efficiently as projects grow.",

    "I’m passionate about creating user-focused experiences that combine thoughtful UI design with reliable backend logic.",
  ];

  return (
    <div className="space-y-2 w-fit">
      <Reveal direction="left" duration={1.5} distance={70} className="mb-10">
        <p className="text-lg sm:text-xl md:text-4xl tracking-wide">
          <span className="bg-linear-to-r from-indigo-300/80 via-indigo-400 to-indigo-500 text-transparent bg-clip-text font-bold drop-shadow-[0_0_8px_rgba(130,130,248,0.7)]">
            From Concept to Code,{" "}
          </span>
          Where <span className=" italic font-sans">MERN</span> Meets Clean
          Architecture.
        </p>
      </Reveal>

      <Reveal duration={0.6} direction="up" delay={0.5} className=" space-y-3">
        {para.map((text, i) => (
          <p
            key={i}
            className="text-sm md:text-xl font-mono text-justify md:text-start text-slate-500"
          >
            {text}
          </p>
        ))}
      </Reveal>
    </div>
  );
};

export default IntroDiv;
