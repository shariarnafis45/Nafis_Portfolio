import React from "react";

const SectionBadge = ({ title, icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] backdrop-blur-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] dark:shadow-black/20 transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] group select-none">
      {icon ? (
        <span className="text-[#0A0A0A] dark:text-white transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      ) : (
        /* Consistent & Sophisticated Neutral Glow Dot */
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 dark:bg-white/40 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A0A0A] dark:bg-white" />
        </span>
      )}

      {/* Badge Text */}
      <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A] dark:text-white/90">
        {title}
      </span>
    </div>
  );
};

export default SectionBadge;
