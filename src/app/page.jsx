import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import SiteEffects from "@/components/ui/SiteEffects";
import React from "react";

const HomePage = () => (
  <>
    <SiteEffects />
    <main className="relative z-10">
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <SkillsSection />
      <CTASection />
    </main>
  </>
);

export default HomePage;
