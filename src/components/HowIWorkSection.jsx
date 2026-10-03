"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FiSearch,
  FiMap,
  FiBox,
  FiCode,
  FiCheckSquare,
  FiZap,
  FiCheck,
  FiChevronRight,
  FiArrowUpRight,
  FiArrowUp,
} from "react-icons/fi";

import SectionBadge from "./shared/SectionBadge";
import { useCurtainNav } from "./shared/CurtainNav";

const smoothEase = [0.22, 1, 0.36, 1];
const AUTO_INTERVAL = 5500;

const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

const EMAIL = "mailto:nafisshahworkmail@gmail.com";
const CONTACT_TARGET = "contact";

const pad = (n) => String(n).padStart(2, "0");

const Rise = ({ on, i = 0, reduce, className = "", style, children }) => (
  <motion.div
    style={style}
    initial={false}
    animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    transition={{
      duration: reduce ? 0 : 0.5,
      ease: smoothEase,
      delay: on && !reduce ? 0.15 + i * 0.09 : 0,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Bar = ({ w, className = "" }) => (
  <div
    className={`h-2 rounded-full bg-black/10 dark:bg-white/15 ${className}`}
    style={{ width: w }}
  />
);

const UnderstandViz = ({ on, reduce }) => (
  <div className="space-y-3">
    {[
      "Who is it for?",
      "What problem does it solve?",
      "What does “done” look like?",
    ].map((q, i) => (
      <Rise
        key={q}
        on={on}
        i={i}
        reduce={reduce}
        className="flex items-center gap-3 rounded-xl border border-black/[0.06] dark:border-white/10 px-3.5 py-3"
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: ACCENT }}
        >
          <FiCheck className="h-3 w-3" />
        </span>
        <span className="text-sm font-medium text-[#0A0A0A] dark:text-white">
          {q}
        </span>
      </Rise>
    ))}
  </div>
);

const PlanViz = ({ on, reduce }) => {
  const cols = [
    { name: "To do", cards: 2 },
    { name: "Doing", cards: 1 },
    { name: "Done", cards: 2 },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {cols.map((c, i) => (
        <Rise key={c.name} on={on} i={i} reduce={reduce}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F6368] dark:text-[#A0A0A0]">
            {c.name}
          </p>
          <div className="space-y-2">
            {Array.from({ length: c.cards }).map((_, k) => (
              <div
                key={k}
                className="space-y-1.5 rounded-lg border border-black/[0.06] dark:border-white/10 p-2.5"
                style={
                  c.name === "Doing"
                    ? {
                        borderColor: accentA(0.5),
                        backgroundColor: accentA(0.08),
                      }
                    : undefined
                }
              >
                <Bar w="80%" />
                <Bar w="50%" className="!h-1.5 opacity-60" />
              </div>
            ))}
          </div>
        </Rise>
      ))}
    </div>
  );
};

const ArchitectViz = ({ on, reduce }) => {
  const nodes = [
    { name: "Client", sub: "Next.js" },
    { name: "API", sub: "Express" },
    { name: "Data", sub: "MongoDB" },
  ];
  return (
    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
      {nodes.map((n, i) => (
        <React.Fragment key={n.name}>
          <Rise
            on={on}
            i={i * 2}
            reduce={reduce}
            className="flex-1 rounded-xl border px-2 py-4 text-center"
            style={{
              borderColor: accentA(0.4),
              backgroundColor: accentA(0.07),
            }}
          >
            <p className="text-sm font-semibold text-[#0A0A0A] dark:text-white">
              {n.name}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-[#5F6368] dark:text-[#A0A0A0]">
              {n.sub}
            </p>
          </Rise>
          {i < nodes.length - 1 && (
            <Rise on={on} i={i * 2 + 1} reduce={reduce}>
              <FiChevronRight
                className="h-4 w-4 shrink-0"
                style={{ color: ACCENT }}
              />
            </Rise>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const BuildViz = ({ on, reduce }) => (
  <div className="font-mono text-[11px] leading-[1.9] text-gray-800 dark:text-gray-200 sm:text-xs">
    <Rise on={on} i={0} reduce={reduce}>
      <span className="font-semibold text-purple-600 dark:text-purple-400">
        export async function
      </span>{" "}
      <span className="text-blue-600 dark:text-blue-400">GET</span>() {"{"}
    </Rise>
    <Rise on={on} i={1} reduce={reduce} className="pl-4">
      <span className="font-semibold text-purple-600 dark:text-purple-400">
        const
      </span>{" "}
      projects ={" "}
      <span className="font-semibold text-purple-600 dark:text-purple-400">
        await
      </span>{" "}
      <span className="text-blue-600 dark:text-blue-400">Project</span>.find();
    </Rise>
    <Rise on={on} i={2} reduce={reduce} className="pl-4">
      <span className="font-semibold text-purple-600 dark:text-purple-400">
        return
      </span>{" "}
      Response.json(projects);
    </Rise>
    <Rise on={on} i={3} reduce={reduce}>
      {"}"}
    </Rise>
  </div>
);

const ValidateViz = ({ on, reduce }) => (
  <div className="space-y-2.5 font-mono text-[11px] sm:text-xs">
    {[
      "renders correctly on mobile",
      "POST /api/projects → 201",
      "handles empty and error states",
      "keyboard navigation works",
    ].map((t, i) => (
      <Rise
        key={t}
        on={on}
        i={i}
        reduce={reduce}
        className="flex items-center gap-2.5 text-gray-800 dark:text-gray-200"
      >
        <span className="text-emerald-500">✔</span>
        {t}
      </Rise>
    ))}
  </div>
);

const OptimiseViz = ({ on, reduce }) => (
  <div className="space-y-4">
    {[
      { name: "Load speed", w: "92%" },
      { name: "Responsiveness", w: "86%" },
      { name: "Layout stability", w: "96%" },
    ].map((m, i) => (
      <Rise key={m.name} on={on} i={i} reduce={reduce}>
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-[#5F6368] dark:text-[#A0A0A0]">
          <span>{m.name}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/10">
          <div
            className="h-full origin-left rounded-full transition-transform duration-1000 ease-out"
            style={{
              width: m.w,
              backgroundColor: ACCENT,
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: on ? `${300 + i * 150}ms` : "0ms",
            }}
          />
        </div>
      </Rise>
    ))}
  </div>
);

const STAGES = [
  {
    id: "understand",
    label: "Understand",
    Icon: FiSearch,
    title: "Understand",
    tagline: "Start with the problem, not the stack.",
    points: [
      "Clarify the goals, users and constraints",
      "Define what success looks like",
      "Spot risks before they cost time",
    ],
    output: "A clear brief",
    Viz: UnderstandViz,
  },
  {
    id: "plan",
    label: "Plan",
    Icon: FiMap,
    title: "Plan",
    tagline: "Break the idea into pieces that can ship.",
    points: [
      "Split the scope into milestones",
      "Prioritise by impact versus effort",
      "Decide what goes out first",
    ],
    output: "A realistic roadmap",
    Viz: PlanViz,
  },
  {
    id: "architect",
    label: "Architect",
    Icon: FiBox,
    title: "Architect",
    tagline: "Design the system before writing it.",
    points: [
      "Model the data and API contracts",
      "Pick the right tools for the job",
      "Plan for scale and security from day one",
    ],
    output: "A system design",
    Viz: ArchitectViz,
  },
  {
    id: "build",
    label: "Build",
    Icon: FiCode,
    title: "Build",
    tagline: "Clean code, delivered in small steps.",
    points: [
      "Reusable components and readable code",
      "Frontend and backend moving together",
      "Small commits and frequent reviews",
    ],
    output: "A working product",
    Viz: BuildViz,
  },
  {
    id: "validate",
    label: "Validate",
    Icon: FiCheckSquare,
    title: "Validate",
    tagline: "Prove it works before users find out.",
    points: [
      "Test the critical paths end to end",
      "Handle edge cases and failures gracefully",
      "Check on real devices and browsers",
    ],
    output: "Confidence to release",
    Viz: ValidateViz,
  },
  {
    id: "optimise",
    label: "Optimise",
    Icon: FiZap,
    title: "Optimise",
    tagline: "Make it fast, then keep it fast.",
    points: [
      "Trim bundle size and needless re-renders",
      "Improve load speed and Core Web Vitals",
      "Refine from real feedback, then loop again",
    ],
    output: "A fast, scalable release",
    Viz: OptimiseViz,
  },
];

// Glass panel with a cursor-following spotlight that picks up the role colour.
const Panel = ({ children, className = "", reduce }) => {
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: smoothEase }}
      className={`group/panel relative overflow-hidden rounded-[1.75rem] border border-black/[0.07] dark:border-white/10 bg-white/75 dark:bg-white/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${accentA(
            0.12,
          )}, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// The full content of one stage: copy on one side, illustration on the other.
const StageBody = ({ stage, index, on, reduce }) => {
  const Viz = stage.Viz;
  return (
    <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
      <div>
        <p
          className="font-mono text-xs font-semibold tracking-[0.18em]"
          style={{ color: ACCENT }}
        >
          STEP {pad(index + 1)} / {pad(STAGES.length)}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-[#0A0A0A] dark:text-white sm:text-3xl">
          {stage.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-[#5F6368] dark:text-[#A0A0A0] sm:text-lg">
          {stage.tagline}
        </p>

        <ul className="mt-5 space-y-2.5">
          {stage.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 text-sm font-medium text-[#0A0A0A] dark:text-white sm:text-[0.95rem]"
            >
              <span
                aria-hidden="true"
                className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              {p}
            </li>
          ))}
        </ul>

        <div
          className="mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold text-[#0A0A0A] dark:text-white"
          style={{
            borderColor: accentA(0.35),
            backgroundColor: accentA(0.08),
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#5F6368] dark:text-[#A0A0A0]">
            Output
          </span>
          {stage.output}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="rounded-2xl border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#111113] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-none sm:p-6"
      >
        <Viz on={on} reduce={reduce} />
      </div>
    </div>
  );
};

export default function HowIWork() {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();
  const bodyRef = useRef(null);
  const inView = useInView(bodyRef, { amount: 0.3 });

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Auto-play only on large screens; on phones it would shift the page under the reader
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const running = auto && inView && !hovering && !reduce && isDesktop;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % STAGES.length),
      AUTO_INTERVAL,
    );
    return () => clearTimeout(id);
  }, [running, active]);

  const select = (i) => {
    setAuto(false);
    setActive(i);
  };

  const mouseOnly = (fn) => (e) => {
    if (e.pointerType === "mouse") fn();
  };

  const lastIndex = STAGES.length - 1;

  return (
    <section
      id="process"
      className="relative scroll-mt-24 py-20 lg:py-28 font-sans"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:pl-24 2xl:pl-8">
        {/* ------------------------------ HEADER ------------------------------ */}
        <div className="mb-12 lg:mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="mb-6"
            >
              <SectionBadge title="How I Work" />
            </motion.div>

            <h2 className="text-[2.6rem] sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0A0A0A] dark:text-white">
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.1, ease: smoothEase, delay: 0.05 }}
                >
                  Think first.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className="block"
                  style={{ color: ACCENT }}
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.1, ease: smoothEase, delay: 0.2 }}
                >
                  Then ship.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.3 }}
            className="max-w-sm text-base sm:text-lg leading-relaxed text-[#5F6368] dark:text-[#A0A0A0]"
          >
            A repeatable engineering process that turns a rough idea into a
            fast, maintainable product.
          </motion.p>
        </div>

        {/*  DESKTOP: pipeline + detail panel                                    */}

        <div
          ref={bodyRef}
          onPointerEnter={mouseOnly(() => setHovering(true))}
          onPointerLeave={mouseOnly(() => setHovering(false))}
          className="hidden lg:block"
        >
          {/* pipeline */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-[22px] h-[2px] rounded-full bg-black/[0.07] dark:bg-white/[0.09]"
              style={{ left: `${100 / 12}%`, right: `${100 / 12}%` }}
            >
              <div
                className="h-full origin-left rounded-full transition-transform duration-700 ease-out"
                style={{
                  backgroundColor: ACCENT,
                  transform: `scaleX(${active / lastIndex})`,
                }}
              />
            </div>

            <div
              className="relative grid grid-cols-6"
              role="tablist"
              aria-label="Workflow stages"
            >
              {STAGES.map((s, i) => {
                const on = i === active;
                const done = i < active;
                const Icon = s.Icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`process-panel-${s.id}`}
                    id={`process-tab-${s.id}`}
                    onClick={() => select(i)}
                    data-cursor="Step"
                    className="group flex flex-col items-center gap-3 rounded-2xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  >
                    <span
                      className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-500 group-hover:scale-105"
                      style={{
                        borderColor:
                          on || done ? ACCENT : "rgba(127,127,127,0.3)",
                        backgroundColor: on ? ACCENT : undefined,
                        color: on ? "#fff" : done ? ACCENT : "#8A8A8A",
                        boxShadow: on ? `0 0 0 6px ${accentA(0.16)}` : "none",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-[#F7F7F5] dark:bg-[#161618]"
                      />
                      {done ? (
                        <FiCheck className="h-5 w-5" />
                      ) : (
                        <Icon className="h-[18px] w-[18px]" />
                      )}
                    </span>
                    <span className="text-center">
                      <span className="block font-mono text-[10px] font-semibold tracking-[0.14em] text-[#8A8A8A]">
                        {pad(i + 1)}
                      </span>
                      <span
                        className={`block text-sm font-semibold tracking-tight transition-colors duration-300 ${
                          on
                            ? "text-[#0A0A0A] dark:text-white"
                            : "text-[#5F6368] dark:text-[#A0A0A0]"
                        }`}
                      >
                        {s.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* return loop: optimise feeds the next understand */}
          <div
            aria-hidden="true"
            className="relative mt-5 h-8 rounded-b-2xl border-x border-b border-dashed border-black/15 dark:border-white/20"
            style={{ marginLeft: `${100 / 12}%`, marginRight: `${100 / 12}%` }}
          >
            <FiArrowUp className="absolute -top-1 left-0 h-3.5 w-3.5 -translate-x-1/2 text-[#8A8A8A]" />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#161618] px-3 py-1 font-mono text-[11px] text-[#5F6368] dark:text-[#A0A0A0]">
              ↺ every release feeds the next
            </span>
          </div>

          {/* detail panel: all stages share one grid cell so height never jumps */}
          <Panel reduce={reduce} className="mt-14 p-8 xl:p-12">
            <div className="relative grid">
              {STAGES.map((s, i) => {
                const on = i === active;
                return (
                  <motion.div
                    key={s.id}
                    role="tabpanel"
                    id={`process-panel-${s.id}`}
                    aria-labelledby={`process-tab-${s.id}`}
                    aria-hidden={!on}
                    initial={false}
                    animate={{
                      opacity: on ? 1 : 0,
                      y: on ? 0 : 14,
                      filter: on ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{
                      duration: reduce ? 0 : 0.55,
                      ease: smoothEase,
                    }}
                    className={`[grid-area:1/1] ${on ? "" : "pointer-events-none"}`}
                  >
                    <StageBody stage={s} index={i} on={on} reduce={reduce} />
                  </motion.div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/*  MOBILE / TABLET: vertical stepper with expanding stages             */}

        <ol className="flex flex-col gap-3 lg:hidden">
          {STAGES.map((s, i) => {
            const on = i === active;
            const done = i < active;
            const isLast = i === lastIndex;
            const Icon = s.Icon;
            return (
              <motion.li
                key={s.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: smoothEase }}
                className="relative flex gap-4"
              >
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-10 h-[calc(100%-2.5rem+0.75rem)] w-[2px] -translate-x-1/2 rounded-full bg-black/[0.07] dark:bg-white/[0.09]"
                  >
                    <span
                      className="block h-full w-full origin-top rounded-full transition-transform duration-700 ease-out"
                      style={{
                        backgroundColor: ACCENT,
                        transform: `scaleY(${done ? 1 : 0})`,
                      }}
                    />
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500"
                  style={{
                    borderColor: on || done ? ACCENT : "rgba(127,127,127,0.3)",
                    backgroundColor: on ? ACCENT : undefined,
                    color: on ? "#fff" : done ? ACCENT : "#8A8A8A",
                    boxShadow: on ? `0 0 0 5px ${accentA(0.16)}` : "none",
                  }}
                >
                  <span className="absolute inset-0 -z-10 rounded-full bg-[#F7F7F5] dark:bg-[#161618]" />
                  {done ? (
                    <FiCheck className="h-[18px] w-[18px]" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-expanded={on}
                    aria-controls={`process-m-${s.id}`}
                    className="flex min-h-10 w-full items-center justify-between gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  >
                    <span>
                      <span className="block font-mono text-[10px] font-semibold tracking-[0.14em] text-[#8A8A8A]">
                        STEP {pad(i + 1)}
                      </span>
                      <span className="block text-lg font-bold tracking-tight text-[#0A0A0A] dark:text-white">
                        {s.label}
                      </span>
                    </span>
                    <FiChevronRight
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-[#5F6368] dark:text-[#A0A0A0] transition-transform duration-500 ${
                        on ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`process-m-${s.id}`}
                    aria-hidden={!on}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-3 rounded-2xl border border-black/[0.07] dark:border-white/10 bg-white/75 dark:bg-white/[0.04] p-5 sm:p-6">
                        <StageBody
                          stage={s}
                          index={i}
                          on={on}
                          reduce={reduce}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* ------------------------------- CTA ------------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between lg:mt-14"
        >
          <p className="max-w-md text-base leading-relaxed text-[#5F6368] dark:text-[#A0A0A0] sm:text-lg">
            Have an idea? We&rsquo;d start at{" "}
            <span className="font-mono font-semibold" style={{ color: ACCENT }}>
              step 01
            </span>{" "}
            together.
          </p>
          <a
            href={`#${CONTACT_TARGET}`}
            onClick={go(CONTACT_TARGET, "Let’s Talk", EMAIL)}
            data-cursor="Talk"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-3.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 dark:bg-white dark:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            Let&rsquo;s talk
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Same curtain transition as the Hero */}
      {curtain}
    </section>
  );
}
