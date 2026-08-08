import AboutSection from "@/components/AboutSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/Hero";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection/>
      <FeaturedProjects/>
    </>
  );
};

export default HomePage;
