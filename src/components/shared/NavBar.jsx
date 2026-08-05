"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-6 pb-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto relative">
        <nav
          className={`
            relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 rounded-full
            transition-all duration-500 ease-[0.16,1,0.3,1]
            bg-white/80 dark:bg-[#0A0A0A]/80
            backdrop-blur-2xl webkit-backdrop-blur-2xl
            border border-white/50 dark:border-white/10
            ${
              isScrolled
                ? "shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-black/60"
                : "shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-transparent"
            }
          `}
        >
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="#home"
              className="flex items-center focus:outline-none rounded-md transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo />
            </Link>
          </div>

          <ul className="hidden lg:flex flex-shrink-0 items-center justify-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <li
                  key={link.name}
                  className="relative flex flex-col items-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setActiveSection(link.name)}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      text-[15px] tracking-tight py-1 transition-colors duration-200 select-none
                      ${
                        isActive
                          ? "text-[#0A0A0A] dark:text-white font-semibold"
                          : "text-[#5F6368] dark:text-[#8A8A8A] font-medium hover:text-[#0A0A0A] dark:hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </Link>

                  {isActive && (
                    <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#0A0A0A] dark:bg-white transition-all duration-300 animate-in fade-in zoom-in" />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex-1 flex justify-end items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              {/* Primary CTA Button */}
              <Link
                href="#contact"
                className="
                  group inline-flex items-center justify-center gap-2.5
                  px-6 py-3 rounded-full text-[15px] font-medium tracking-tight
                  bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A]
                  transition-all duration-300 ease-[0.16,1,0.3,1]
                  hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                "
              >
                <span>Let's Talk</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  <path
                    d="M3.33331 8H12.6666M12.6666 8L8 3.33334M12.6666 8L8 12.6667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Theme Switcher Button */}
              <div className="w-11 h-11 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 backdrop-blur-md flex items-center justify-center shadow-sm transition-transform hover:scale-105 cursor-pointer">
                <ThemeSwitch />
              </div>
            </div>

            {/* Mobile Menu & Theme Toggle Trigger (Visible on small screens) */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm">
                <ThemeSwitch />
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#0A0A0A] dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <div className="relative w-4 h-4 flex flex-col justify-center items-center">
                  <span
                    className={`absolute h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ease-out ${
                      mobileMenuOpen
                        ? "rotate-45 translate-y-0"
                        : "-translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ease-out ${
                      mobileMenuOpen
                        ? "opacity-0 scale-50"
                        : "opacity-100 scale-100"
                    }`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ease-out ${
                      mobileMenuOpen
                        ? "-rotate-45 translate-y-0"
                        : "translate-y-1.5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        <div
          className={`
            absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl lg:hidden
            bg-white/90 dark:bg-[#0A0A0A]/90
            backdrop-blur-2xl webkit-backdrop-blur-2xl
            border border-white/80 dark:border-white/10
            shadow-xl shadow-black/[0.06] dark:shadow-black/60
            transform origin-top transition-all duration-300 ease-[0.16,1,0.3,1]
            ${
              mobileMenuOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }
          `}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      flex items-center justify-between px-5 py-3.5 rounded-2xl text-[15px] font-medium tracking-tight transition-all duration-200
                      ${
                        isActive
                          ? "bg-black/5 dark:bg-white/10 text-[#0A0A0A] dark:text-white font-semibold"
                          : "text-[#5F6368] dark:text-[#8A8A8A] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white"
                      }
                    `}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] dark:bg-white" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.08]">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-[15px] font-medium tracking-tight
                bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A]
                transition-transform active:scale-[0.98]
              "
            >
              <span>Let's Talk</span>
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
