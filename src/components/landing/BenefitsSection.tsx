import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PilotApplicationDialog from "./PilotApplicationDialog";
import ContactDialog from "./ContactDialog";

const pilotFeatures = [
  "One GitHub repository",
  "Automated email delivery",
  "Live dashboard",
  "Client view + board view",
  "Full access for 14 days",
];

const customFeatures = [
  "Unlimited repositories",
  "Custom report structure",
  "Branded client reports",
  "Multiple stakeholder views",
  "Onboarding session included",
];

const BenefitsSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Pricing</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Simple pricing.
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Start free. Scale when you're ready.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Pilot card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative p-8 rounded-2xl border-2 border-primary/30 bg-primary/[0.03] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">Free pilot · 7 spots left</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">Pilot</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold text-foreground">£0</span>
                  <span className="text-muted-foreground">/ 14 days</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Full access. One repo. First report delivered in 20 minutes. No credit card required.</p>
                <ul className="space-y-3 mb-8">
                  {pilotFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <PilotApplicationDialog>
                  <Button variant="hero" size="lg" className="w-full">
                    Start free pilot
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </PilotApplicationDialog>
              </div>
            </motion.div>

            {/* Custom card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative p-8 rounded-2xl border border-border/40 bg-card/40 overflow-hidden"
            >
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-full">Custom · tailored reporting</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">Custom</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold text-foreground">Tailored</span>
                  <span className="text-muted-foreground">/ your team</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Built around the specific questions your clients and board always ask. We configure everything for you.</p>
                <ul className="space-y-3 mb-8">
                  {customFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ContactDialog>
                  <Button variant="hero-outline" size="lg" className="w-full">
                    Book a 20-min call
                    <Phone className="w-4 h-4" />
                  </Button>
                </ContactDialog>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default BenefitsSection;
