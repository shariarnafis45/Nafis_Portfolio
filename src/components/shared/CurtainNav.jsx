"use client";

import { useEffect, useRef, useState } from "react";
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

/*
  Navbar, Dock and Hero each render their own curtain. This module-level
  owner makes sure only ONE wipe runs at a time across all of them.
*/
let activeOwner = null;

export function useCurtainNav() {
  const reduce = !!useReducedMotion();
  const controls = useAnimationControls();
  const [ui, setUi] = useState({ wiping: false, label: "" });
  const owner = useRef(Symbol("curtain"));

  /* If this instance unmounts mid-wipe, free the lock. */
  useEffect(() => {
    const me = owner.current;
    return () => {
      if (activeOwner === me) activeOwner = null;
    };
  }, []);

  const go = (id, label, fallback) => async (e) => {
    /* Let the browser handle new-tab / new-window clicks. */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0)
      return;

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

    /* Already sitting at the top of this section: no wipe needed. */
    const alreadyThere = Math.abs(target.getBoundingClientRect().top) < 8;
    if (reduce || alreadyThere) {
      land();
      return;
    }

    if (activeOwner) return; // another wipe is running
    activeOwner = owner.current;
    setUi({ wiping: true, label });

    try {
      await controls.start("cover");
      land();
      await controls.start("reveal");
    } finally {
      try {
        controls.set("hidden");
      } catch {
        /* unmounted mid-wipe */
      }
      setUi((u) => ({ ...u, wiping: false }));
      if (activeOwner === owner.current) activeOwner = null;
    }
  };

  const curtain = (
    <motion.div
      aria-hidden="true"
      variants={CURTAIN}
      initial="hidden"
      animate={controls}
      style={{
        backgroundColor: "rgb(var(--fx,16,185,129))",
        color: "rgb(var(--fx-ink,10,10,10))",
      }}
      className={`fixed inset-x-0 -top-[15vh] z-[100] flex h-[130vh] items-center justify-center rounded-[50%/8vh] ${
        ui.wiping ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm font-medium tracking-tight opacity-80">
          Up next
        </span>
        <span className="text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
          {ui.label}
        </span>
      </div>
    </motion.div>
  );

  return { go, curtain };
}
