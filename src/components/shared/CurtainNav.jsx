"use client";

import { useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

const curtainEase = [0.76, 0, 0.24, 1];

const CURTAIN = {
  hidden: { y: "120vh" },
  cover: { y: "0vh", transition: { duration: 0.75, ease: curtainEase } },
  reveal: {
    y: "-120vh",
    transition: { duration: 0.85, ease: curtainEase, delay: 0.12 },
  },
};

export function useCurtainNav() {
  const reduce = !!useReducedMotion();
  const controls = useAnimationControls();
  const [ui, setUi] = useState({ wiping: false, label: "" });
  const busy = useRef(false);

  const go = (id, label, fallback) => async (e) => {
    const target = document.getElementById(id);
    if (!target) {
      if (fallback) {
        e.preventDefault();
        window.location.href = fallback;
      }
      return;
    }
    e.preventDefault();

    const land = () => {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: "instant",
      });
      history.replaceState(null, "", `#${id}`);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    if (reduce) {
      land();
      return;
    }
    if (busy.current) return;
    busy.current = true;
    setUi({ wiping: true, label });
    await controls.start("cover");
    land();
    await controls.start("reveal");
    controls.set("hidden");
    setUi((u) => ({ ...u, wiping: false }));
    busy.current = false;
  };

  const curtain = (
    <motion.div
      aria-hidden="true"
      variants={CURTAIN}
      initial="hidden"
      animate={controls}
      style={{ backgroundColor: "rgb(var(--fx,16,185,129))" }}
      className={`fixed inset-x-0 -top-[15vh] z-[100] flex h-[130vh] items-center justify-center rounded-[50%/8vh] ${
        ui.wiping ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-3 text-white">
        <span className="text-sm font-medium tracking-tight text-white/80">
          Up next
        </span>
        <span className="text-4xl sm:text-6xl font-bold tracking-[-0.03em]">
          {ui.label}
        </span>
      </div>
    </motion.div>
  );

  return { go, curtain };
}