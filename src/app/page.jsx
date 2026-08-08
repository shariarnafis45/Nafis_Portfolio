import AboutSection from "@/components/AboutSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection/>
      <FeaturedProjects/>
      <SkillsSection/>
    </>
  );
};

export default HomePage;
