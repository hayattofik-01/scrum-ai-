import { motion } from "framer-motion";
import { TrendingDown, AlertTriangle } from "lucide-react";

const StakesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Execution drift is not annoying. <span className="text-gradient">It's expensive.</span>
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="p-6 rounded-2xl bg-gradient-card border border-destructive/20 text-center">
              <TrendingDown className="w-10 h-10 text-destructive mx-auto mb-4" />
              <p className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-2">75%</p>
              <p className="text-muted-foreground">of software projects fail to meet goals, timelines, or budgets</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-card border border-primary/20 text-center">
              <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-2">29%</p>
              <p className="text-muted-foreground">are delivered successfully</p>
            </div>
          </motion.div>

          {/* Key insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground mb-4">
              Delays don't happen suddenly. They start with small, repeated misses that nobody tracks — until it's too late.
            </p>
            <p className="text-xl font-display font-semibold text-foreground">
              The real danger isn't that problems happen.
              <br />
              <span className="text-gradient">It's not seeing them early enough to fix them.</span>
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              Source: Standish Group CHAOS findings summarized by Digicode, 2025.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StakesSection;
