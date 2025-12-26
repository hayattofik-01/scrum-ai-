import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Zap } from "lucide-react";
import WaitlistDialog from "./WaitlistDialog";
import PilotApplicationDialog from "./PilotApplicationDialog";

const CTASection = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [pilotOpen, setPilotOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Be part of the first teams shaping ScrumAI
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              We're onboarding early teams who want stronger execution and clearer outcomes from recurring meetings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-6 mb-8"
          >
            {/* Pilot Card - Primary */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-primary/30 hover:border-primary/50 transition-all duration-300 text-left relative overflow-hidden order-1">
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-bl-lg">
                Limited Spots
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Apply for Early Pilot
              </h3>
              <p className="text-muted-foreground mb-4">
                Use ScrumAI with your real recurring meetings.
              </p>
              <Button variant="hero" size="lg" className="w-full" onClick={() => setPilotOpen(true)}>
                Apply for Pilot
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Waitlist Card */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 text-left order-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Join the Waitlist
              </h3>
              <p className="text-muted-foreground mb-4">
                Get launch updates and early access.
              </p>
              <Button variant="hero-outline" size="lg" className="w-full" onClick={() => setWaitlistOpen(true)}>
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            Pilot teams are prioritized if they run recurring standups, sprint cycles, and leadership syncs.
          </motion.p>
        </div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <PilotApplicationDialog open={pilotOpen} onOpenChange={setPilotOpen} />
    </section>
  );
};

export default CTASection;
