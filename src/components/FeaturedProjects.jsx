"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { FaGithub, FaBriefcase, FaLaptopCode, FaRocket } from "react-icons/fa6";

import SectionBadge from "./shared/SectionBadge";

const smoothEase = [0.22, 1, 0.36, 1];
const AUTO_INTERVAL = 6000;
const GITHUB_PROFILE = "https://github.com/shariarnafis45/";

const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

const PROJECTS = [
  {
    id: 1,
    title: "Legal Ease",
    category: "Legal Platform",
    icon: <FaBriefcase className="h-3.5 w-3.5" />,
    description:
      "A digital SaaS marketplace bridging the gap between legal professionals and clients. It democratizes access to justice with a secure, streamlined experience.",
    image: "https://i.ibb.co.com/N65TgMpV/Screenshot-2026-08-08-200440.png",
    liveUrl: "https://legal-ease-nafix.vercel.app/",
    githubUrl: "https://github.com/shariarnafis45/Legal-Ease",
    techStack: ["Next.js", "React", "MongoDB", "Node.js", "Tailwind"],
  },
  {
    id: 2,
    title: "HireLoop",
    category: "Job Hunting Portal",
    icon: <FaLaptopCode className="h-3.5 w-3.5" />,
    description:
      "A full-featured portal that streamlines job discovery and recruitment. Offers smart job search, company profiles, and a complete recruiter toolkit.",
    image: "https://i.ibb.co.com/v4X5rZQD/Screenshot-2026-08-08-200504.png",
    liveUrl: "https://hire-loop-nafix.vercel.app/",
    githubUrl: "https://github.com/shariarnafis45/Hire-Loop-Client",
    techStack: ["Next.js", "Express", "React", "Node.js", "Tailwind"],
  },
  {
    id: 3,
    title: "IdeaVault",
    category: "Startup Platform",
    icon: <FaRocket className="h-3.5 w-3.5" />,
    description:
      "Move beyond traditional scheduling with a focus purely on idea validation. Browse concepts, pitch startups, and provide valuable community feedback.",
    image: "https://i.ibb.co.com/YBRpzwyy/Screenshot-2026-08-08-200556.png",
    liveUrl: "https://idea-vault-nafix.vercel.app/",
    githubUrl: "https://github.com/shariarnafis45/Idea-Vault-Client-Side",
    techStack: ["Next.js", "MongoDB", "Express", "Node.js", "Tailwind"],
  },
];

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* -------------------------------------------------------------------------- */
/*  FEATURED PROJECTS                                                         */
/* -------------------------------------------------------------------------- */

export default function FeaturedProjects() {
  const reduce = !!useReducedMotion();
  const bodyRef = useRef(null);
  const inView = useInView(bodyRef, { amount: 0.25 });

  // Watch the <h2> itself. Watching the line that is pushed out of its own
  // overflow-hidden mask never fires once the title wraps onto several lines
  // (phones), which is why the title stayed invisible on mobile.
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const titleShown = reduce || titleInView;

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // stops for good once the visitor picks one
  const [hovering, setHovering] = useState(false);

  const running = auto && inView && !hovering && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % PROJECTS.length),
      AUTO_INTERVAL,
    );
    return () => clearTimeout(id);
  }, [running, active]);

  const select = (i) => {
    setAuto(false);
    setActive(i);
  };

  const current = PROJECTS[active];

  const mouseOnly = (fn) => (e) => {
    if (e.pointerType === "mouse") fn();
  };

  return (
    <section
      id="projects"
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
              <SectionBadge title="Featured Works" />
            </motion.div>

            <h2
              ref={titleRef}
              className="text-[2.6rem] sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0A0A0A] dark:text-white"
            >
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: titleShown ? 0 : "110%" }}
                  transition={{ duration: 1.1, ease: smoothEase, delay: 0.05 }}
                >
                  Shipped, not sketched.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className="block"
                  style={{ color: ACCENT }}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: titleShown ? 0 : "110%" }}
                  transition={{ duration: 1.1, ease: smoothEase, delay: 0.2 }}
                >
                  Live and clickable.
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
            A curated selection of digital products where I bridged the gap
            between clean interfaces and robust architecture.
          </motion.p>
        </div>

        {/* ------------------------------- BODY ------------------------------- */}
        <div
          ref={bodyRef}
          onPointerEnter={mouseOnly(() => setHovering(true))}
          onPointerLeave={mouseOnly(() => setHovering(false))}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 lg:items-start"
        >
          {/* Browser preview */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="relative lg:order-2 lg:col-span-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] opacity-70 blur-3xl"
              style={{
                background: `radial-gradient(60% 60% at 50% 40%, ${accentA(
                  0.22,
                )}, transparent)`,
              }}
            />

            <div className="relative z-10 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111113] shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-black/60">
              {/* browser bar */}
              <div className="flex items-center gap-3 border-b border-black/[0.07] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-black/[0.06] dark:border-white/10 bg-white dark:bg-black/30 px-3 py-1">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="truncate font-mono text-[11px] text-[#5F6368] dark:text-[#A0A0A0]">
                    {host(current.liveUrl)}
                  </span>
                </div>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="hidden h-4 w-4 shrink-0 text-[#5F6368] dark:text-[#A0A0A0] sm:block"
                />
              </div>

              {/* screens: stacked, cross-fading */}
              <div className="relative aspect-[16/10] bg-[#F8F9FA] dark:bg-[#1A1A1D]">
                {PROJECTS.map((p, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={p.id}
                      aria-hidden={!on}
                      className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
                        on
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-[1.03] pointer-events-none"
                      }`}
                    >
                      <Image
                        src={p.image}
                        alt={`${p.title} homepage screenshot`}
                        fill
                        unoptimized
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover object-top"
                      />
                    </div>
                  );
                })}

                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Live"
                  aria-label={`Open ${current.title} live site`}
                  className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/60"
                />
              </div>
            </div>
          </motion.div>

          {/* Project list */}
          <div className="lg:order-1 lg:col-span-5">
            <ol className="flex flex-col gap-3">
              {PROJECTS.map((p, i) => {
                const on = i === active;
                return (
                  <motion.li
                    key={p.id}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.7,
                      ease: smoothEase,
                      delay: 0.06 * i,
                    }}
                    className="relative overflow-hidden rounded-2xl border transition-colors duration-500"
                    style={{
                      borderColor: on ? accentA(0.5) : "rgba(127,127,127,0.18)",
                      backgroundColor: on ? accentA(0.06) : "transparent",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-expanded={on}
                      aria-controls={`project-panel-${p.id}`}
                      data-cursor="Preview"
                      className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/50"
                    >
                      <span
                        className="w-6 shrink-0 font-mono text-xs font-semibold transition-colors duration-300"
                        style={{ color: on ? ACCENT : "#8A8A8A" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-bold tracking-tight text-[#0A0A0A] dark:text-white sm:text-xl">
                          {p.title}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5F6368] dark:text-[#A0A0A0]">
                          <span style={{ color: on ? ACCENT : undefined }}>
                            {p.icon}
                          </span>
                          {p.category}
                        </span>
                      </span>
                      <FiChevronRight
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-[#5F6368] dark:text-[#A0A0A0] transition-transform duration-500 ${
                          on ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* details: animated open/close without measuring height */}
                    <div
                      id={`project-panel-${p.id}`}
                      aria-hidden={!on}
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-5 sm:px-5 sm:pl-[3.75rem]">
                          <p className="text-sm leading-relaxed text-[#5F6368] dark:text-[#A0A0A0] sm:text-base">
                            {p.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.techStack.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-[#0A0A0A] dark:text-white sm:text-xs"
                                style={{
                                  borderColor: accentA(0.3),
                                  backgroundColor: accentA(0.08),
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={on ? 0 : -1}
                              data-cursor="Live"
                              className="group inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 dark:bg-white dark:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                            >
                              View Project
                              <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={on ? 0 : -1}
                              data-cursor="Code"
                              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/5 px-5 py-2.5 text-sm font-medium tracking-tight text-[#0A0A0A] dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                            >
                              <FaGithub className="h-4 w-4" />
                              Source
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* auto-advance progress */}
                    {on && running && (
                      <motion.span
                        key={`${active}-${running}`}
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: AUTO_INTERVAL / 1000,
                          ease: "linear",
                        }}
                        className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                        style={{ backgroundColor: ACCENT }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </ol>

            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GitHub"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-[#5F6368] dark:text-[#A0A0A0] transition-colors hover:text-[#0A0A0A] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-full"
            >
              <FaGithub className="h-4 w-4" />
              More on GitHub
              <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
