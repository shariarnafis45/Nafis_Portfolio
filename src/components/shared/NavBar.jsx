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

const EMAIL = "mailto:nafisshahworkmail@gmail.com";
const NAV = [
  { id: "home", name: "Home", label: "Back to Top" },
  { id: "about", name: "About", label: "About Me" },
  { id: "projects", name: "Projects", label: "Featured Works" },
  { id: "skills", name: "Skills", label: "My Expertise" },
  { id: "process", name: "Process", label: "How I Work" },
  { id: "contact", name: "Contact", label: "Let’s Talk", fallback: EMAIL },
];

const pad = (n) => String(n).padStart(2, "0");

const NavBar = () => {
  const reduce = !!useReducedMotion();
  const { go, curtain } = useCurtainNav();
  const { scrollY, scrollYProgress } = useScroll();

  const wrapRef = useRef(null);

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
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (menuOpen || latest < 120) {
      setHidden(false);
    } else if (latest > prev && latest > 260) {
      setHidden(true);
    } else if (latest < prev) {
      setHidden(false);
    }
  });
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const jump = (item) => (e) => {
    setActive(item.id);
    setMenuOpen(false);
    go(item.id, item.label, item.fallback)(e);
  };

  const talk = NAV[NAV.length - 1];

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-140%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.5, ease: smoothEase }}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 px-4 pb-4 pt-4 sm:px-6 sm:pt-6 md:px-8"
      >
        <div ref={wrapRef} className="relative mx-auto max-w-[1200px]">
          <nav
            aria-label="Main"
            className={`relative flex items-center justify-between gap-3 overflow-hidden rounded-full border border-white/50 dark:border-white/10 bg-white/80 dark:bg-[#0A0A0A]/80 px-3 py-2.5 backdrop-blur-2xl transition-shadow duration-500 sm:px-5 lg:px-6 ${
              scrolled
                ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-black/60"
                : "shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-transparent"
            }`}
          >
            {/* scroll progress */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
              style={{ scaleX: scrollYProgress, backgroundColor: ACCENT }}
            />

            {/* logo */}
            <div className="flex flex-1 items-center justify-start">
              <a
                href="#home"
                onClick={jump(NAV[0])}
                data-cursor="Top"
                aria-label="Back to top"
                className="flex items-center rounded-md transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <Logo />
              </a>
            </div>

            {/* desktop links with a sliding pill */}
            <ul
              onPointerLeave={() => setHover(null)}
              className="hidden shrink-0 items-center justify-center gap-1 lg:flex"
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
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: accentA(0.12) }}
                      />
                    )}
                    <a
                      href={`#${n.id}`}
                      onClick={jump(n)}
                      aria-current={isActive ? "page" : undefined}
                      data-cursor="Go"
                      className={`relative block select-none rounded-full px-4 py-2 text-[15px] tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                        isActive
                          ? "font-semibold text-[#0A0A0A] dark:text-white"
                          : "font-medium text-[#5F6368] dark:text-[#8A8A8A] hover:text-[#0A0A0A] dark:hover:text-white"
                      }`}
                    >
                      {n.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* tablet: shows where you are, since the links are tucked in the menu */}
            <div className="hidden flex-shrink-0 items-center justify-center md:flex lg:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: smoothEase }}
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] dark:border-white/10 px-4 py-1.5 font-mono text-xs font-medium text-[#0A0A0A] dark:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {pad(activeIndex + 1)} · {activeItem.name}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* actions: ONE theme switch for every screen size */}
            <div className="flex flex-1 items-center justify-end gap-2.5 sm:gap-3">
              <a
                href={`#${talk.id}`}
                onClick={jump(talk)}
                data-cursor="Talk"
                className="group hidden items-center justify-center gap-2.5 rounded-full bg-[#0A0A0A] px-6 py-3 text-[15px] font-medium tracking-tight text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] dark:bg-white dark:text-[#0A0A0A] md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <span>Let&rsquo;s Talk</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
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

              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm backdrop-blur-md transition-transform hover:scale-105 sm:h-11 sm:w-11">
                <ThemeSwitch />
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#0A0A0A] transition-colors hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <div className="relative flex h-4 w-4 flex-col items-center justify-center">
                  <span
                    className={`absolute h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                      menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                      menuOpen ? "scale-50 opacity-0" : "scale-100 opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                      menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>

          {/* mobile / tablet menu: numbered links */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-nav"
                initial={reduce ? false : { opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                  transition: { duration: 0.18 },
                }}
                transition={{ duration: 0.35, ease: smoothEase }}
                className="absolute left-0 right-0 top-full mt-3 origin-top rounded-3xl border border-white/80 dark:border-white/10 bg-white/90 dark:bg-[#0A0A0A]/90 p-3 shadow-xl shadow-black/[0.06] backdrop-blur-2xl dark:shadow-black/60 lg:hidden"
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
                          duration: 0.4,
                          ease: smoothEase,
                          delay: 0.05 + i * 0.045,
                        }}
                      >
                        <a
                          href={`#${n.id}`}
                          onClick={jump(n)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
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
                              className="w-6 font-mono text-xs font-semibold"
                              style={{ color: isActive ? ACCENT : "#8A8A8A" }}
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

                <div className="mt-3 border-t border-black/[0.05] pt-3 dark:border-white/[0.08] md:hidden">
                  <a
                    href={`#${talk.id}`}
                    onClick={jump(talk)}
                    className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0A0A0A] py-3.5 text-[15px] font-medium tracking-tight text-white transition-transform active:scale-[0.98] dark:bg-white dark:text-[#0A0A0A]"
                  >
                    <span>Let&rsquo;s Talk</span>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
      {curtain}
    </>
  );
};

export default NavBar;
