import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";
import StakesSection from "@/components/landing/StakesSection";
import SolutionSection from "@/components/landing/SolutionSection";
import DifferentiationSection from "@/components/landing/DifferentiationSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import AudienceSection from "@/components/landing/AudienceSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PainSection />
      <StakesSection />
      <SolutionSection />
      <DifferentiationSection />
      <BenefitsSection />
      <AudienceSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
