"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionBadge from "./shared/SectionBadge";

// --- Animation Variants ---
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function CtaSection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-[#F8F9FA] dark:bg-[#0A0A0A] transition-colors duration-700 font-sans cursor-default">
      {/* Background Dotted Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1f2937_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card with Glassmorphism */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative bg-white/60 dark:bg-[#121214]/60 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] border border-white/80 dark:border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-10 sm:p-16 lg:p-20 overflow-hidden flex flex-col items-center text-center"
        >
          {/* Subtle Background Glow inside the card */}
          <div className="absolute -left-32 -top-32 w-72 h-72 bg-[#4A90E2]/10 dark:bg-[#4A90E2]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-72 h-72 bg-[#50E3C2]/10 dark:bg-[#50E3C2]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Background Watermark Text (Like "NAFIX." in the image) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none z-0">
            <h1 className="text-[12vw] md:text-[180px] font-black text-black/[0.02] dark:text-white/[0.02] leading-none text-center">
              NAFIX.
            </h1>
          </div>

          {/* Content (z-10 ensures it stays above the watermark) */}
          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Status Badge */}
            <motion.div variants={fadeUpVariants} className="mb-8">
              <SectionBadge title="Let's Work Together" />
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#111827] dark:text-white leading-[1.15] tracking-tight mb-6 max-w-4xl"
            >
              Let's Build Something <br className="hidden sm:block" />
              Great{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B5B84] to-[#39A296] dark:from-[#5C9CE6] dark:to-[#40D6C6]">
                Together.
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base sm:text-lg lg:text-xl text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
            >
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </motion.p>

            {/* Buttons Container */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              {/* Primary Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full text-base font-bold shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all overflow-hidden"
              >
                <span className="relative z-10">Let's Talk</span>
                <FiArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                {/* Hover gradient effect inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/10 to-black/0 dark:from-white/0 dark:via-black/5 dark:to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              </motion.a>

              {/* Secondary Button */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-transparent text-[#111827] dark:text-white border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/40 rounded-full text-base font-bold transition-all backdrop-blur-sm"
              >
                <span>View My Work</span>
                <FiArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
