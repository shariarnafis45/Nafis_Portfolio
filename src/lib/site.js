/*
  Single source of truth for the portfolio.
  Import with:  import { SITE, CTA, ... } from "@/lib/site";
  Save this file as:  lib/site.js
*/

export const SITE = {
  name: "Shariar Nafis", // public name
  brand: "Nafix", // brand / handle only
  role: "Junior Full Stack Engineer",
  availability: "Open to junior roles & freelance projects",
  email: "nafisshahworkmail@gmail.com",
  whatsappNumber: "8801774907808", // +880 1774-907808
  github: "https://github.com/shariarnafis45/",
  linkedin: "https://www.linkedin.com/in/shariarnafis/",
  resume:
    "https://drive.google.com/file/d/1ESjhsVWJoq0psdPGi9Fwp8XrFBs1e8PY/view?usp=sharing",
};

export const MAILTO = `mailto:${SITE.email}`;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  "Hi Nafis, I found your portfolio and I’d like to talk.",
)}`;

/* One primary contact label everywhere (sentence case). */
export const CTA = {
  talk: "Let’s talk",
};

/* Page order. Sections that are not on the page yet (education) are skipped
   by every observer, so it is safe to list them early. */
export const SECTIONS = [
  "home",
  "about",
  "projects",
  "skills",
  "education",
  "process",
  "contact",
];

export const smoothEase = [0.22, 1, 0.36, 1];

export const ACCENT = "rgb(var(--fx,16,185,129))";
export const accentA = (a) => `rgba(var(--fx,16,185,129),${a})`;
export const INK = "rgb(var(--fx-ink,10,10,10))";
export const inkA = (a) => `rgba(var(--fx-ink,10,10,10),${a})`;

/* Keyboard focus ring: fixed emerald, visible on both themes (>= 3:1). */
export const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f7f5] dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-[#0A0A0A]";
