"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiFileText,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";

import { useCurtainNav } from "../shared/CurtainNav";

/* -------------------------------------------------------------------------- */
/*  CONFIG                                                                    */
/* -------------------------------------------------------------------------- */

const smoothEase = [0.22, 1, 0.36, 1];

// Role colour shared by the Hero (it sets --fx on <html>). Falls back to emerald.
const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

const EMAIL_ADDRESS = "nafisshahworkmail@gmail.com";
const EMAIL = `mailto:${EMAIL_ADDRESS}`;
const RESUME_URL =
  "https://drive.google.com/file/d/1ESjhsVWJoq0psdPGi9Fwp8XrFBs1e8PY/view?usp=sharing";
const WHATSAPP_NUMBER = "8801774907808"; // +880 1774-907808
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Nafis, I found your portfolio and I’d like to talk.",
)}`;
const CONTACT_TARGET = "contact";

const LINKS = [
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
  { label: "WhatsApp", href: WHATSAPP, Icon: FaWhatsapp },
  { label: "Resume", href: RESUME_URL, Icon: FiFileText },
];

// Short nudge shown beside the button as the visitor reaches each section.
const NUDGES = {
  about: "Curious about something? Ask me.",
  projects: "Like what you see? Let’s talk.",
  skills: "Need this stack on your team?",
  process: "Start at step 01 with me.",
};
const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "process",
  "contact",
];

const FAB = 56; // closed size in px

/* -------------------------------------------------------------------------- */
/*  CONTACT DOCK                                                              */
/* -------------------------------------------------------------------------- */

export default function ContactDock() {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();
  const { scrollYProgress } = useScroll();

  const rootRef = useRef(null);
  const fabRef = useRef(null);
  const wasOpen = useRef(false);
  const engaged = useRef(false); // once the visitor opens it, stop nudging
  const seen = useRef(new Set());
  const copyTimer = useRef(null);

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("home");
  const [footerVisible, setFooterVisible] = useState(false);
  const [bubble, setBubble] = useState("");
  const [cardW, setCardW] = useState(320);
  const [copied, setCopied] = useState(false);

  // Hide while the contact section / footer are on screen (they already have the actions)
  const hidden = footerVisible || current === CONTACT_TARGET;

  /* ---- card width follows the screen ---- */
  useEffect(() => {
    const update = () => setCardW(Math.min(320, window.innerWidth - 32));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ---- which section is in the middle of the screen ---- */
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const footer = document.getElementById("footer");
    let fio;
    if (footer) {
      fio = new IntersectionObserver(
        ([e]) => setFooterVisible(e.isIntersecting),
        { threshold: 0 },
      );
      fio.observe(footer);
    }
    return () => {
      io.disconnect();
      fio?.disconnect();
    };
  }, []);

  /* ---- contextual nudge bubble ---- */
  useEffect(() => {
    if (open || hidden || engaged.current) return;
    const msg = NUDGES[current];
    if (!msg || seen.current.has(current)) return;
    const show = setTimeout(() => {
      seen.current.add(current);
      setBubble(msg);
    }, 1400);
    const hide = setTimeout(() => setBubble(""), 1400 + 3800);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      setBubble("");
    };
  }, [current, open, hidden]);

  /* ---- close on outside tap / Escape, and put focus back ---- */
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target))
        setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      fabRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const openDock = () => {
    engaged.current = true;
    setBubble("");
    setOpen(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = EMAIL; // clipboard blocked: open the mail app instead
    }
  };

  const rise = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.4,
            ease: smoothEase,
            delay: 0.16 + i * 0.06,
          },
        };

  return (
    <>
      <motion.div
        ref={rootRef}
        initial={false}
        animate={hidden ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: smoothEase }}
        className={`fixed bottom-4 right-4 z-[55] mb-[env(safe-area-inset-bottom,0px)] sm:bottom-6 sm:right-6 ${
          hidden ? "pointer-events-none" : ""
        }`}
        aria-hidden={hidden}
      >
        {/* nudge bubble */}
        <AnimatePresence>
          {bubble && !open && (
            <motion.button
              type="button"
              onClick={openDock}
              initial={reduce ? false : { opacity: 0, x: 14, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: smoothEase }}
              className="absolute bottom-2 right-[68px] flex max-w-[210px] items-center gap-2 rounded-2xl rounded-br-md border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#161618] px-3.5 py-2.5 text-left text-xs font-medium leading-snug text-[#0A0A0A] dark:text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              {bubble}
            </motion.button>
          )}
        </AnimatePresence>

        {/* the morphing surface: a round button that grows into a card */}
        <motion.div
          initial={false}
          animate={
            open
              ? { width: cardW, height: "auto", borderRadius: 28 }
              : { width: FAB, height: FAB, borderRadius: FAB / 2 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 34 }
          }
          style={{
            boxShadow: open
              ? `0 24px 60px rgba(0,0,0,0.22), 0 0 0 1px ${accentA(0.22)}`
              : "0 12px 30px rgba(0,0,0,0.22)",
          }}
          className={`relative ml-auto overflow-hidden border transition-colors duration-300 ${
            open
              ? "border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#111113]/95 backdrop-blur-2xl"
              : "border-transparent bg-[#0A0A0A] dark:bg-white"
          }`}
        >
          {/* closed state: round button with scroll-progress ring */}
          <button
            ref={fabRef}
            type="button"
            onClick={openDock}
            aria-label="Open contact options"
            aria-expanded={open}
            aria-controls="contact-dock-card"
            tabIndex={open ? -1 : 0}
            data-cursor="Connect"
            className={`group absolute bottom-0 right-0 flex items-center justify-center rounded-full text-white dark:text-[#0A0A0A] transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{ width: FAB, height: FAB }}
          >
            <svg
              viewBox="0 0 56 56"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            >
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                strokeWidth="2"
                className="stroke-white/15 dark:stroke-black/10"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress, stroke: ACCENT }}
              />
            </svg>

            <FiMessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />

            <span className="absolute right-[9px] top-[9px] flex h-2.5 w-2.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0A0A0A] dark:ring-white" />
            </span>
          </button>

          {/* open state: the card */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="card"
                id="contact-dock-card"
                role="dialog"
                aria-label="Contact options"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.3, delay: reduce ? 0 : 0.1 }}
                className="p-5"
                style={{ width: cardW }}
              >
                <motion.div
                  {...rise(0)}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5F6368] dark:text-[#A0A0A0]">
                      <span className="relative flex h-2 w-2">
                        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Open to work
                    </div>
                    <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-[#0A0A0A] dark:text-white">
                      Let&rsquo;s connect
                    </p>
                    <p className="mt-0.5 text-sm text-[#5F6368] dark:text-[#A0A0A0]">
                      Pick whatever&rsquo;s easiest for you.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close contact options"
                    data-cursor="Close"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/10 text-[#5F6368] dark:text-[#A0A0A0] transition-colors duration-300 hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-[#0A0A0A] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </motion.div>

                {/* copy email */}
                <motion.button
                  {...rise(1)}
                  type="button"
                  onClick={copyEmail}
                  data-cursor={copied ? "Copied" : "Copy"}
                  className="group mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] py-2.5 pl-4 pr-2.5 text-left transition-colors duration-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <span className="truncate font-mono text-[12px] font-medium text-[#0A0A0A] dark:text-white">
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
                </motion.button>
                <span aria-live="polite" className="sr-only">
                  {copied ? "Email address copied" : ""}
                </span>

                {/* link tiles */}
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {LINKS.map(({ label, href, Icon }, i) => (
                    <motion.a
                      key={label}
                      {...rise(2 + i * 0.5)}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Open"
                      className="group flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] px-1 py-3 text-[11px] font-medium text-[#0A0A0A] dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                        style={{
                          backgroundColor: accentA(0.12),
                          color: ACCENT,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </motion.a>
                  ))}
                </div>

                {/* primary action */}
                <motion.a
                  {...rise(4)}
                  href={`#${CONTACT_TARGET}`}
                  onClick={(e) => {
                    setOpen(false);
                    go(CONTACT_TARGET, "Let’s Talk", EMAIL)(e);
                  }}
                  data-cursor="Talk"
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3.5 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:opacity-90 dark:bg-white dark:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  Start a conversation
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Same curtain transition as the Hero */}
      {curtain}
    </>
  );
}
