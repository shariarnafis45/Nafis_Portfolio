"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { FaWordpress, FaCode, FaLayerGroup, FaRocket } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { FiTerminal } from "react-icons/fi";

// Replace with your actual assets path
import AboutImage from "@/assets/nafis.png";
import Icon from "../../public/logo.svg";
import SectionBadge from "./shared/SectionBadge";

const smoothEase = [0.22, 1, 0.36, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const JOURNEY = [
  {
    year: "2024",
    title: "Started with WordPress",
    desc: "Began my web development journey with WordPress, building websites and learning the fundamentals.",
    icon: <FaWordpress className="w-5 h-5 text-[#21759B]" />,
  },
  {
    year: "Late 2024 - Early 2025",
    title: "Exploring & Building",
    desc: "Worked on multiple projects, improved my front-end skills and started learning modern web technologies.",
    icon: <FaCode className="w-4 h-4 text-emerald-500" />,
  },
  {
    year: "Mid 2025",
    title: "MERN Stack Developer",
    desc: "Mastered the MERN stack and started building full stack scalable web applications.",
    icon: <FaLayerGroup className="w-4 h-4 text-blue-500" />,
  },
  {
    year: "Now",
    title: "Building & Growing",
    desc: "Continuously building impactful solutions, clean architectures and helping ideas become reality.",
    icon: <FaRocket className="w-4 h-4 text-amber-500" />,
  },
];

const CORE_FOCUS = [
  "Scalable Systems",
  "Clean Code Architecture",
  "High Performance",
  "Modern UI/UX",
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#F8F9FA] dark:bg-[#0A0A0A] transition-colors duration-700 font-sans"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1f2937_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            {/* Background Circular Aura */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Main Profile Frame */}
              <motion.div
                variants={fadeUpVariants}
                className="relative z-10 w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-neutral-950 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-black/60"
              >
                <Image
                  src={AboutImage}
                  alt="Shariar Nafis"
                  fill
                  className="object-cover object-top filter contrast-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              </motion.div>

              {/* Status Badge  */}
              <motion.div
                variants={fadeUpVariants}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -left-4 sm:-left-8 z-20 bg-white/95 dark:bg-[#121212]/95 px-4 py-3 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.08)] dark:shadow-black/60 border border-black/5 dark:border-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-[#1F2937] dark:text-[#E5E7EB] leading-tight">
                      Available for hire
                    </span>
                    <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF]">
                      new opportunities
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Senior IDE Snippet Box */}
              <motion.div
                variants={fadeUpVariants}
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-10 -left-4 sm:-left-12 z-30 w-[270px] sm:w-[310px] rounded-2xl bg-white/90 dark:bg-[#0E0E10]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.12)] dark:shadow-black/70 p-4"
              >
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                    <FiTerminal className="w-3 h-3" />
                    <span>developer.ts</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono leading-[1.7] text-gray-800 dark:text-gray-200">
                  <p>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">
                      const
                    </span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      developer
                    </span>{" "}
                    = {"{"}
                  </p>
                  <p className="pl-3">
                    name:{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &apos;Shariar Nafis&apos;
                    </span>
                    ,
                  </p>
                  <p className="pl-3">
                    role:{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &apos;Full Stack Dev&apos;
                    </span>
                    ,
                  </p>
                  <p className="pl-3">
                    stack: [
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &apos;MERN&apos;
                    </span>
                    ,{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &apos;Next.js&apos;
                    </span>
                    ],
                  </p>
                  <p className="pl-3">
                    mindset:{" "}
                    <span className="text-amber-600 dark:text-amber-400">
                      &apos;Clean & Scalable&apos;
                    </span>
                  </p>
                  <p>{"};"}</p>
                </div>
              </motion.div>
            </div>

            {/* Quote Card */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-16 sm:mt-20 w-full max-w-[380px] sm:max-w-[420px] bg-white dark:bg-[#121214] p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-black/40 border border-black/5 dark:border-white/10 relative transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl leading-none text-black/20 dark:text-white/20 font-serif select-none">
                  “
                </span>
                <div>
                  <p className="text-sm font-medium text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed mb-3">
                    I focus on building software where aesthetic frontend meets
                    robust and scalable architecture.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-[2px] bg-emerald-500 rounded-full" />
                    <span className="text-xs font-bold text-[#111827] dark:text-white tracking-wide uppercase">
                      Engineering Philosophy
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Core Tech Radar Chips */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-4 w-full max-w-[380px] sm:max-w-[420px] flex flex-wrap gap-2 pt-2"
            >
              {CORE_FOCUS.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-[#4B5563] dark:text-[#9CA3AF] bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] px-3 py-1 rounded-lg backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col justify-center lg:pl-6"
          >
            {/* Header Badge */}
            <motion.div variants={fadeUpVariants} className="mb-5">
              <SectionBadge title="About Me" />
            </motion.div>

            {/* Section Headline */}
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] dark:text-white leading-[1.18] tracking-tight mb-5"
            >
              Building Scalable Digital Products —{" "}
              <span className="text-[#4B5563] dark:text-[#9CA3AF]">
                The Nafix Standard.
              </span>
            </motion.h2>

            {/* Bio Body */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base sm:text-[1.05rem] text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed mb-8"
            >
              I&rsquo;m{" "}
              <strong className="text-[#111827] dark:text-white font-semibold">
                Shariar Nafis
              </strong>
              , a Full Stack Developer who bridges the gap between clean
              user-centric UI and high-concurrency backend systems. Starting
              from CMS customization, I evolved into building production-grade
              web applications utilizing the modern MERN & Next.js ecosystem.
            </motion.p>

            {/* Timeline Card Container */}
            <motion.div
              variants={fadeUpVariants}
              className="bg-white dark:bg-[#111113] border border-black/[0.07] dark:border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_35px_rgba(0,0,0,0.03)] dark:shadow-black/40 relative transition-all duration-300 hover:shadow-[0_12px_45px_rgba(0,0,0,0.06)]"
            >
              {/* Card Header with Nafis Logo */}
              <div className="flex items-center gap-3 mb-8 pb-5 border-b border-black/[0.06] dark:border-white/10">
                <div className="relative w-6 h-6 flex items-center justify-center transition-transform hover:scale-110">
                  <Image
                    src={Icon}
                    width={22}
                    height={22}
                    alt="Nafis Logo"
                    className="invert dark:invert-0 object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#111827] dark:text-white">
                  My Journey
                </h3>
              </div>

              {/* Timeline Items */}
              <div className="relative">
                {/* Continuous Connecting Line */}
                <div className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full" />

                <div className="flex flex-col gap-8">
                  {JOURNEY.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeUpVariants}
                      className="relative flex items-start group"
                    >
                      {/* Milestone Icon Node */}
                      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#161618] border-[3px] border-[#F8F9FA] dark:border-[#111113] shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-md flex-shrink-0">
                        {item.icon}
                      </div>

                      {/* Content Grid (Guaranteed Pixel-Perfect Alignment) */}
                      <div className="flex flex-col sm:grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 w-full pl-5 pt-1">
                        {/* Year Badge */}
                        <div>
                          <span className="inline-block text-[11px] font-bold text-[#1F2937] dark:text-[#E5E7EB] bg-black/[0.04] dark:bg-white/[0.08] px-3 py-1 rounded-full transition-colors group-hover:bg-black/[0.08] dark:group-hover:bg-white/15 whitespace-nowrap">
                            {item.year}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-[#111827] dark:text-white mb-1 transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
