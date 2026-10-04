"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import { FiCheck, FiCopy, FiMail, FiArrowUpRight } from "react-icons/fi";

import SectionBadge from "./shared/SectionBadge";

const smoothEase = [0.22, 1, 0.36, 1];
const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

const EMAIL_ADDRESS = "nafisshahworkmail@gmail.com";
const WHATSAPP_NUMBER = "8801774907808";
const LINKEDIN = "https://www.linkedin.com/in/shariarnafis/";

const TYPES = [
  "Business website",
  "Web app (MERN)",
  "WordPress site",
  "E-commerce",
  "Something else",
];
const TIMELINES = ["As soon as possible", "Within a month", "Flexible"];
const NOTE_MAX = 400;

const Panel = ({ children, className = "", reduce, delay = 0 }) => {
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
      transition={{ duration: 0.8, ease: smoothEase, delay }}
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

const StepLabel = ({ n, children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="mb-3 flex items-center gap-3 text-base font-semibold tracking-tight text-[#0A0A0A] dark:text-white sm:text-lg"
  >
    <span
      className="font-mono text-xs font-semibold tracking-[0.14em]"
      style={{ color: ACCENT }}
    >
      {n}
    </span>
    {children}
  </label>
);

const Chip = ({ on, onClick, children, role = "checkbox" }) => (
  <button
    type="button"
    role={role}
    aria-checked={on}
    onClick={onClick}
    data-cursor="Pick"
    className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
    style={{
      borderColor: on ? accentA(0.55) : "rgba(127,127,127,0.25)",
      backgroundColor: on ? accentA(0.1) : "transparent",
      color: on ? undefined : undefined,
    }}
  >
    <span
      aria-hidden="true"
      className="flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300"
      style={{
        backgroundColor: on ? ACCENT : "transparent",
        border: on ? "none" : "1.5px solid rgba(127,127,127,0.45)",
        color: "#fff",
      }}
    >
      {on && <FiCheck className="h-2.5 w-2.5" />}
    </span>
    <span className="text-[#0A0A0A] dark:text-white">{children}</span>
  </button>
);

const inputClass =
  "w-full rounded-2xl border border-black/[0.1] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] px-4 py-3 text-base text-[#0A0A0A] dark:text-white placeholder:text-[#8A8A8A] transition-colors duration-300 focus:border-transparent focus:outline-none focus:ring-2 sm:text-sm";

export default function Contact() {
  const reduce = !!useReducedMotion();

  const [types, setTypes] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const cleanName = name.trim();
  const cleanNote = note.trim();
  const valid = cleanName.length > 0 && types.length > 0;

  const toggleType = (t) =>
    setTypes((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t],
    );

  // The same message powers the preview, WhatsApp, email and copy
  const message = [
    `Hi Nafis, I’m ${cleanName || "…"}.`,
    `I’d like help with: ${types.length ? types.join(", ") : "…"}.`,
    timeline && `Timeline: ${timeline}.`,
    cleanNote && `More details: ${cleanNote}`,
    "Sent from your portfolio.",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
  const emailHref = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    `Project inquiry${cleanName ? ` from ${cleanName}` : ""}`,
  )}&body=${encodeURIComponent(message)}`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing else to do */
    }
  };

  const btnBase =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50";
  const disabledCls = "cursor-not-allowed opacity-40";

  return (
    <section
      id="contact"
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
              <SectionBadge title="Let's Work Together" />
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
                  Tell me the idea.
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
                  I&rsquo;ll handle the rest.
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
            Answer a few quick questions and I&rsquo;ll build the brief for you.
            Send it on WhatsApp or email in one tap.
          </motion.p>
        </div>

        {/* ------------------------------- BODY ------------------------------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Brief builder */}
          <Panel reduce={reduce} className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="relative space-y-9">
              <fieldset>
                <legend className="sr-only">What are you building?</legend>
                <StepLabel n="01">What are you building?</StepLabel>
                <div
                  role="group"
                  aria-label="Project types, pick any"
                  className="flex flex-wrap gap-2.5"
                >
                  {TYPES.map((t) => (
                    <Chip
                      key={t}
                      on={types.includes(t)}
                      onClick={() => toggleType(t)}
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="sr-only">Timeline</legend>
                <StepLabel n="02">When do you need it?</StepLabel>
                <div
                  role="radiogroup"
                  aria-label="Timeline"
                  className="flex flex-wrap gap-2.5"
                >
                  {TIMELINES.map((t) => (
                    <Chip
                      key={t}
                      role="radio"
                      on={timeline === t}
                      onClick={() => setTimeline((cur) => (cur === t ? "" : t))}
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <div>
                <StepLabel n="03" htmlFor="contact-name">
                  What should I call you?
                </StepLabel>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputClass}
                  style={{ "--tw-ring-color": accentA(0.5) }}
                />
              </div>

              <div>
                <StepLabel n="04" htmlFor="contact-note">
                  Anything else I should know?{" "}
                  <span className="text-sm font-normal text-[#8A8A8A]">
                    optional
                  </span>
                </StepLabel>
                <textarea
                  id="contact-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
                  rows={4}
                  placeholder="A link, a rough scope, a deadline, anything that helps"
                  className={`${inputClass} resize-none`}
                  style={{ "--tw-ring-color": accentA(0.5) }}
                />
                <p className="mt-1.5 text-right font-mono text-[11px] text-[#8A8A8A]">
                  {note.length}/{NOTE_MAX}
                </p>
              </div>
            </div>
          </Panel>

          {/* Live preview + send */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[2.5rem] opacity-70 blur-3xl"
                style={{
                  background: `radial-gradient(60% 60% at 50% 35%, ${accentA(
                    0.2,
                  )}, transparent)`,
                }}
              />

              <div className="relative z-10 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#0B0B0D] shadow-[0_30px_60px_rgba(0,0,0,0.18)] dark:shadow-black/60">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">
                    brief.md
                  </span>
                  <span className="w-[42px]" aria-hidden="true" />
                </div>

                <div
                  className="p-5 font-mono text-[12px] leading-[1.8] text-zinc-200 sm:p-6 sm:text-[13px]"
                  aria-label="Live preview of your message"
                >
                  <p className="text-purple-400"># project brief</p>
                  <div className="h-2" />

                  <p className="break-words">
                    <span className="text-sky-300">from</span>
                    <span className="text-zinc-500">: </span>
                    {cleanName ? (
                      <span className="text-emerald-300">{cleanName}</span>
                    ) : (
                      <span className="text-zinc-600">…</span>
                    )}
                  </p>
                  <p className="break-words">
                    <span className="text-sky-300">building</span>
                    <span className="text-zinc-500">: </span>
                    {types.length ? (
                      <span className="text-emerald-300">
                        {types.join(", ")}
                      </span>
                    ) : (
                      <span className="text-zinc-600">…</span>
                    )}
                  </p>
                  <p className="break-words">
                    <span className="text-sky-300">timeline</span>
                    <span className="text-zinc-500">: </span>
                    {timeline ? (
                      <span className="text-emerald-300">{timeline}</span>
                    ) : (
                      <span className="text-zinc-600">…</span>
                    )}
                  </p>
                  {cleanNote && (
                    <p className="break-words">
                      <span className="text-sky-300">note</span>
                      <span className="text-zinc-500">: </span>
                      <span className="text-amber-300">{cleanNote}</span>
                    </p>
                  )}

                  <div className="h-3" />
                  <p>
                    {valid ? (
                      <span className="text-emerald-400">✔ ready to send</span>
                    ) : (
                      <span className="text-zinc-500">
                        … add your name and a project type
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-pulse motion-reduce:animate-none"
                      style={{ backgroundColor: ACCENT }}
                    />
                  </p>
                </div>
              </div>
            </motion.div>

            {/* send actions */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: smoothEase, delay: 0.2 }}
              className="mt-2"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                {valid ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Send"
                    className={`${btnBase} group bg-[#0A0A0A] text-white hover:-translate-y-0.5 hover:opacity-90 dark:bg-white dark:text-[#0A0A0A]`}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Send on WhatsApp
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className={`${btnBase} bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] ${disabledCls}`}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Send on WhatsApp
                  </span>
                )}

                {valid ? (
                  <a
                    href={emailHref}
                    data-cursor="Send"
                    className={`${btnBase} border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/5 text-[#0A0A0A] dark:text-white hover:-translate-y-0.5 hover:bg-white dark:hover:bg-white/10`}
                  >
                    <FiMail className="h-4 w-4" />
                    Send by email
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className={`${btnBase} border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/5 text-[#0A0A0A] dark:text-white ${disabledCls}`}
                  >
                    <FiMail className="h-4 w-4" />
                    Send by email
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-[#5F6368] dark:text-[#A0A0A0]">
                <button
                  type="button"
                  onClick={copyBrief}
                  disabled={!valid}
                  data-cursor={copied ? "Copied" : "Copy"}
                  className="inline-flex items-center gap-2 rounded-full font-medium transition-colors duration-300 hover:text-[#0A0A0A] dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  {copied ? (
                    <FiCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <FiCopy className="h-4 w-4" />
                  )}
                  {copied ? "Brief copied" : "Copy the brief"}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? "Brief copied to clipboard" : ""}
                </span>

                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  className="inline-flex items-center gap-2 rounded-full font-medium transition-colors duration-300 hover:text-[#0A0A0A] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                  Or find me on LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
