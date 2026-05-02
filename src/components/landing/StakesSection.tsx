import { motion } from "framer-motion";

const StakesSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">The Cost</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
              Bad reporting kills client relationships.{" "}
              <span className="text-gradient">Good reporting saves them.</span>
            </h2>
          </motion.div>

          {/* Stats — big numbers */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative p-8 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden group hover:border-destructive/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <p className="stat-number text-6xl sm:text-7xl mb-3">68%</p>
              <p className="text-foreground font-medium mb-2">of clients churn from agencies</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Not because the team underperformed — because the client never saw the progress.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative p-8 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <p className="stat-number text-6xl sm:text-7xl mb-3">5+ hrs</p>
              <p className="text-foreground font-medium mb-2">per week lost to reporting</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Someone on your team spends half a day every week writing status updates by hand.
              </p>
            </motion.div>
          </div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground mb-3">
              Your team is delivering. But if the reports don't land, trust erodes — and contracts don't renew.
            </p>
            <p className="text-xl font-display font-semibold text-foreground">
              The real risk isn't underperformance.{" "}
              <span className="text-gradient">It's great work that never gets reported.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default StakesSection;
