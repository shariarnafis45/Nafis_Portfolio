"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import HeroImage from "@/assets/nafis.png";

const smoothEase = [0.22, 1, 0.36, 1];
const curtainEase = [0.76, 0, 0.24, 1];
const ROLE_INTERVAL = 4800; // ms between automatic role changes
const RESUME_URL =
  "https://drive.google.com/file/d/1ESjhsVWJoq0psdPGi9Fwp8XrFBs1e8PY/view?usp=sharing";
const WORK_TARGET = "projects"; // id of the Featured Works section

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

// Role swap states: the active role rises in, the previous one leaves upward.
const SWAP = {
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -16, filter: "blur(6px)" },
  idle: { opacity: 0, y: 16, filter: "blur(6px)" },
};

// Page-transition curtain used by "View My Work".
const CURTAIN = {
  hidden: { y: "120vh" },
  cover: { y: "0vh", transition: { duration: 0.75, ease: curtainEase } },
  reveal: {
    y: "-120vh",
    transition: { duration: 0.85, ease: curtainEase, delay: 0.12 },
  },
};

const ROLES = [
  {
    id: "fullstack",
    tab: "Full Stack",
    title: "Junior Full Stack Developer",
    blurb:
      "I build complete web apps: clean, responsive interfaces up front, with working APIs and databases behind them.",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    rgb: [16, 185, 129],
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
    tabActive:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    tint: "from-emerald-500/30 via-emerald-500/10",
    chip: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "frontend",
    tab: "Frontend",
    title: "Frontend Developer",
    blurb:
      "Fast, pixel-accurate interfaces in React and Next.js, with motion used to guide people rather than to decorate.",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    rgb: [14, 165, 233],
    text: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    bar: "bg-sky-500",
    tabActive: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    tint: "from-sky-500/30 via-sky-500/10",
    chip: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    id: "mern",
    tab: "MERN",
    title: "MERN Stack Developer",
    blurb:
      "MongoDB, Express, React and Node.js from schema design and REST APIs to a deployed, working product.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    rgb: [168, 85, 247],
    text: "text-purple-600 dark:text-purple-400",
    dot: "bg-purple-500",
    bar: "bg-purple-500",
    tabActive:
      "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300",
    tint: "from-purple-500/30 via-purple-500/10",
    chip: "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  },
  {
    id: "wordpress",
    tab: "WordPress",
    title: "WordPress Expert",
    blurb:
      "Custom themes, page-builder layouts and speed tuning for WordPress sites that clients can manage on their own.",
    stack: ["Custom Themes", "Elementor", "WooCommerce", "Speed & SEO"],
    rgb: [245, 158, 11],
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    tabActive:
      "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    tint: "from-amber-500/30 via-amber-500/10",
    chip: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
];

const TICKER = [
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "REST APIs",
  "WordPress",
  "Elementor",
  "WooCommerce",
  "Speed & SEO",
];

const SOCIALS = [
  {
    id: "github",
    label: "GitHub Profile",
    href: "https://github.com/shariarnafis45/",
    external: true,
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    id: "linkedin",
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/shariarnafis/",
    external: true,
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
  },
  {
    id: "email",
    label: "Send Email",
    href: "mailto:nafisshahworkmail@gmail.com",
    external: false,
    path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

const SocialIcon = ({ social, className }) =>
  social.id === "email" ? (
    <svg
      aria-hidden="true"
      className={`${className} fill-none stroke-current`}
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      className={`${className} fill-current`}
      viewBox="0 0 24 24"
    >
      <path d={social.path} />
    </svg>
  );

// One line of the headline, revealed from behind a mask.
const MaskLine = ({ children, className = "", delay = 0, reduce }) => (
  <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
    <motion.span
      className={`block ${className}`}
      initial={reduce ? false : { y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, ease: smoothEase, delay }}
    >
      {children}
    </motion.span>
  </span>
);

// Stacks every item in the same grid cell so height never jumps when the
// active role changes. Only the active item is visible.
const SwapStack = ({ items, active, prev, reduce, className = "" }) => (
  <div className={`grid ${className}`}>
    {items.map((node, i) => (
      <motion.div
        key={i}
        aria-hidden={i !== active}
        className="[grid-area:1/1]"
        variants={SWAP}
        initial={false}
        animate={i === active ? "in" : i === prev ? "out" : "idle"}
        transition={{ duration: reduce ? 0 : 0.7, ease: smoothEase }}
      >
        {node}
      </motion.div>
    ))}
  </div>
);

const StackTicker = ({ run }) => {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <motion.div
        className="flex w-max gap-3 will-change-transform"
        animate={run ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={
          run
            ? { duration: 34, ease: "linear", repeat: Infinity }
            : { duration: 0 }
        }
      >
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-4 py-2 text-sm font-medium tracking-tight text-[#5F6368] dark:text-[#A0A0A0] whitespace-nowrap"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${ROLES[i % ROLES.length].dot}`}
            />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const live = !reduce && inView; // gate every infinite animation

  /* ---- role switcher: auto-advances, click to jump ---- */
  const [[active, prev], setPair] = useState([0, -1]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => {
      setPair(([a]) => [(a + 1) % ROLES.length, a]);
    }, ROLE_INTERVAL);
    return () => clearTimeout(id);
  }, [active, tick, reduce, inView]);

  const selectRole = (i) => {
    setPair(([a]) => [i, a === i ? prev : a]);
    setTick((t) => t + 1);
  };

  const role = ROLES[active];
  const [r, g, b] = role.rgb;

  // Share the role colour with the global SiteEffects layer (dots + cursor ring)
  useEffect(() => {
    document.documentElement.style.setProperty("--fx", role.rgb.join(","));
  }, [role]);

  /* ---- portrait tilt (mouse only) ---- */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });

  // Listener sits on the un-rotated wrapper so the measured rect never jitters.
  const handleTilt = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  /* ---- "View My Work": curtain wipe, jump under cover, curtain lifts ---- */
  const curtain = useAnimationControls();
  const [wiping, setWiping] = useState(false);
  const busy = useRef(false);

  const goToWork = async (e) => {
    const target = document.getElementById(WORK_TARGET);
    if (!target) return; // fall back to the normal anchor jump
    e.preventDefault();

    const land = () => {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: "instant",
      });
      history.replaceState(null, "", `#${WORK_TARGET}`);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    if (reduce) {
      land();
      return;
    }
    if (busy.current) return;
    busy.current = true;
    setWiping(true);
    await curtain.start("cover");
    land();
    await curtain.start("reveal");
    curtain.set("hidden");
    setWiping(false);
    busy.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow behind the portrait */}
      <motion.div
        aria-hidden="true"
        animate={
          live ? { scale: [1, 1.12, 1], opacity: [0.35, 0.5, 0.35] } : {}
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[24%] -right-[20%] lg:right-[2%] w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] bg-gradient-to-tr from-emerald-500/15 via-sky-500/15 to-purple-500/15 rounded-full blur-[90px] pointer-events-none transform-gpu"
      />

      {/* Floating social sidebar (xl and up) */}
      <motion.aside
        initial={reduce ? false : { x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: smoothEase, delay: 0.8 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5 p-3 rounded-full bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-black/50"
      >
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            {...(s.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={s.label}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#5F6368] dark:text-[#A0A0A0] hover:text-[#0A0A0A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <SocialIcon social={s} className="w-5 h-5" />
          </a>
        ))}
      </motion.aside>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 xl:pl-24 2xl:pl-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* ------------------------- LEFT: CONTENT ------------------------- */}
          <motion.div
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left relative z-20"
          >
            {/* Availability */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md mb-6 lg:mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#5F6368] dark:text-[#A0A0A0] tracking-tight">
                Open to junior roles &amp; freelance projects
              </span>
            </motion.div>

            {/* Name */}
            <h1
              aria-label="Hi, I’m Shariar Nafis"
              className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[-0.035em] text-[#0A0A0A] dark:text-white"
            >
              <MaskLine
                delay={0.35}
                reduce={reduce}
                className="text-[#5F6368] dark:text-[#8A8A8A] font-medium"
              >
                Hi, I&rsquo;m
              </MaskLine>
              <MaskLine delay={0.5} reduce={reduce}>
                <span className="bg-gradient-to-r from-[#0A0A0A] via-gray-600 to-[#0A0A0A] dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
                  Shariar Nafis
                </span>
              </MaskLine>
            </h1>

            {/* Screen readers get every role at once */}
            <h2 className="sr-only">
              Junior Full Stack Developer, Frontend Developer, MERN Stack
              Developer and WordPress Expert
            </h2>

            {/* Rotating role */}
            <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
              <SwapStack
                active={active}
                prev={prev}
                reduce={reduce}
                items={ROLES.map((ro) => (
                  <p
                    key={ro.id}
                    className={`text-[1.35rem] sm:text-3xl lg:text-[2rem] font-semibold tracking-tight transition-colors duration-500 ${ro.text}`}
                  >
                    {ro.title}
                  </p>
                ))}
              />
            </motion.div>

            {/* Role description */}
            <motion.div
              variants={itemVariants}
              className="mt-4 max-w-xl"
              aria-live="polite"
            >
              <SwapStack
                active={active}
                prev={prev}
                reduce={reduce}
                items={ROLES.map((ro) => (
                  <p
                    key={ro.id}
                    className="text-base sm:text-lg leading-relaxed text-[#5F6368] dark:text-[#A0A0A0]"
                  >
                    {ro.blurb}
                  </p>
                ))}
              />
            </motion.div>

            {/* Role tabs with auto-advance progress */}
            <motion.div
              variants={itemVariants}
              role="tablist"
              aria-label="Areas of expertise"
              className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {ROLES.map((ro, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={ro.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectRole(i)}
                    className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                      isActive
                        ? ro.tabActive
                        : "border-black/[0.08] dark:border-white/10 bg-white/60 dark:bg-white/5 text-[#5F6368] dark:text-[#A0A0A0] hover:text-[#0A0A0A] dark:hover:text-white"
                    }`}
                  >
                    {ro.tab}
                    {isActive && !reduce && (
                      <motion.span
                        key={`${active}-${tick}-${inView}`}
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: inView ? 1 : 0 }}
                        transition={{
                          duration: inView ? ROLE_INTERVAL / 1000 : 0,
                          ease: "linear",
                        }}
                        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left ${ro.bar}`}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <a
                href={`#${WORK_TARGET}`}
                onClick={goToWork}
                data-cursor="View"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-medium tracking-tight bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] transition-all duration-300 ease-out hover:opacity-90 hover:-translate-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)] w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <span>View My Work</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 3.33334V12.6667M8 12.6667L3.33331 8M8 12.6667L12.6666 8"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-medium tracking-tight bg-white/80 dark:bg-white/5 text-[#0A0A0A] dark:text-white border border-black/[0.08] dark:border-white/10 backdrop-blur-md transition-all duration-300 ease-out hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.04)] w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>View Resume</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.div>

            {/* Mobile / tablet social row (sidebar takes over at xl) */}
            <motion.div
              variants={itemVariants}
              className="flex xl:hidden items-center gap-4 mt-8 pt-6 border-t border-black/5 dark:border-white/10 w-full justify-center lg:justify-start"
            >
              <span className="text-sm font-medium text-[#5F6368] dark:text-[#8A8A8A]">
                Find me on
              </span>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    {...(s.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={s.label}
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-[#5F6368] dark:text-[#A0A0A0] hover:text-[#0A0A0A] dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  >
                    <SocialIcon social={s} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ------------------------ RIGHT: PORTRAIT ------------------------ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: smoothEase, delay: 0.4 }}
              className="relative w-full max-w-[290px] sm:max-w-[370px] lg:max-w-[420px]"
            >
              {/* Slow float */}
              <motion.div
                animate={live ? { y: [0, -10, 0] } : { y: 0 }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Mouse tilt */}
                <motion.div
                  style={{ rotateX, rotateY, transformPerspective: 1100 }}
                  className="relative aspect-[4/5]"
                >
                  {/* Orbit ring peeking above the arch, dot follows role colour */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-[7%] flex justify-center pointer-events-none"
                  >
                    <motion.div
                      animate={live ? { rotate: 360 } : {}}
                      transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="relative aspect-square w-[118%] shrink-0 rounded-full border border-dashed border-black/15 dark:border-white/15"
                    >
                      <span
                        className={`absolute left-1/2 top-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ring-4 ring-[#F7F7F5] dark:ring-[#0A0A0A] transition-colors duration-500 ${role.dot}`}
                      />
                    </motion.div>
                  </div>

                  {/* Offset outline arch for depth */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-t-[50%/40%] rounded-b-[2rem] border border-black/10 dark:border-white/15"
                  />

                  {/* Soft shadow lives on its own layer so the reveal clip never cuts it */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-t-[50%/40%] rounded-b-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.10)] dark:shadow-black/60"
                  />

                  {/* Main arch */}
                  <motion.div
                    initial={
                      reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }
                    }
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    transition={{
                      duration: 1.3,
                      ease: smoothEase,
                      delay: 0.45,
                    }}
                    className="absolute inset-0 overflow-hidden rounded-t-[50%/40%] rounded-b-[2rem] border border-black/[0.06] dark:border-white/10 bg-white/70 dark:bg-white/[0.04]"
                  >
                    {ROLES.map((ro, i) => (
                      <motion.div
                        key={ro.id}
                        aria-hidden="true"
                        initial={false}
                        animate={{ opacity: i === active ? 1 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.9 }}
                        className={`absolute inset-0 bg-gradient-to-b ${ro.tint} to-transparent`}
                      />
                    ))}
                    <Image
                      src={HeroImage}
                      alt="Shariar Nafis"
                      fill
                      priority
                      sizes="(max-width: 640px) 290px, (max-width: 1024px) 370px, 420px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 dark:from-black/60 to-transparent pointer-events-none" />
                  </motion.div>

                  {/* Toolkit card: changes with the active role */}
                  <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 z-10 rounded-2xl border border-white/70 dark:border-white/10 bg-white/85 dark:bg-[#0A0A0A]/75 backdrop-blur-xl p-3 sm:p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full transition-colors duration-500 ${role.dot}`}
                      />
                      <SwapStack
                        active={active}
                        prev={prev}
                        reduce={reduce}
                        items={ROLES.map((ro) => (
                          <span
                            key={ro.id}
                            className="text-xs font-semibold text-[#0A0A0A] dark:text-white"
                          >
                            {ro.tab} toolkit
                          </span>
                        ))}
                      />
                    </div>
                    <SwapStack
                      active={active}
                      prev={prev}
                      reduce={reduce}
                      items={ROLES.map((ro) => (
                        <div key={ro.id} className="flex flex-wrap gap-1.5">
                          {ro.stack.map((s) => (
                            <span
                              key={s}
                              className={`rounded-full border px-2.5 py-1 text-[11px] sm:text-xs font-medium ${ro.chip}`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      ))}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --------------------------- STACK TICKER --------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: smoothEase, delay: 1 }}
          className="mt-14 lg:mt-20"
        >
          <StackTicker run={live} />
        </motion.div>
      </div>

      {/* Page-transition curtain for "View My Work" */}
      <motion.div
        aria-hidden="true"
        variants={CURTAIN}
        initial="hidden"
        animate={curtain}
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
        className={`fixed inset-x-0 -top-[15vh] z-[100] flex h-[130vh] items-center justify-center rounded-[50%/8vh] ${
          wiping ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-white">
          <span className="text-sm font-medium tracking-tight text-white/80">
            Up next
          </span>
          <span className="text-4xl sm:text-6xl font-bold tracking-[-0.03em]">
            Featured Works
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
