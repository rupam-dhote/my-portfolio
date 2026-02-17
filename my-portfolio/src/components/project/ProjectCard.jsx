import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ data }) => {
  return (
    <div className=" bg-slate-900/40 shadow-sm shadow-slate-700 hover:shadow-slate-500 transition-shadow duration-200 rounded-2xl p-4 group flex-col flex justify-around gap-3 ">
      {/* image div */}
      <div className="relative rounded-lg overflow-hidden transition-all duration-200 group-hover:scale-102 ">
        <div className="absolute inset-0 group-hover:border border-white/40  bg-linear-to-tr from-transparent via-fg/20 to-transparent mix-blend-difference  -translate-x-full  group-hover:translate-x-0 transition-transform duration-400 rounded-lg ease-in-out" />
        <img src={data.image} alt={data.title} />
      </div>

      {/* heading and paragraph div */}
      <div className="spac-y-2">
        <h1 className="text-lg font-medium text-indigo-300">{data.title}</h1>
        <p className="text-sm text-slate-400 ">{data.description}</p>
      </div>

      {/* tech stack div */}
      <div className="space-y-1 ">
        <span className="text-sm">Tech Stack</span>
        <div className="w-fit flex flex-wrap gap-2 px-3 py-2 rounded-lg bg-black/30 border border-white/20">
          {data.tech.map((d, i) => (
            <p className="text-xs text-slate-500 " key={i}>
              {d}
            </p>
          ))}
        </div>
      </div>
      {/* buttons div */}
      <div className="flex gap-2  ">
        <button className="transition-colors duration-100 border-none hover:from-indigo-500 hover:via-indigo-400 hover:to-indigo-300 rounded-full flex  items-center gap-1 md:gap-2 py-1 px-3 hover:cursor-pointer  text-sm bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-400">
          <a href={"/"}>GitHub</a>
        </button>
        <button className=" transition-colors duration-100 border-none  rounded-full flex  items-center gap-0.5 py-1 px-3 hover:cursor-pointer text-sm bg-transparent hover:text-slate-400 hover:shadow-slate-500 shadow shadow-slate-500/80">
          <a href="/">Demo</a>
          <ArrowUpRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
