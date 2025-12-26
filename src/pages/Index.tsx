import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ValuePitchSection from "@/components/landing/ValuePitchSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import AudienceSection from "@/components/landing/AudienceSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValuePitchSection />
      <ProblemSection />
      <SolutionSection />
      <AudienceSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
