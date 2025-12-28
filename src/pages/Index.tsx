import { Suspense, lazy } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";

// Lazy load below-the-fold sections
const StakesSection = lazy(() => import("@/components/landing/StakesSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const DifferentiationSection = lazy(() => import("@/components/landing/DifferentiationSection"));
const BenefitsSection = lazy(() => import("@/components/landing/BenefitsSection"));
const AudienceSection = lazy(() => import("@/components/landing/AudienceSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

// Minimal section loader
const SectionLoader = () => (
  <div className="h-40 flex items-center justify-center opacity-50">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PainSection />
      <Suspense fallback={<SectionLoader />}>
        <StakesSection />
        <SolutionSection />
        <DifferentiationSection />
        <BenefitsSection />
        <AudienceSection />
        <CTASection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
