import Image from "next/image";
import React from "react";
import Icon from "../../../public/logo.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      <div className="relative w-7 h-7 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
        <Image
          src={Icon}
          width={28}
          height={25}
          alt="Nafis Logo"
          className="invert dark:invert-0 object-contain transition-all duration-300"
          priority
        />
      </div>

      {/* Brand Identity Text */}
      <span className="text-lg font-bold tracking-tight text-[#0A0A0A] dark:text-white font-sans">
        Nafis <span className="text-[#5F6368] dark:text-[#8A8A8A]">.</span>
      </span>
    </div>
  );
};

export default Logo;
