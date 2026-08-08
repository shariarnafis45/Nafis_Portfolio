"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HeroImage from "@/assets/nafis.png";

const smoothEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

const STAT_ICON_PATHS = {
  experience:
    "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-5.84 5.84h4.8m1.04-5.84a14.98 14.98 0 00-5.84-2.58",
  projects:
    "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  clients:
    "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
};

const STATS = [
  {
    id: "experience",
    value: "02+",
    label: "Years Experience",
    hover: "group-hover:bg-emerald-500/10 group-hover:text-emerald-500",
  },
  {
    id: "projects",
    value: "15+",
    label: "Projects Completed",
    hover: "group-hover:bg-sky-500/10 group-hover:text-sky-500",
  },
  {
    id: "clients",
    value: "10+",
    label: "Happy Clients",
    hover: "group-hover:bg-purple-500/10 group-hover:text-purple-500",
  },
];

const StatIcon = ({ id, className }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.75"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={STAT_ICON_PATHS[id]}
    />
  </svg>
);

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-14 sm:pb-16 lg:pt-40 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#F7F7F5] dark:bg-[#0A0A0A] transition-colors duration-700"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1f2937_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

      {/* Animated Glow Effect - Smoother */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.4, 0.3],
                rotate: [0, 45, 0],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-sky-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* 1. FLOATING SOCIAL SIDEBAR */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: smoothEase, delay: 0.8 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5 p-3 rounded-full bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-black/50"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#5F6368] dark:text-[#A0A0A0] hover:text-[#0A0A0A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#5F6368] dark:text-[#A0A0A0] hover:text-[#0A0A0A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </a>
        <a
          href="mailto:contact@shariarnafis.com"
          aria-label="Send Email"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#5F6368] dark:text-[#A0A0A0] hover:text-[#0A0A0A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </a>
      </motion.aside>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* 2. LEFT COLUMN - CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left justify-center order-2 lg:order-1 relative z-20"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md mb-6 lg:mb-8 transition-transform hover:scale-[1.02]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#5F6368] dark:text-[#A0A0A0] tracking-tight">
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[2.75rem] leading-[1.1] sm:text-6xl sm:leading-[1.08] lg:text-7xl font-bold tracking-tight text-[#0A0A0A] dark:text-white mb-4"
            >
              Hi, I&rsquo;m <br />
              <span className="bg-gradient-to-r from-[#0A0A0A] via-gray-700 to-[#0A0A0A] dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
                Shariar Nafis
              </span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-2xl text-[#5F6368] dark:text-[#8A8A8A] font-medium tracking-tight mb-9 lg:mb-10"
            >
              Full Stack Web Developer
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-medium tracking-tight bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] transition-all duration-300 ease-out hover:opacity-90 hover:-translate-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)] w-full sm:w-auto"
              >
                <span>View My Work</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.33331 8H12.6666M12.6666 8L8 3.33334M12.6666 8L8 12.6667"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-medium tracking-tight bg-white/80 dark:bg-white/5 text-[#0A0A0A] dark:text-white border border-black/[0.08] dark:border-white/10 backdrop-blur-md transition-all duration-300 ease-out hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.04)] w-full sm:w-auto"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 block dark:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#0A0A0A"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 hidden dark:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Mobile Fallback Social */}
            <motion.div
              variants={itemVariants}
              className="flex xl:hidden items-center gap-4 mt-8 pt-6 border-t border-black/5 dark:border-white/10 w-full justify-center lg:justify-start"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Follow Me
              </span>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-black transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-black transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 relative flex flex-col items-center justify-center order-1 lg:order-2 lg:-translate-x-8 xl:-translate-x-14 transition-transform duration-300">
            {/* Background Fluid Element */}
            <motion.div
              animate={
                shouldReduceMotion ? {} : { y: [0, -15, 0], rotate: [0, -2, 0] }
              }
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/2 w-[120%] h-[110%] bg-gradient-to-tr from-white/60 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 shadow-2xl dark:shadow-none pointer-events-none"
            />

            <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] aspect-[4/5] flex items-center justify-center z-10">
              {/* Rotating Ring */}
              <motion.div
                aria-hidden="true"
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 sm:-inset-3 rounded-full opacity-50 dark:opacity-30 pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(16,185,129,0.2), rgba(56,189,248,0.1), rgba(168,85,247,0.2), rgba(16,185,129,0.2))",
                  filter: "blur(24px)",
                }}
              />

              {/* Main Image Blob */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        borderRadius: [
                          "50% 50% 45% 55%/60% 45% 55% 40%",
                          "45% 55% 50% 50%/55% 50% 60% 45%",
                          "50% 50% 45% 55%/60% 45% 55% 40%",
                        ],
                      }
                }
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 overflow-hidden bg-gradient-to-tr from-white/95 via-white/50 to-white/20 dark:from-white/15 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-none"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={HeroImage}
                    alt="Shariar Nafis"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px"
                    className="object-cover object-top drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>

              {/* Stat Card */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: "-50%" }}
                animate={{ opacity: 1, x: 0, y: "-50%" }}
                transition={{ duration: 1.2, ease: smoothEase, delay: 0.6 }}
                className="hidden lg:block absolute top-[60%] -translate-y-1/2 -right-[110px] xl:-right-[140px] z-30"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="w-[220px] p-5 rounded-3xl bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-black/80 flex flex-col gap-5"
                >
                  {STATS.map((stat, i) => (
                    <React.Fragment key={stat.id}>
                      {i > 0 && (
                        <div className="h-[1px] w-full bg-black/[0.06] dark:bg-white/10" />
                      )}
                      <div className="flex items-center gap-4 group cursor-default">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-black dark:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${stat.hover}`}
                        >
                          <StatIcon id={stat.id} className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-white leading-none mb-1">
                            {stat.value}
                          </h3>
                          <p className="text-xs text-[#5F6368] dark:text-[#A0A0A0] font-medium leading-tight">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile / Tablet Stat Strip */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="lg:hidden mt-8 w-full max-w-[280px] sm:max-w-[360px] grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-white/90 dark:bg-white/10 border border-white dark:border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative z-20"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center gap-2 group cursor-default"
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-black dark:text-white transition-transform group-hover:scale-110 ${stat.hover}`}
                  >
                    <StatIcon id={stat.id} className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0A0A0A] dark:text-white leading-none mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] text-[#5F6368] dark:text-[#A0A0A0] font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: smoothEase }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#5F6368] dark:text-[#8A8A8A] pointer-events-none"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.svg
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
