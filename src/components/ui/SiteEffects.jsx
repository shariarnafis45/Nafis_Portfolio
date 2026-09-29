"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const S = 32,
  OFFSET = 16,
  R = 190,
  TAU = Math.PI * 2;

export default function SiteEffects() {
  const reduce = !!useReducedMotion();
  const canvasRef = useRef(null);
  const [ring, setRing] = useState({ show: false, label: "" });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const root = document.documentElement;

    let w = 0,
      h = 0,
      raf = 0;
    let dark = root.classList.contains("dark");
    const pointer = { x: -999, y: -999, inside: false };
    const cur = { x: -999, y: -999, energy: 0, r: 16, g: 185, b: 129 };

    // Hero role colour comes in through the --fx CSS variable ("r,g,b")
    const readColor = () => {
      const v = getComputedStyle(root).getPropertyValue("--fx").trim();
      return v ? v.split(",").map(Number) : [16, 185, 129];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const live = cur.energy > 0.01;
      const R2 = R * R;

      ctx.fillStyle = dark ? "rgba(255,255,255,0.09)" : "rgba(15,23,42,0.11)";
      ctx.beginPath();
      for (let px = OFFSET; px < w; px += S) {
        for (let py = OFFSET; py < h; py += S) {
          if (live) {
            const dx = px - cur.x,
              dy = py - cur.y;
            if (dx * dx + dy * dy < R2) continue;
          }
          ctx.moveTo(px + 1.2, py);
          ctx.arc(px, py, 1.2, 0, TAU);
        }
      }
      ctx.fill();
      if (!live) return;

      const i0 = Math.max(0, Math.floor((cur.x - R - OFFSET) / S));
      const i1 = Math.ceil((cur.x + R - OFFSET) / S);
      const j0 = Math.max(0, Math.floor((cur.y - R - OFFSET) / S));
      const j1 = Math.ceil((cur.y + R - OFFSET) / S);
      const col = `${Math.round(cur.r)},${Math.round(cur.g)},${Math.round(cur.b)}`;

      for (let i = i0; i <= i1; i++) {
        const px = OFFSET + i * S;
        if (px >= w) break;
        for (let j = j0; j <= j1; j++) {
          const py = OFFSET + j * S;
          if (py >= h) break;
          const dx = px - cur.x,
            dy = py - cur.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= R2) continue;
          const d = Math.sqrt(d2) || 0.0001;
          const t = 1 - d / R;
          const e = t * t * (3 - 2 * t) * cur.energy;
          ctx.fillStyle = `rgba(${col},${0.14 + e * 0.8})`;
          ctx.beginPath();
          ctx.arc(
            px + (dx / d) * e * 11,
            py + (dy / d) * e * 11,
            1.2 + e * 2.7,
            0,
            TAU,
          );
          ctx.fill();
        }
      }
    };

    const tick = () => {
      if (cur.x < -500) {
        cur.x = pointer.x;
        cur.y = pointer.y;
      }
      cur.x += (pointer.x - cur.x) * 0.2;
      cur.y += (pointer.y - cur.y) * 0.2;
      cur.energy += ((pointer.inside ? 1 : 0) - cur.energy) * 0.09;
      const [tr, tg, tb] = readColor();
      cur.r += (tr - cur.r) * 0.08;
      cur.g += (tg - cur.g) * 0.08;
      cur.b += (tb - cur.b) * 0.08;
      draw();
      if (pointer.inside || cur.energy > 0.01)
        raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        cur.x = cur.y = -999;
        draw();
      }
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (e) => {
      if (reduce || e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
      x.set(e.clientX);
      y.set(e.clientY);
      const label = e.target.closest?.("[data-cursor]")?.dataset.cursor ?? "";
      setRing((c) => (c.show && c.label === label ? c : { show: true, label }));
      start();
    };
    const onLeave = () => {
      pointer.inside = false;
      setRing((c) => (c.show ? { show: false, label: "" } : c));
      start();
    };

    const mo = new MutationObserver(() => {
      dark = root.classList.contains("dark");
      draw();
    });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ x: rx, y: ry }}
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden [@media(pointer:fine)]:block"
        >
          <div
            style={{
              width: ring.label ? 84 : 34,
              height: ring.label ? 84 : 34,
              opacity: ring.show ? 1 : 0,
              backgroundColor: `rgba(var(--fx, 16,185,129), ${ring.label ? 0.92 : 0.06})`,
              borderColor: `rgba(var(--fx, 16,185,129), ${ring.label ? 0 : 0.7})`,
            }}
            className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-[1.5px] transition-[width,height,opacity,background-color,border-color] duration-500 ease-out"
          >
            {ring.label && (
              <span className="text-[11px] font-semibold tracking-tight text-white">
                {ring.label}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
