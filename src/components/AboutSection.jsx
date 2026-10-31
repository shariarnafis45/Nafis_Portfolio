"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiArrowDown, FiChevronRight } from "react-icons/fi";

import SectionBadge from "./shared/SectionBadge";
import { useCurtainNav } from "./shared/CurtainNav";
import {
  ACCENT,
  CTA,
  FOCUS,
  INK,
  MAILTO,
  SITE,
  accentA,
  smoothEase,
} from "@/lib/site";

const CONTACT_TARGET = "contact";
const WORK_TARGET = "projects";

/* Focus ring for controls that sit on the always-dark terminal. */
const TERM_FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]";

const K = ({ children }) => <span className="text-purple-400">{children}</span>;
const P = ({ children }) => <span className="text-sky-300">{children}</span>;
const S = ({ children }) => (
  <span className="text-emerald-300">{children}</span>
);
const N = ({ children }) => <span className="text-amber-300">{children}</span>;
const D = ({ children }) => <span className="text-zinc-400">{children}</span>;
const Ln = ({ i = 0, children }) => (
  <div style={{ paddingLeft: `${i * 1.1}rem` }} className="break-words">
    {children}
  </div>
);
const Gap = () => <div className="h-3" />;

const COMMITS = [
  {
    hash: "c9e41ab",
    head: true,
    when: "Now",
    title: "Building & Growing",
    desc: "Building full stack projects and refining my craft.",
  },
  {
    hash: "7d3b8a1",
    when: "Mid 2025",
    title: "MERN Stack Developer",
    desc: "Learned the MERN stack and started building full stack apps.",
  },
  {
    hash: "4a02f6c",
    when: "Late 2024 – Early 2025",
    title: "Exploring & Building",
    desc: "Multiple projects, stronger front-end, modern web tech.",
  },
  {
    hash: "2b6d7e0",
    when: "2024",
    title: "Started with WordPress",
    desc: "Building sites and learning the fundamentals.",
  },
];

// Each command prints a list of lines. `ctx.go` is the curtain navigator.
const COMMANDS = [
  {
    cmd: "cat about.ts",
    label: "Who I am",
    out: () => [
      <Ln key="1">
        <K>const</K> <P>developer</P> = {"{"}
      </Ln>,
      <Ln key="2" i={1}>
        <P>name</P>: <S>{`"${SITE.name}"`}</S>,
      </Ln>,
      <Ln key="3" i={1}>
        <P>role</P>: <S>{`"${SITE.role}"`}</S>,
      </Ln>,
      <Ln key="4" i={1}>
        <P>bridges</P>: [<S>{'"clean, user-focused UI"'}</S>,{" "}
        <S>{'"APIs and databases"'}</S>],
      </Ln>,
      <Ln key="5" i={1}>
        <P>startedWith</P>: <S>{'"CMS customization"'}</S>,
      </Ln>,
      <Ln key="6" i={1}>
        <P>buildingNow</P>: <S>{'"full stack MERN & Next.js apps"'}</S>,
      </Ln>,
      <Ln key="7" i={1}>
        <P>mindset</P>: <S>{'"Clean & maintainable"'}</S>,
      </Ln>,
      <Ln key="8" i={1}>
        <P>openToWork</P>: <N>true</N>,
      </Ln>,
      <Ln key="9">{"};"}</Ln>,
    ],
  },
  {
    cmd: "git log --oneline",
    label: "My journey",
    out: () =>
      COMMITS.flatMap((c) => [
        <Ln key={`${c.hash}-a`}>
          <span className="text-amber-300">{c.hash}</span>{" "}
          {c.head && <span className="text-sky-300">(HEAD → now) </span>}
          <span className="text-zinc-100">{c.title}</span>
        </Ln>,
        <Ln key={`${c.hash}-b`} i={1}>
          <D>
            {c.when} · {c.desc}
          </D>
        </Ln>,
      ]),
  },
  {
    cmd: "cat stack.json",
    label: "What I build with",
    out: () => [
      <Ln key="1">{"{"}</Ln>,
      <Ln key="2" i={1}>
        <P>&quot;frontend&quot;</P>: [<S>&quot;React&quot;</S>,{" "}
        <S>&quot;Next.js&quot;</S>, <S>&quot;Tailwind CSS&quot;</S>,{" "}
        <S>&quot;Framer Motion&quot;</S>],
      </Ln>,
      <Ln key="3" i={1}>
        <P>&quot;backend&quot;</P>: [<S>&quot;Node.js&quot;</S>,{" "}
        <S>&quot;Express&quot;</S>, <S>&quot;MongoDB&quot;</S>,{" "}
        <S>&quot;REST APIs&quot;</S>],
      </Ln>,
      <Ln key="4" i={1}>
        <P>&quot;cms&quot;</P>: [<S>&quot;WordPress&quot;</S>,{" "}
        <S>&quot;Elementor&quot;</S>, <S>&quot;WooCommerce&quot;</S>]
      </Ln>,
      <Ln key="5">{"}"}</Ln>,
    ],
  },
  {
    cmd: "cat philosophy.md",
    label: "How I think",
    out: () => [
      <Ln key="1">
        <K># Engineering Philosophy</K>
      </Ln>,
      <Gap key="g1" />,
      <Ln key="2">
        <D>&gt;</D>{" "}
        <span className="text-zinc-100">
          I like software where a polished frontend sits on a solid,
          maintainable backend.
        </span>
      </Ln>,
      <Gap key="g2" />,
      <Ln key="3">
        <N>-</N> Clean, readable code
      </Ln>,
      <Ln key="4">
        <N>-</N> Simple, maintainable architecture
      </Ln>,
      <Ln key="5">
        <N>-</N> Performance-minded
      </Ln>,
      <Ln key="6">
        <N>-</N> Modern, accessible UI
      </Ln>,
    ],
  },
  {
    cmd: "./hire-me.sh",
    label: "Work with me",
    out: ({ go }) => [
      <Ln key="1">
        <span className="text-emerald-400">✔</span> Checking availability…
      </Ln>,
      <Ln key="2">
        <span className="text-emerald-400">✔</span> Status:{" "}
        <span className="text-zinc-100">
          open to junior roles &amp; freelance projects
        </span>
      </Ln>,
      <Gap key="g1" />,
      <Ln key="3">
        <D># Have an idea or a role in mind? Let&rsquo;s build it properly.</D>
      </Ln>,
      <Gap key="g2" />,
      <div key="4" className="flex flex-wrap gap-2">
        <a
          href={`#${CONTACT_TARGET}`}
          onClick={go(CONTACT_TARGET, CTA.talk, MAILTO)}
          data-cursor="Talk"
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${TERM_FOCUS}`}
          style={{ backgroundColor: ACCENT, color: INK }}
        >
          {CTA.talk}{" "}
          <FiArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
        <a
          href={`#${WORK_TARGET}`}
          onClick={go(WORK_TARGET, "Featured Works")}
          data-cursor="View"
          className={`inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${TERM_FOCUS}`}
        >
          See my work <FiArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>,
    ],
  },
];

// terminal
const Prompt = () => (
  <span>
    <span className="text-emerald-400">nafis</span>
    <span className="text-zinc-500">@</span>
    <span className="text-sky-400">portfolio</span>{" "}
    <span className="text-zinc-500">~</span>{" "}
    <span aria-hidden="true" style={{ color: ACCENT }}>
      ❯
    </span>{" "}
  </span>
);

/* Blinks five times, then stays solid (WCAG 2.2.2: nothing blinks for > 5s). */
const Caret = ({ blink, reduce }) => (
  <span
    aria-hidden="true"
    className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em]"
    style={{
      backgroundColor: ACCENT,
      animation: blink && !reduce ? "about-caret 1.1s ease-in-out 5" : "none",
    }}
  />
);

const AboutSection = () => {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();

  const termRef = useRef(null);
  const bodyRef = useRef(null);
  const inView = useInView(termRef, { once: true, amount: 0.35 });
  const started = useRef(false);

  const [run, setRun] = useState({ idx: -1, id: 0 });
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | typing | output

  const exec = (idx) => setRun((r) => ({ idx, id: r.id + 1 }));

  // First command runs by itself once the terminal scrolls into view.
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      exec(0);
    }
  }, [inView]);

  // Type the command, then show its output.
  useEffect(() => {
    if (run.idx < 0) return;
    const full = COMMANDS[run.idx].cmd;
    if (bodyRef.current) bodyRef.current.scrollTop = 0;

    if (reduce) {
      setTyped(full);
      setPhase("output");
      return;
    }

    setTyped("");
    setPhase("typing");
    let i = 0;
    let t;
    const step = () => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i < full.length) {
        t = setTimeout(step, 24 + Math.random() * 34);
      } else {
        t = setTimeout(() => setPhase("output"), 260);
      }
    };
    t = setTimeout(step, 260);
    return () => clearTimeout(t);
  }, [run, reduce]);

  const current = run.idx >= 0 ? COMMANDS[run.idx] : null;
  const lines = current && phase === "output" ? current.out({ go }) : [];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-20 font-sans focus:outline-none lg:py-28"
    >
      <style>{`@keyframes about-caret { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }`}</style>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:pl-24 2xl:pl-8">
        {/* header */}
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="mb-6"
            >
              <SectionBadge title="About Me" />
            </motion.div>

            <h2
              id="about-heading"
              className="text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0A0A0A] dark:text-white sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.1, ease: smoothEase, delay: 0.05 }}
                >
                  Pixels up front.
                </motion.span>
              </span>
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block"
                  style={{ color: ACCENT }}
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.1, ease: smoothEase, delay: 0.2 }}
                >
                  Systems behind.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.3 }}
            className="max-w-sm text-base leading-relaxed text-[#5F6368] dark:text-[#A0A0A0] sm:text-lg"
          >
            Hit a command and get to know me, the way a developer would.
          </motion.p>
        </div>

        {/* Plain-text version for screen readers */}
        <p className="sr-only">
          {SITE.name} is a {SITE.role.toLowerCase()} who bridges clean,
          user-focused UI and the APIs and databases behind it. He started with
          CMS customization and now builds full stack MERN and Next.js
          applications. He is open to junior roles and freelance projects.
        </p>

        {/* announces which command is showing, without reading every line */}
        <p role="status" className="sr-only">
          {current && phase === "output"
            ? `Showing ${current.label} in the terminal`
            : ""}
        </p>

        {/* ------------------------------- BODY ------------------------------- */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Terminal */}
          <motion.div
            ref={termRef}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="relative lg:col-span-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] opacity-70 blur-3xl"
              style={{
                background: `radial-gradient(60% 60% at 50% 35%, ${accentA(
                  0.22,
                )}, transparent)`,
              }}
            />

            <div className="relative z-10 overflow-hidden rounded-2xl border border-black/10 bg-[#0B0B0D] shadow-[0_30px_60px_rgba(0,0,0,0.18)] dark:border-white/10 dark:shadow-black/60">
              {/* title bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-zinc-400"
                >
                  nafis — zsh
                </span>
                <span className="w-[42px]" aria-hidden="true" />
              </div>

              {/* screen: focusable so keyboard users can scroll it */}
              <div
                id="about-terminal"
                ref={bodyRef}
                role="region"
                aria-label="Terminal output"
                tabIndex={0}
                className="h-[400px] overflow-y-auto p-4 font-mono text-[13px] leading-[1.75] text-zinc-200 [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 sm:h-[430px] sm:p-6"
              >
                {!current && (
                  <div>
                    <Prompt />
                    <Caret blink reduce={reduce} />
                  </div>
                )}

                {current && (
                  <div>
                    <Prompt />
                    <span className="text-zinc-100">{typed}</span>
                    {phase === "typing" && <Caret reduce={reduce} />}
                  </div>
                )}

                {phase === "output" && (
                  <div className="mt-3 space-y-[1px]">
                    {lines.map((ln, k) => (
                      <motion.div
                        key={`${run.id}-${k}`}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: smoothEase,
                          delay: k * 0.07,
                        }}
                      >
                        {ln}
                      </motion.div>
                    ))}

                    <motion.div
                      className="pt-3"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: lines.length * 0.07 + 0.2 }}
                    >
                      <Prompt />
                      <Caret blink reduce={reduce} />
                      <span className="ml-3 text-zinc-400">
                        # pick another command{" "}
                        <span aria-hidden="true" className="hidden lg:inline">
                          →
                        </span>
                        <span aria-hidden="true" className="lg:hidden">
                          ↓
                        </span>
                      </span>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Command palette + CTAs */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6368] dark:text-[#8A8A8A]">
                Try a command
              </p>
              <div
                role="group"
                aria-label="Terminal commands"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1"
              >
                {COMMANDS.map((c, i) => {
                  const on = i === run.idx;
                  return (
                    <motion.button
                      key={c.cmd}
                      type="button"
                      onClick={() => exec(i)}
                      aria-pressed={on}
                      aria-controls="about-terminal"
                      data-cursor="Run"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.6,
                        ease: smoothEase,
                        delay: 0.05 * i,
                      }}
                      className={`group flex items-center justify-between gap-3 rounded-2xl border bg-white/75 px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white/[0.04] sm:last:col-span-2 lg:last:col-span-1 ${FOCUS}`}
                      style={{
                        borderColor: on
                          ? accentA(0.55)
                          : "rgba(127,127,127,0.18)",
                        backgroundColor: on ? accentA(0.08) : undefined,
                      }}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold tracking-tight text-[#0A0A0A] dark:text-white">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-xs text-[#5F6368] dark:text-[#A0A0A0]">
                          $ {c.cmd}
                        </span>
                      </span>
                      {/* the chevron turns down on the selected command (a cue that isn't colour) */}
                      <FiChevronRight
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                          on ? "rotate-90" : "group-hover:translate-x-0.5"
                        }`}
                        style={{ color: on ? ACCENT : undefined }}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={`#${CONTACT_TARGET}`}
                onClick={go(CONTACT_TARGET, CTA.talk, MAILTO)}
                data-cursor="Talk"
                className={`group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white dark:text-[#0A0A0A] ${FOCUS}`}
              >
                {CTA.talk}
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                />
              </a>
              <a
                href={`#${WORK_TARGET}`}
                onClick={go(WORK_TARGET, "Featured Works")}
                data-cursor="View"
                className={`group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-6 py-3.5 text-sm font-medium tracking-tight text-[#0A0A0A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ${FOCUS}`}
              >
                See my work
                <FiArrowDown
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Same curtain transition as the Hero */}
      {curtain}
    </section>
  );
};

export default AboutSection;
