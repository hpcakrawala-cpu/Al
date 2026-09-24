import React, { useEffect } from "react";
import Hero from "../components/sections/Hero";
import ServicesSection from "../components/sections/ServicesSection";
import StatsSection from "../components/sections/StatsSection";
import ProcessSection from "../components/sections/ProcessSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import BlogSection from "../components/sections/BlogSection";
import CTASection from "../components/sections/CTASection";
import { trackVisit } from "../lib/erp";

export default function Home() {
  useEffect(() => {
    trackVisit();
  }, []);
  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
