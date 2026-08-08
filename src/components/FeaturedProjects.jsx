"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { FaGithub, FaBriefcase, FaLaptopCode, FaRocket } from "react-icons/fa6";

import SectionBadge from "./shared/SectionBadge";

const smoothEase = [0.22, 1, 0.36, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// --- Project Data ---
const projects = [
  {
    id: 1,
    title: "Legal Ease",
    category: "Legal Platform",
    icon: <FaBriefcase className="w-3.5 h-3.5" />,
    description:
      "A digital SaaS marketplace bridging the gap between legal professionals and clients. It democratizes access to justice with a secure, streamlined experience.",
    image: "https://i.ibb.co.com/N65TgMpV/Screenshot-2026-08-08-200440.png",
    liveUrl: "https://legal-ease-nafix.vercel.app/",
    githubUrl: "https://github.com/shariarnafis45/Legal-Ease",
    techStack: ["Next.js", "React", "MongoDB", "Node.js", "Tailwind"],
  },
  {
    id: 2,
    title: "HireLoop",
    category: "Job Hunting Portal",
    icon: <FaLaptopCode className="w-3.5 h-3.5" />,
    description:
      "A full-featured portal that streamlines job discovery and recruitment. Offers smart job search, company profiles, and a complete recruiter toolkit.",
    image: "https://i.ibb.co.com/v4X5rZQD/Screenshot-2026-08-08-200504.png",
    liveUrl: "https://hire-loop-nafix.vercel.app/",
    githubUrl: "https://github.com/shariarnafis45/Hire-Loop-Client",
    techStack: ["Next.js", "Express", "React", "Node.js", "Tailwind"],
  },
  {
    id: 3,
    title: "IdeaVault",
    category: "Startup Platform",
    icon: <FaRocket className="w-3.5 h-3.5" />,
    description:
      "Move beyond traditional scheduling with a focus purely on idea validation. Browse concepts, pitch startups, and provide valuable community feedback.",
    image: "https://i.ibb.co.com/YBRpzwyy/Screenshot-2026-08-08-200556.png",
    liveUrl: "https://idea-vault-nafix.vercel.app/",
    githubUrl: "https://github.com/shariarnafis45/Idea-Vault-Client-Side",
    techStack: ["Next.js", "MongoDB", "Express", "Node.js", "Tailwind"],
  },
];

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-[#F8F9FA] dark:bg-[#0A0A0A] transition-colors duration-700 font-sans"
    >
      {/* Background Radial Gradient (Matched exactly with AboutSection) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1f2937_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

      {/* Signature NAFIX Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full overflow-hidden flex justify-center pointer-events-none z-0 select-none">
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="text-[120px] sm:text-[180px] lg:text-[250px] font-extrabold text-black/[0.02] dark:text-white/[0.02] tracking-tighter whitespace-nowrap leading-none"
        >
          NAFIX.
        </motion.span>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10">
        {/* --- Header Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 relative z-10"
        >
          <div className="max-w-2xl flex flex-col items-start">
            <motion.div variants={fadeUpVariants} className="mb-5">
              <SectionBadge title="Featured Works" />
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] dark:text-white leading-[1.18] tracking-tight mb-5"
            >
              Projects That Define Impact — <br className="hidden sm:block" />
              <span className="text-[#4B5563] dark:text-[#9CA3AF]">
                Selected Works.
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="text-base sm:text-[1.05rem] text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed max-w-[26rem] lg:mb-5 lg:pl-6 lg:border-l-2 lg:border-black/10 dark:lg:border-white/10"
          >
            A curated selection of digital products where I bridged the gap
            between clean interfaces and robust architecture.
          </motion.p>
        </motion.div>

        {/* --- Projects Grid --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUpVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group flex flex-col bg-white/60 dark:bg-[#121214]/60 backdrop-blur-2xl p-3 sm:p-4 rounded-[2rem] border border-white/40 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/[0.02] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative w-full h-[220px] rounded-[1.5rem] overflow-hidden bg-[#F8F9FA] dark:bg-[#1A1A1D] mb-6">
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content Box */}
              <div className="flex flex-col flex-grow px-2 sm:px-4 pb-3 relative z-10">
                <div className="flex items-center gap-2 text-[#4B5563] dark:text-[#9CA3AF] group-hover:text-blue-600 dark:group-hover:text-blue-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-3 transition-colors duration-300">
                  {project.icon}
                  <span>{project.category}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="text-[11px] font-medium text-[#4B5563] dark:text-[#9CA3AF] bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05] px-3 py-1 rounded-lg backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions Layer */}
                <div className="flex items-center justify-between pt-5 border-t border-black/[0.06] dark:border-white/[0.06] mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-bold text-[#111827] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                  >
                    View Project
                    <FiArrowUpRight className="w-[18px] h-[18px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-all duration-300"
                    aria-label="View Source Code"
                  >
                    <FaGithub className="w-[18px] h-[18px]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- View All Button --- */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.4 }}
          className="mt-14 flex justify-center relative z-10"
        >
          <a
            href="#all-projects"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-sm font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          >
            Explore All Projects
            <FiArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
