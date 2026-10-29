"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import { ThemeSwitch } from "../ui/ThemeSwitch";
import Logo from "./Logo";
import { useCurtainNav } from "./CurtainNav";

const smoothEase = [0.22, 1, 0.36, 1];

const ACCENT = "rgb(var(--fx,16,185,129))";
const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;

/* One focus style for every control: visible on light and dark (>= 3:1). */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f7f5] dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-[#0A0A0A]";

/* Ring drawn on a wrapper when any control inside it has keyboard focus. */
const FOCUS_WITHIN =
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-600 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-[#f7f7f5] dark:has-[:focus-visible]:ring-emerald-400 dark:has-[:focus-visible]:ring-offset-[#0A0A0A]";

const EMAIL = "mailto:nafisshahworkmail@gmail.com";

/*
  Section registry. Keep the order identical to the page order.
  Education is reserved: set `enabled: true` once <section id="education">
  exists on the page. Nothing else in this file needs to change.
*/
const NAV_ITEMS = [
  { id: "home", name: "Home", label: "Back to Top" },
  { id: "about", name: "About", label: "About Me" },
  { id: "projects", name: "Projects", label: "Featured Works" },
  { id: "skills", name: "Skills", label: "My Expertise" },
  { id: "education", name: "Education", label: "Education", enabled: false },
  { id: "process", name: "Process", label: "How I Work" },
  { id: "contact", name: "Contact", label: "Let’s talk", fallback: EMAIL },
];
const NAV = NAV_ITEMS.filter((n) => n.enabled !== false);

const pad = (n) => String(n).padStart(2, "0");

const NavBar = () => {
  const reduce = !!useReducedMotion();
  const dur = (s) => (reduce ? 0 : s);
  const { go, curtain } = useCurtainNav();
  const { scrollY } = useScroll();

  const wrapRef = useRef(null);
  const toggleRef = useRef(null);
  const holdRef = useRef(0); /* header stays visible until this timestamp */

  const [active, setActive] = useState("home");
  const [hover, setHover] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeIndex = Math.max(
    0,
    NAV.findIndex((n) => n.id === active),
  );
  const activeItem = NAV[activeIndex];
  const pillTarget = hover ?? active;
  const talk = NAV.find((n) => n.id === "contact") ?? NAV[NAV.length - 1];

  /* Active section: observer for the middle of the viewport, plus a
     bottom-of-page check so a short last section can still become active. */
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(NAV[NAV.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (performance.now() < holdRef.current) {
      setHidden(false);
      return;
    }
    if (menuOpen || latest < 120) {
      setHidden(false);
    } else if (latest > prev && latest > 260) {
      setHidden(true);
    } else if (latest < prev) {
      setHidden(false);
    }
  });

  /* Menu: outside click and Escape close it; Escape returns focus to the button. */
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* Keyboard users tabbing out of the open menu close it. */
  const onWrapBlur = (e) => {
    if (
      menuOpen &&
      e.relatedTarget &&
      wrapRef.current &&
      !wrapRef.current.contains(e.relatedTarget)
    ) {
      setMenuOpen(false);
    }
  };

  const jump = (item) => (e) => {
    holdRef.current = performance.now() + 2600; /* covers the curtain wipe */
    setActive(item.id);
    setMenuOpen(false);
    go(item.id, item.label, item.fallback)(e);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-140%" : "0%" }}
        transition={{ duration: dur(0.5), ease: smoothEase }}
        onFocusCapture={() => setHidden(false)}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pb-4 pt-4 sm:px-6 sm:pt-6 md:px-8"
      >
        <div
          ref={wrapRef}
          onBlur={onWrapBlur}
          className="pointer-events-auto relative mx-auto max-w-[1200px]"
        >
          <nav
            aria-label="Main"
            className={`relative flex items-center justify-between gap-3 rounded-full border border-black/[0.06] bg-white/80 px-3 py-2.5 backdrop-blur-2xl transition-shadow duration-500 dark:border-white/10 dark:bg-[#0A0A0A]/80 sm:px-5 lg:px-6 ${
              scrolled
                ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-black/60"
                : "shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-transparent"
            }`}
          >
            {/* logo */}
            <div className="flex flex-1 items-center justify-start">
              <a
                href="#home"
                onClick={jump(NAV[0])}
                data-cursor="Top"
                aria-label="Shariar Nafis, back to top"
                className={`flex items-center rounded-md transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 ${FOCUS}`}
              >
                <Logo />
              </a>
            </div>

            {/* desktop links: sliding hover pill, persistent active dot */}
            <ul
              onPointerLeave={() => setHover(null)}
              className="hidden shrink-0 items-center justify-center gap-0.5 lg:flex xl:gap-1"
            >
              {NAV.map((n) => {
                const isActive = active === n.id;
                return (
                  <li
                    key={n.id}
                    className="relative"
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && setHover(n.id)
                    }
                  >
                    {pillTarget === n.id && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: accentA(0.12) }}
                      />
                    )}
                    <a
                      href={`#${n.id}`}
                      onClick={jump(n)}
                      aria-current={isActive ? "location" : undefined}
                      data-cursor="Go"
                      className={`relative block select-none rounded-full px-3.5 py-2 text-[15px] font-medium tracking-tight transition-colors duration-200 motion-reduce:transition-none xl:px-4 ${FOCUS} ${
                        isActive
                          ? "text-[#0A0A0A] dark:text-white"
                          : "text-[#5F6368] hover:text-[#0A0A0A] dark:text-[#8A8A8A] dark:hover:text-white"
                      }`}
                    >
                      {n.name}
                    </a>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* tablet: shows where you are, since the links live in the menu */}
            <div
              aria-hidden="true"
              className="hidden flex-shrink-0 items-center justify-center md:flex lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: dur(0.25), ease: smoothEase }}
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] px-4 py-1.5 font-mono text-xs font-medium text-[#0A0A0A] dark:border-white/10 dark:text-white"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {pad(activeIndex + 1)} · {activeItem.name}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* actions: one primary CTA, one theme switch, one menu button */}
            <div className="flex flex-1 items-center justify-end gap-2.5 sm:gap-3">
              <a
                href={`#${talk.id}`}
                onClick={jump(talk)}
                data-cursor="Talk"
                className={`group hidden h-11 items-center justify-center gap-2.5 rounded-full bg-[#0A0A0A] px-5 text-[15px] font-medium tracking-tight text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 dark:bg-white dark:text-[#0A0A0A] md:inline-flex ${FOCUS}`}
              >
                <span>Let&rsquo;s talk</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                >
                  <path
                    d="M3.33331 8H12.6666M12.6666 8L8 3.33334M12.6666 8L8 12.6667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-sm backdrop-blur-md transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 dark:border-white/10 dark:bg-white/5 ${FOCUS_WITHIN}`}
              >
                <ThemeSwitch />
              </div>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Main menu"
                aria-expanded={menuOpen}
                aria-controls={menuOpen ? "mobile-nav" : undefined}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-[#0A0A0A] transition-colors hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:hidden ${FOCUS}`}
              >
                <div className="relative flex h-4 w-4 flex-col items-center justify-center">
                  <span
                    className={`absolute h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                      menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                      menuOpen ? "scale-50 opacity-0" : "scale-100 opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                      menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>

          {/* mobile / tablet menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-nav"
                aria-label="Mobile"
                initial={reduce ? false : { opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                  transition: { duration: dur(0.18) },
                }}
                transition={{ duration: dur(0.35), ease: smoothEase }}
                className="absolute left-0 right-0 top-full mt-3 max-h-[calc(100dvh-7rem)] origin-top overflow-y-auto overscroll-contain rounded-3xl border border-black/[0.06] bg-white/90 p-3 shadow-xl shadow-black/[0.06] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0A0A0A]/90 dark:shadow-black/60 lg:hidden"
              >
                <ul className="flex flex-col gap-1">
                  {NAV.map((n, i) => {
                    const isActive = active === n.id;
                    return (
                      <motion.li
                        key={n.id}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: dur(0.4),
                          ease: smoothEase,
                          delay: reduce ? 0 : 0.05 + i * 0.045,
                        }}
                      >
                        <a
                          href={`#${n.id}`}
                          onClick={jump(n)}
                          aria-current={isActive ? "location" : undefined}
                          className={`flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 transition-colors duration-200 motion-reduce:transition-none ${FOCUS} ${
                            isActive
                              ? "text-[#0A0A0A] dark:text-white"
                              : "text-[#5F6368] hover:bg-black/5 hover:text-[#0A0A0A] dark:text-[#8A8A8A] dark:hover:bg-white/5 dark:hover:text-white"
                          }`}
                          style={
                            isActive
                              ? { backgroundColor: accentA(0.12) }
                              : undefined
                          }
                        >
                          <span className="flex items-center gap-4">
                            <span
                              aria-hidden="true"
                              className={`w-6 font-mono text-xs font-semibold ${
                                isActive
                                  ? "text-[#0A0A0A] dark:text-white"
                                  : "text-[#6B7280] dark:text-[#8A8A8A]"
                              }`}
                            >
                              {pad(i + 1)}
                            </span>
                            <span
                              className={`text-lg tracking-tight ${
                                isActive ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {n.name}
                            </span>
                          </span>
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: ACCENT }}
                            />
                          )}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.08] md:hidden">
                  <a
                    href={`#${talk.id}`}
                    onClick={jump(talk)}
                    className={`flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0A0A0A] text-[15px] font-medium tracking-tight text-white transition-transform active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 dark:bg-white dark:text-[#0A0A0A] ${FOCUS}`}
                  >
                    <span>Let&rsquo;s talk</span>
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
      {curtain}
    </>
  );
};

export default NavBar;
