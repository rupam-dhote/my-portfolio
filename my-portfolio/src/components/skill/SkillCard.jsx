import { motion } from "framer-motion";
import { X } from "lucide-react";
import useSound from "../../hook/useSound";
import { useEffect } from "react";

const SkillCard = ({ skill, onClose, shadow }) => {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.level / 100) * circumference;
  // Selecting sound based on the open or closed

  const playOnClosed = useSound("./sound/cardOpen.mp3");

  // Gradient color based on level
  const getGradient = () => {
    if (skill.level > 80) return ["#22c55e", "#4ade80"]; // green
    if (skill.level > 60) return ["#6366f1", "#818cf8"]; // indigo
    if (skill.level > 40) return ["#f59e0b", "#fbbf24"]; // amber
    return ["#ef4444", "#f87171"]; // red
  };

  const [start, end] = getGradient();

  const handleClose = () => {
    playOnClosed();
    setTimeout(onClose, 100);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-2 sm:px-4">
      <motion.div
        initial={{ rotateY: 180, scale: 0.6, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        exit={{ rotateY: -180, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-80 p-4 md:p-6 rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-[0_0_40px_rgba(129,140,248,0.3)]"
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute top-3 cursor-pointer right-3 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* BADGE */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
          {skill.type}
        </span>

        {/* ICON + NAME */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <motion.img
            src={skill.img}
            alt={skill.name}
            className={`h-14 md:16 ${shadow}`}
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-violet-300 via-violet-400 to-violet-500">
            {skill.name}
          </h3>
        </div>

        {/* CIRCULAR PROGRESS */}
        <div className="flex justify-center flex-col items-center mt-6">
          <svg width="140" height="140">
            <defs>
              <linearGradient id="grad">
                <stop offset="0%" stopColor={start} />
                <stop offset="100%" stopColor={end} />
              </linearGradient>
            </defs>

            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#1e293b"
              strokeWidth="12"
              fill="none"
            />

            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke="url(#grad)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5 }}
            />

            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-white text-center text- font-bold"
            >
              {skill.level}%
            </text>
          </svg>
          <p className="text-sm text-slate-500 font-medium">Skill Level</p>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-6 w-full text-center text-xs sm:text-sm text-slate-300 leading-relaxed">
          {skill.description}
        </p>
      </motion.div>
    </div>
  );
};

export default SkillCard;
