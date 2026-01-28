import type { FC } from "react";
import PageTransition from "../components/PageTransition";
import AboutHero from "../components/about/AboutHero";
import QuickFactsSection from "../components/about/QuickFactsSection";
import PathTimelineSection from "../components/about/PathTimelineSection";
import HowIWorkSection from "../components/about/HowIWorkSection";
import LookingForSection from "../components/about/LookingForSection";
import OutsideWorkSection from "../components/about/OutsideWorkSection";
import AboutCtaSection from "../components/about/AboutCtaSection";

const AboutPage: FC = () => {
  return (
    <PageTransition>
      <div className="about-page">
        <AboutHero />
        <QuickFactsSection />
        <PathTimelineSection />
        <HowIWorkSection />
        <LookingForSection />
        <OutsideWorkSection />
        <AboutCtaSection />
      </div>
    </PageTransition>
  );
};

export default AboutPage;
