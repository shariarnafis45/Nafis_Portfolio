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
import {
  ACCENT,
  CTA,
  FOCUS,
  INK,
  MAILTO,
  SECTIONS,
  SITE,
  WHATSAPP_URL,
  accentA,
  smoothEase,
} from "@/lib/site";

const CONTACT_TARGET = "contact";

const LINKS = [
  { label: "GitHub", href: SITE.github, Icon: FaGithub },
  { label: "LinkedIn", href: SITE.linkedin, Icon: FaLinkedinIn },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: FaWhatsapp },
  { label: "Resume", href: SITE.resume, Icon: FiFileText },
];

// Short nudge shown beside the button as the visitor reaches each section.
const NUDGES = {
  about: "Curious about something? Ask me.",
  projects: "Like what you see? Let’s talk.",
  skills: "Need this stack on your team?",
  process: "Start at step 01 with me.",
};

const FAB = 56; // closed size in px

/* The round button sits inside an overflow-hidden surface, so its ring is
   drawn inside (inset) and uses the colour that contrasts with the fill. */
const FAB_FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-600";

/* -------------------------------------------------------------------------- */
/*  CONTACT DOCK                                                              */
/* -------------------------------------------------------------------------- */

export default function ContactDock() {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();
  const { scrollYProgress } = useScroll();

  const rootRef = useRef(null);
  const fabRef = useRef(null);
  const cardRef = useRef(null);
  const restoreFocus = useRef(false);
  const engaged = useRef(false);
  const seen = useRef(new Set());
  const copyTimer = useRef(null);

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("home");
  const [endVisible, setEndVisible] = useState(false);
  const [bubble, setBubble] = useState("");
  const [cardW, setCardW] = useState(320);
  const [copied, setCopied] = useState(false);

  /* Contact and the footer already carry the same actions, so step aside. */
  const hidden = endVisible;

  /* ---- card width follows the screen ---- */
  useEffect(() => {
    const update = () => setCardW(Math.min(320, window.innerWidth - 32));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ---- which section is in the middle of the screen / near the end ---- */
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
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

    const endEls = [CONTACT_TARGET, "footer"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const visible = new Set();
    const eio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        setEndVisible(visible.size > 0);
      },
      { threshold: 0.2 },
    );
    endEls.forEach((el) => eio.observe(el));

    return () => {
      io.disconnect();
      eio.disconnect();
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

  const closeDock = (restore = false) => {
    restoreFocus.current = restore;
    setOpen(false);
  };

  /* ---- close on outside tap / Escape ---- */
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target))
        closeDock(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeDock(true);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* ---- focus: into the card on open; back to the button only after a
          keyboard / close-button dismissal (never steal it from a click) ---- */
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() =>
        cardRef.current?.focus({ preventScroll: true }),
      );
      return () => cancelAnimationFrame(id);
    }
    if (restoreFocus.current) {
      restoreFocus.current = false;
      fabRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  /* ---- keyboard users tabbing out of the open card close it ---- */
  const onRootBlur = (e) => {
    if (
      open &&
      e.relatedTarget &&
      rootRef.current &&
      !rootRef.current.contains(e.relatedTarget)
    ) {
      closeDock(false);
    }
  };

  /* ---- hidden = not focusable and not clickable (set imperatively so it
          works on any React version) ---- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (hidden) {
      el.setAttribute("inert", "");
      setOpen(false);
    } else {
      el.removeAttribute("inert");
    }
  }, [hidden]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const openDock = () => {
    engaged.current = true;
    setBubble("");
    setOpen(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = MAILTO; // clipboard blocked: open the mail app instead
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
        onBlur={onRootBlur}
        initial={false}
        animate={hidden ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: smoothEase }}
        className={`fixed bottom-4 right-4 z-[55] mb-[env(safe-area-inset-bottom,0px)] sm:bottom-6 sm:right-6 ${
          hidden ? "pointer-events-none" : ""
        }`}
        aria-hidden={hidden ? true : undefined}
      >
        {/* nudge bubble: a mouse-only extra, the button itself is the real control */}
        <AnimatePresence>
          {bubble && !open && (
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={openDock}
              initial={reduce ? false : { opacity: 0, x: 14, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: smoothEase }}
              className="absolute bottom-2 right-[68px] flex max-w-[210px] items-center gap-2 rounded-2xl rounded-br-md border border-black/[0.08] bg-white px-3.5 py-2.5 text-left text-xs font-medium leading-snug text-[#0A0A0A] shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#111111] dark:text-white"
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
          className={`relative ml-auto overflow-hidden border transition-colors duration-300 motion-reduce:transition-none ${
            open
              ? "border-black/10 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-[#111111]/95"
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
            aria-controls={open ? "contact-dock-card" : undefined}
            aria-hidden={open ? true : undefined}
            tabIndex={open ? -1 : 0}
            data-cursor="Connect"
            className={`group absolute bottom-0 right-0 flex items-center justify-center rounded-full text-white transition-opacity duration-200 dark:text-[#0A0A0A] ${FAB_FOCUS} ${
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

            <FiMessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100" />

            <span
              aria-hidden="true"
              className="absolute right-[9px] top-[9px] flex h-2.5 w-2.5"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0A0A0A] dark:ring-white" />
            </span>
          </button>

          {/* open state: the card */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="card"
                ref={cardRef}
                id="contact-dock-card"
                role="dialog"
                aria-labelledby="contact-dock-title"
                tabIndex={-1}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{
                  duration: reduce ? 0 : 0.3,
                  delay: reduce ? 0 : 0.1,
                }}
                className="p-5 outline-none"
                style={{ width: cardW }}
              >
                <motion.div
                  {...rise(0)}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="flex items-start gap-2 text-xs font-medium leading-snug text-[#5F6368] dark:text-[#8A8A8A]">
                      <span
                        aria-hidden="true"
                        className="relative mt-[3px] flex h-2 w-2 shrink-0"
                      >
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      {SITE.availability}
                    </p>
                    <p
                      id="contact-dock-title"
                      className="mt-2 text-xl font-bold tracking-[-0.02em] text-[#0A0A0A] dark:text-white"
                    >
                      Get in touch
                    </p>
                    <p className="mt-0.5 text-sm text-[#5F6368] dark:text-[#8A8A8A]">
                      Pick whatever&rsquo;s easiest for you.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => closeDock(true)}
                    aria-label="Close contact options"
                    data-cursor="Close"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.08] text-[#5F6368] transition-colors duration-300 hover:bg-black/[0.05] hover:text-[#0A0A0A] dark:border-white/10 dark:text-[#8A8A8A] dark:hover:bg-white/10 dark:hover:text-white ${FOCUS}`}
                  >
                    <FiX aria-hidden="true" className="h-4 w-4" />
                  </button>
                </motion.div>

                {/* copy email */}
                <motion.button
                  {...rise(1)}
                  type="button"
                  onClick={copyEmail}
                  aria-label={`Copy email address ${SITE.email}`}
                  data-cursor={copied ? "Copied" : "Copy"}
                  className={`group mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border border-black/[0.08] bg-black/[0.02] py-2.5 pl-4 pr-2.5 text-left transition-colors duration-300 hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] ${FOCUS}`}
                >
                  <span className="truncate font-mono text-xs font-medium text-[#0A0A0A] dark:text-white">
                    {SITE.email}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                    style={{ backgroundColor: ACCENT, color: INK }}
                  >
                    {copied ? (
                      <FiCheck className="h-4 w-4" />
                    ) : (
                      <FiCopy className="h-4 w-4" />
                    )}
                  </span>
                </motion.button>
                <span role="status" aria-live="polite" className="sr-only">
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
                      className={`group flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-black/[0.08] bg-black/[0.02] px-1 py-3 text-xs font-medium text-[#0A0A0A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.05] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] ${FOCUS}`}
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100"
                        style={{
                          backgroundColor: accentA(0.12),
                          color: ACCENT,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </motion.a>
                  ))}
                </div>

                {/* primary action */}
                <motion.a
                  {...rise(4)}
                  href={`#${CONTACT_TARGET}`}
                  onClick={(e) => {
                    closeDock(false);
                    go(CONTACT_TARGET, CTA.talk, MAILTO)(e);
                  }}
                  data-cursor="Talk"
                  className={`group mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:opacity-90 motion-reduce:transition-none dark:bg-white dark:text-[#0A0A0A] ${FOCUS}`}
                >
                  {CTA.talk}
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                  />
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
