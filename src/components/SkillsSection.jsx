"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

import SectionBadge from "./shared/SectionBadge";
import { useCurtainNav } from "./shared/CurtainNav";
import { skillsData } from "./shared/skillsData";

/* -------------------------------------------------------------------------- */
/*  CONFIG                                                                    */
/* -------------------------------------------------------------------------- */

const smoothEase = [0.22, 1, 0.36, 1];

// Role colour shared by the Hero (it sets --fx on <html>). Falls back to emerald.
const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

const WORK_TARGET = "projects";

// Ordered like an architecture diagram: what users see -> where it's built.
const LAYERS = [
  { name: "Frontend", desc: "What people see and touch." },
  { name: "Backend", desc: "Where the logic and APIs live." },
  { name: "Database & Cloud", desc: "Data, deployment and hosting." },
  { name: "Tools", desc: "How I build and ship." },
  { name: "Others", desc: "Design and CMS work." },
];

/* -------------------------------------------------------------------------- */
/*  SMALL PIECES                                                              */
/* -------------------------------------------------------------------------- */

// Glass card with a cursor-following spotlight that picks up the role colour.
const Layer = ({ children, className = "", reduce }) => {
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
      className={`group/layer relative overflow-hidden rounded-[1.75rem] border border-black/[0.07] dark:border-white/10 bg-white/75 dark:bg-white/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/layer:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--mx,50%) var(--my,50%), ${accentA(
            0.13,
          )}, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

const SkillChip = ({ skill, index, reduce }) => {
  const Icon = skill.Icon;
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: smoothEase,
        delay: 0.05 + index * 0.04,
      }}
      style={{ "--brand": skill.bg }}
      className="group/chip inline-flex items-center gap-2.5 rounded-full border border-black/[0.07] dark:border-white/10 bg-white dark:bg-white/[0.05] py-1.5 pl-1.5 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_var(--brand)]"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover/chip:scale-110 group-hover/chip:-rotate-6"
        style={{ backgroundColor: skill.bg }}
      >
        <Icon className="h-4 w-4" style={{ color: skill.fg }} />
      </span>
      <span className="text-[13px] font-semibold tracking-tight text-[#0A0A0A] dark:text-white">
        {skill.name}
      </span>
    </motion.li>
  );
};

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                    */
/* -------------------------------------------------------------------------- */

export default function SkillsSection() {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();
  const [reached, setReached] = useState(-1); // furthest layer scrolled into view

  return (
    <section
      id="skills"
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
              <SectionBadge title="My Expertise" />
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
                  Sharp tools.
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
                  Steady hands.
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
            The full stack I reach for, from the screen a user sees down to the
            database behind it.
          </motion.p>
        </div>

        {/* ------------------------------ LAYERS ------------------------------ */}
        <ol className="flex flex-col gap-4">
          {LAYERS.map((layer, i) => {
            const skills = skillsData.filter((s) => s.category === layer.name);
            if (!skills.length) return null;
            const isReached = i <= reached;
            const isLast = i === LAYERS.length - 1;

            return (
              <motion.li
                key={layer.name}
                onViewportEnter={() => setReached((r) => (i > r ? i : r))}
                viewport={{ margin: "0px 0px -30% 0px" }}
                className="relative flex items-start gap-3 sm:gap-5"
              >
                {/* connector down to the next layer, fills as you scroll */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-[60px] h-[calc(100%+1rem-40px)] w-[2px] -translate-x-1/2 rounded-full bg-black/[0.07] dark:bg-white/[0.09]"
                  >
                    <span
                      className="block h-full w-full origin-top rounded-full transition-transform duration-700 ease-out"
                      style={{
                        backgroundColor: ACCENT,
                        transform: `scaleY(${i < reached ? 1 : 0})`,
                      }}
                    />
                  </span>
                )}

                {/* numbered node */}
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-[#F7F7F5] dark:bg-[#161618] font-mono text-xs font-semibold transition-all duration-500"
                  style={{
                    borderColor: isReached ? ACCENT : "rgba(127,127,127,0.25)",
                    color: isReached ? ACCENT : "#8A8A8A",
                    boxShadow: isReached
                      ? `0 0 0 5px ${accentA(0.14)}`
                      : "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Layer
                  reduce={reduce}
                  className="min-w-0 flex-1 p-5 sm:p-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8 lg:items-center"
                >
                  <div className="relative">
                    <h3 className="text-lg font-bold tracking-tight text-[#0A0A0A] dark:text-white sm:text-xl">
                      {layer.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#5F6368] dark:text-[#A0A0A0]">
                      {layer.desc}
                    </p>
                  </div>

                  <ul className="relative mt-5 flex flex-wrap gap-2.5 lg:mt-0">
                    {skills.map((skill, k) => (
                      <SkillChip
                        key={skill.name}
                        skill={skill}
                        index={k}
                        reduce={reduce}
                      />
                    ))}
                  </ul>
                </Layer>
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
          className="mt-10 flex justify-start sm:pl-[3.75rem]"
        >
          <a
            href={`#${WORK_TARGET}`}
            onClick={go(WORK_TARGET, "Featured Works")}
            data-cursor="View"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/5 px-6 py-3.5 text-sm font-medium tracking-tight text-[#0A0A0A] dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            See it in action
            <FiArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Same curtain transition as the Hero */}
      {curtain}
    </section>
  );
}
