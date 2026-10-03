"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiFileText,
  FiGitBranch,
  FiMail,
} from "react-icons/fi";

import { useCurtainNav } from "./CurtainNav";

const smoothEase = [0.22, 1, 0.36, 1];
const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

const EMAIL_ADDRESS = "nafisshahworkmail@gmail.com";
const EMAIL = `mailto:${EMAIL_ADDRESS}`;
const RESUME_URL =
  "https://drive.google.com/file/d/1ESjhsVWJoq0psdPGi9Fwp8XrFBs1e8PY/view?usp=sharing";

const NAV = [
  { path: "home", id: "home", label: "Back to Top" },
  { path: "about", id: "about", label: "About Me" },
  { path: "projects", id: "projects", label: "Featured Works" },
  { path: "skills", id: "skills", label: "My Expertise" },
  { path: "process", id: "process", label: "How I Work" },
  { path: "contact", id: "contact", label: "Let’s Talk", fallback: EMAIL },
];

const CONNECT = [
  {
    label: "GitHub",
    href: "https://github.com/shariarnafis45/",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shariarnafis/",
    Icon: FaLinkedinIn,
  },
  { label: "Email", href: EMAIL, Icon: FiMail, internal: true },
  { label: "Resume", href: RESUME_URL, Icon: FiFileText },
];

export default function Footer() {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();

  /* ---- copy email ---- */
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = EMAIL;
    }
  };

  /* ---- scroll progress for the status bar ---- */
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPct(Math.min(100, Math.max(0, Math.round(v * 100)))),
  );

  /* ---- cursor-reactive wordmark ---- */
  const onWordMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onWordLeave = (e) => {
    e.currentTarget.style.setProperty("--mx", "-400px");
    e.currentTarget.style.setProperty("--my", "-400px");
  };

  const mask =
    "radial-gradient(260px circle at var(--mx,-400px) var(--my,-400px), black, transparent)";
  const wordClass =
    "block select-none whitespace-nowrap text-[clamp(5rem,21vw,17rem)] font-extrabold leading-[0.9] tracking-[-0.06em]";

  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden pt-20 lg:pt-28 pb-6 font-sans"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:pl-24 2xl:pl-8">
        {/* ------------------------------ TOP ROW ------------------------------ */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + copy email */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="sm:col-span-2 lg:col-span-5"
          >
            <p className="text-2xl font-bold tracking-[-0.03em] text-[#0A0A0A] dark:text-white sm:text-3xl">
              Got an idea?{" "}
              <span style={{ color: ACCENT }}>Let&rsquo;s build it.</span>
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[#5F6368] dark:text-[#A0A0A0]">
              Full Stack Developer making fast, scalable products. Pixels up
              front, systems behind.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                data-cursor={copied ? "Copied" : "Copy"}
                className="group inline-flex max-w-full items-center gap-3 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/75 dark:bg-white/5 py-2.5 pl-5 pr-2.5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <span className="truncate font-mono text-[12px] font-medium text-[#0A0A0A] dark:text-white sm:text-[13px]">
                  {EMAIL_ADDRESS}
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300"
                  style={{ backgroundColor: copied ? "#10b981" : ACCENT }}
                >
                  {copied ? (
                    <FiCheck className="h-4 w-4" />
                  ) : (
                    <FiCopy className="h-4 w-4" />
                  )}
                </span>
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </div>

            <div className="mt-5 inline-flex items-center gap-2.5 text-sm text-[#5F6368] dark:text-[#A0A0A0]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Open to junior roles &amp; freelance projects
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.nav
            aria-label="Footer"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.08 }}
            className="lg:col-span-3 lg:col-start-7"
          >
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8A8A]">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={go(n.id, n.label, n.fallback)}
                    data-cursor="Go"
                    className="group inline-flex items-center gap-1.5 font-mono text-sm text-[#5F6368] dark:text-[#A0A0A0] transition-colors duration-300 hover:text-[#0A0A0A] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded"
                  >
                    <span className="text-[#8A8A8A]">~/</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {n.path}
                    </span>
                    <span
                      aria-hidden="true"
                      className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      style={{ color: ACCENT }}
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Connect */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-3"
          >
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8A8A]">
              Connect
            </p>
            <ul className="space-y-2.5">
              {CONNECT.map(({ label, href, Icon, internal }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(internal
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    data-cursor="Open"
                    className="group inline-flex items-center gap-2.5 text-sm font-medium text-[#5F6368] dark:text-[#A0A0A0] transition-colors duration-300 hover:text-[#0A0A0A] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.07] dark:border-white/10 bg-white/75 dark:bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {label}
                    <FiArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ------------------------------ WORDMARK ------------------------------ */}
        <motion.div
          onPointerMove={onWordMove}
          onPointerLeave={onWordLeave}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="mt-16 lg:mt-24 grid overflow-hidden"
        >
          <span className="sr-only">Nafix</span>

          {/* resting layer: soft role-colour gradient that fades downward */}
          <span
            aria-hidden="true"
            className={`${wordClass} [grid-area:1/1] bg-clip-text text-transparent`}
            style={{
              backgroundImage: `linear-gradient(to bottom, ${accentA(
                0.34,
              )}, ${accentA(0.02)} 90%)`,
            }}
          >
            NAFIX.
          </span>

          {/* hover layer: solid colour revealed under the cursor */}
          <span
            aria-hidden="true"
            className={`${wordClass} [grid-area:1/1] pointer-events-none`}
            style={{ color: ACCENT, maskImage: mask, WebkitMaskImage: mask }}
          >
            NAFIX.
          </span>
        </motion.div>

        {/* ----------------------------- STATUS BAR ----------------------------- */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/10 bg-white/75 dark:bg-white/[0.04] font-mono text-[11px] text-[#5F6368] dark:text-[#A0A0A0] sm:text-xs">
          {/* scroll progress */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] origin-left"
            style={{ scaleX: scrollYProgress, backgroundColor: ACCENT }}
          />

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <FiGitBranch
                  className="h-3.5 w-3.5"
                  style={{ color: ACCENT }}
                />
                main
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-emerald-500">✔</span>
                all systems go
              </span>
              <span className="hidden md:inline">
                built with Next.js · Tailwind CSS · Framer Motion
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>© {year} Shariar Nafis</span>
              <span className="tabular-nums">{pct}%</span>
              <button
                type="button"
                onClick={go("home", "Back to Top")}
                data-cursor="Top"
                className="group inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/10 px-3 py-1 text-[#0A0A0A] dark:text-white transition-colors duration-300 hover:bg-black/[0.04] dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <FiArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                top
              </button>
            </div>
          </div>
        </div>
      </div>

      {curtain}
    </footer>
  );
}
