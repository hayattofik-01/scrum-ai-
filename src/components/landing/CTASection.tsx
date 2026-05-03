import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import ContactDialog from "./ContactDialog";
import PilotApplicationDialog from "./PilotApplicationDialog";

const CTASection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-glow opacity-40" />
      </div>
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Limited early access spots</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Stop guessing.{" "}
              <span className="text-gradient">Start understanding.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Get a report that actually tells you what your developers built, whether you're on track, and what needs your attention.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <PilotApplicationDialog>
              <Button variant="hero" size="lg">
                Start free pilot
                <ArrowRight className="w-4 h-4" />
              </Button>
            </PilotApplicationDialog>
            <ContactDialog>
              <Button variant="hero-outline" size="lg">
                Book a demo
              </Button>
            </ContactDialog>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xs text-muted-foreground"
          >
            scrumai.tech · No credit card required
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
