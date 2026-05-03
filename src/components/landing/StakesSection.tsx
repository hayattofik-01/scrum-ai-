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
              When you can't see what's happening,{" "}
              <span className="text-gradient">you can't manage what's happening.</span>
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
              <p className="text-foreground font-medium mb-2">Most managers feel disconnected from dev work</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Not because they don't care — because no one is translating the work into language they understand.
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
              <p className="text-foreground font-medium mb-2">Hours every week spent chasing updates</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Standups, Slack pings, "Can you send me a quick update?" — all because there's no report that actually tells you what you need to know.
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
              Your developers are doing the work. But if you can't see it clearly, you can't lead effectively.
            </p>
            <p className="text-xl font-display font-semibold text-foreground">
              The real problem isn't your team.{" "}
              <span className="text-gradient">It's that you need a report that actually matters.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default StakesSection;
