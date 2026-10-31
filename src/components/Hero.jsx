"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import HeroImage from "@/assets/nafis.png";

import { useCurtainNav } from "@/components/shared/CurtainNav";
import { FOCUS, MAILTO, SITE, smoothEase } from "@/lib/site";

const ROLE_INTERVAL = 5000;
const WORK_TARGET = "projects"; 

/* Ambient motion lives in CSS so one pause control can freeze it in place. */
const HERO_CSS = `
@keyframes hero-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes hero-orbit { to { transform: rotate(360deg) } }
@keyframes hero-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
@keyframes hero-glow { 0%, 100% { transform: scale(1); opacity: .35 } 50% { transform: scale(1.12); opacity: .5 } }
`;

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

// Focus-area swap: the active item rises in, the previous one leaves upward.
const SWAP = {
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -16, filter: "blur(6px)" },
  idle: { opacity: 0, y: 16, filter: "blur(6px)" },
};


const ROLES = [
  {
    id: "fullstack",
    tab: "Full Stack",
    title: "Junior Full Stack Engineer",
    blurb:
      "I build complete web apps: clean, responsive interfaces up front, with working APIs and databases behind them.",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    rgb: [16, 185, 129],
    text: "text-emerald-700 dark:text-emerald-400",
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
    text: "text-sky-700 dark:text-sky-400",
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
    text: "text-purple-700 dark:text-purple-400",
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
    text: "text-amber-700 dark:text-amber-400",
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
    label: "GitHub profile",
    href: SITE.github,
    external: true,
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    id: "linkedin",
    label: "LinkedIn profile",
    href: SITE.linkedin,
    external: true,
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
  },
  {
    id: "email",
    label: "Send email",
    href: MAILTO,
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
  <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
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

// Stacked items sharing one grid cell; only the active one is visible and read.
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

const StackTicker = ({ run, reduce }) => {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div
        className="flex w-max gap-3 pr-3 will-change-transform"
        style={{
          animation: reduce ? "none" : "hero-marquee 34s linear infinite",
          animationPlayState: run ? "running" : "paused",
        }}
      >
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/[0.06] bg-white/70 px-4 py-2 text-sm font-medium tracking-tight text-[#5F6368] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#A0A0A0]"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${ROLES[i % ROLES.length].dot}`}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

/* One control that freezes every ambient animation (WCAG 2.2.2). */
const MotionToggle = ({ paused, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={paused}
    aria-label="Pause animations"
    data-cursor={paused ? "Play" : "Pause"}
    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white/80 text-[#5F6368] transition-colors hover:text-[#0A0A0A] motion-reduce:transition-none dark:border-white/10 dark:bg-white/5 dark:text-[#8A8A8A] dark:hover:text-white ${FOCUS}`}
  >
    {paused ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4 fill-current"
      >
        <path d="M4.5 2.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1L5.42 2.3a.6.6 0 0 0-.92.5z" />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4 fill-current"
      >
        <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
        <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
      </svg>
    )}
  </button>
);

const HeroSection = () => {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const { go, curtain } = useCurtainNav();

  const [paused, setPaused] = useState(false); // user pressed the pause control
  const [held, setHeld] = useState(false); // pointer or focus is on the copy
  const live = !reduce && inView && !paused; // gate every infinite animation

  /* ---- focus areas ----
     Auto-tour once (Full Stack -> Frontend -> MERN -> WordPress), settle back on
     the lead role and stop. Any manual choice, hover, focus or pause stops it. */
  const [[active, prev], setPair] = useState([0, -1]);
  const [auto, setAuto] = useState(true);
  const running = auto && !reduce && inView && !paused && !held;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      if (active === ROLES.length - 1) {
        setPair(([a]) => [0, a]);
        setAuto(false);
      } else {
        setPair(([a]) => [a + 1, a]);
      }
    }, ROLE_INTERVAL);
    return () => clearTimeout(id);
  }, [active, running]);

  const selectRole = (i) => {
    setAuto(false);
    setPair(([a]) => [i, a === i ? prev : a]);
  };

  const role = ROLES[active];

  // Share the role colour with the global SiteEffects layer (dots, cursor, ink)
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

  const anim = (name, duration, easing) => ({
    animation: reduce ? "none" : `${name} ${duration} ${easing} infinite`,
    animationPlayState: live ? "running" : "paused",
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pb-12 pt-28 focus:outline-none sm:pb-16 lg:pb-16 lg:pt-36"
    >
      <style>{HERO_CSS}</style>

      {/* Ambient glow behind the portrait */}
      <div
        aria-hidden="true"
        style={anim("hero-glow", "12s", "ease-in-out")}
        className="pointer-events-none absolute -right-[20%] top-[24%] h-[460px] w-[460px] transform-gpu rounded-full bg-gradient-to-tr from-emerald-500/15 via-sky-500/15 to-purple-500/15 opacity-[0.35] blur-[90px] sm:h-[560px] sm:w-[560px] lg:right-[2%]"
      />

      {/* Main container */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:pl-24 2xl:pl-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* ------------------------- LEFT: CONTENT ------------------------- */}
          <motion.div
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
            onPointerEnter={() => setHeld(true)}
            onPointerLeave={() => setHeld(false)}
            onFocusCapture={() => setHeld(true)}
            onBlurCapture={() => setHeld(false)}
            className="relative z-20 flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            {/* Availability */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/80 px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 lg:mb-8"
            >
              <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"
                  style={{ animationPlayState: live ? "running" : "paused" }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium tracking-tight text-[#5F6368] dark:text-[#A0A0A0] sm:text-sm">
                {SITE.availability}
              </span>
            </motion.div>

            {/* Name */}
            <h1
              id="hero-heading"
              className="text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0A0A0A] dark:text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              <MaskLine
                delay={0.35}
                reduce={reduce}
                className="font-medium text-[#5F6368] dark:text-[#8A8A8A]"
              >
                Hi, I&rsquo;m
              </MaskLine>
              <MaskLine delay={0.5} reduce={reduce}>
                <span className="bg-gradient-to-r from-[#0A0A0A] via-gray-600 to-[#0A0A0A] bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
                  {SITE.name}
                </span>
              </MaskLine>
            </h1>

            {/* Screen readers get every role at once */}
            <h2 className="sr-only">
              {ROLES.slice(0, -1)
                .map((ro) => ro.title)
                .join(", ")}{" "}
              and {ROLES[ROLES.length - 1].title}
            </h2>

            {/* Rotating role title (visual only; the heading above is the text alternative) */}
            <motion.div
              variants={itemVariants}
              aria-hidden="true"
              className="mt-5 sm:mt-6"
            >
              <SwapStack
                active={active}
                prev={prev}
                reduce={reduce}
                items={ROLES.map((ro) => (
                  <p
                    key={ro.id}
                    className={`text-[1.35rem] font-semibold tracking-tight transition-colors duration-500 motion-reduce:transition-none sm:text-3xl lg:text-[2rem] ${ro.text}`}
                  >
                    {ro.title}
                  </p>
                ))}
              />
            </motion.div>

            {/* Supporting line for the chosen focus area */}
            <motion.div variants={itemVariants} className="mt-4 max-w-xl">
              <SwapStack
                active={active}
                prev={prev}
                reduce={reduce}
                items={ROLES.map((ro) => (
                  <p
                    key={ro.id}
                    className="text-base leading-relaxed text-[#5F6368] dark:text-[#A0A0A0] sm:text-lg"
                  >
                    {ro.blurb}
                  </p>
                ))}
              />
            </motion.div>

            {/* Focus-area toggles */}
            <motion.div
              variants={itemVariants}
              role="group"
              aria-label="Focus areas"
              className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {ROLES.map((ro, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={ro.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectRole(i)}
                    className={`relative h-10 overflow-hidden rounded-full border px-4 text-sm font-medium tracking-tight transition-colors duration-300 motion-reduce:transition-none ${FOCUS} ${
                      isActive
                        ? ro.tabActive
                        : "border-black/[0.08] bg-white/60 text-[#5F6368] hover:text-[#0A0A0A] dark:border-white/10 dark:bg-white/5 dark:text-[#A0A0A0] dark:hover:text-white"
                    }`}
                  >
                    {ro.tab}
                    {isActive && auto && !reduce && (
                      <motion.span
                        key={`${active}-${running}`}
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: running ? 1 : 0 }}
                        transition={{
                          duration: running ? ROLE_INTERVAL / 1000 : 0,
                          ease: "linear",
                        }}
                        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left ${ro.bar}`}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* CTAs: one primary, one secondary. "Let's talk" lives in the nav and dock. */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-5"
            >
              <a
                href={`#${WORK_TARGET}`}
                onClick={go(WORK_TARGET, "Featured Works")}
                data-cursor="View"
                className={`group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#0A0A0A] px-8 text-base font-medium tracking-tight text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 hover:opacity-90 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white dark:text-[#0A0A0A] dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)] sm:w-auto ${FOCUS}`}
              >
                <span>View my work</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
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
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className={`inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-black/[0.08] bg-white/80 px-8 text-base font-medium tracking-tight text-[#0A0A0A] shadow-[0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:w-auto ${FOCUS}`}
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
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
                <span>View resume</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.div>

            {/* Social row (all screen sizes) */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex w-full items-center justify-center gap-4 border-t border-black/5 pt-6 dark:border-white/10 lg:justify-start"
            >
              <span className="text-sm font-medium text-[#5F6368] dark:text-[#8A8A8A]">
                Find me on
              </span>
              <ul className="flex gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      {...(s.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={
                        s.external ? `${s.label} (opens in a new tab)` : s.label
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-[#5F6368] transition-colors hover:text-[#0A0A0A] motion-reduce:transition-none dark:border-white/10 dark:bg-white/5 dark:text-[#A0A0A0] dark:hover:text-white ${FOCUS}`}
                    >
                      <SocialIcon social={s} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ------------------------ RIGHT: PORTRAIT ------------------------ */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <motion.div
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: smoothEase, delay: 0.4 }}
              className="relative w-full max-w-[290px] sm:max-w-[370px] lg:max-w-[420px]"
            >
              {/* Slow float */}
              <div style={anim("hero-float", "7s", "ease-in-out")}>
                {/* Mouse tilt */}
                <motion.div
                  style={{ rotateX, rotateY, transformPerspective: 1100 }}
                  className="relative aspect-[4/5]"
                >
                  {/* Orbit ring peeking above the arch; the dot follows the focus colour */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-[7%] flex justify-center"
                  >
                    <div
                      style={anim("hero-orbit", "60s", "linear")}
                      className="relative aspect-square w-[118%] shrink-0 rounded-full border border-dashed border-black/15 dark:border-white/15"
                    >
                      <span
                        className={`absolute left-1/2 top-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ring-4 ring-[#F7F7F5] transition-colors duration-500 motion-reduce:transition-none dark:ring-[#0A0A0A] ${role.dot}`}
                      />
                    </div>
                  </div>

                  {/* Offset outline arch for depth */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-3 translate-y-3 rounded-b-[2rem] rounded-t-[50%/40%] border border-black/10 dark:border-white/15 sm:translate-x-5 sm:translate-y-5"
                  />

                  {/* Soft shadow lives on its own layer so the reveal clip never cuts it */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-b-[2rem] rounded-t-[50%/40%] shadow-[0_30px_60px_rgba(0,0,0,0.10)] dark:shadow-black/60"
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
                    className="absolute inset-0 overflow-hidden rounded-b-[2rem] rounded-t-[50%/40%] border border-black/[0.06] bg-white/70 dark:border-white/10 dark:bg-white/[0.04]"
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
                      alt={`Portrait of ${SITE.name}`}
                      fill
                      priority
                      sizes="(max-width: 640px) 290px, (max-width: 1024px) 370px, 420px"
                      className="object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent dark:from-black/60" />
                  </motion.div>

                  {/* Toolkit card: follows the chosen focus area */}
                  <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0A]/75 sm:inset-x-4 sm:bottom-4 sm:p-4">
                    <div className="mb-2.5 flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full transition-colors duration-500 motion-reduce:transition-none ${role.dot}`}
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
                              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${ro.chip}`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      ))}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --------------------- STACK TICKER + PAUSE --------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: smoothEase, delay: 1 }}
          className="mt-14 flex items-center gap-3 lg:mt-20"
        >
          <div className="min-w-0 flex-1">
            <StackTicker run={live} reduce={reduce} />
          </div>
          {!reduce && (
            <MotionToggle
              paused={paused}
              onToggle={() => setPaused((p) => !p)}
            />
          )}
        </motion.div>
      </div>

      {/* Shared page-transition curtain */}
      {curtain}
    </section>
  );
};

export default HeroSection;
