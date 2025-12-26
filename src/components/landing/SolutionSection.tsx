import { motion } from "framer-motion";
import { GitCompare, AlertTriangle, RotateCcw, ListChecks } from "lucide-react";

const features = [
  {
    icon: GitCompare,
    title: "Tracks discussions vs. movement",
    description: "Sees what was discussed vs what actually moved forward",
  },
  {
    icon: AlertTriangle,
    title: "Highlights open commitments",
    description: "Surfaces unresolved commitments before they become problems",
  },
  {
    icon: RotateCcw,
    title: "Detects recurring blockers",
    description: "Identifies blockers that keep returning week after week",
  },
  {
    icon: ListChecks,
    title: "Generates closure agendas",
    description: "Creates focused agendas for your next meeting",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What ScrumAI Does
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ScrumAI acts as your execution companion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Result statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center p-8 rounded-2xl glass"
          >
            <p className="text-lg text-muted-foreground mb-4">
              So your next standup or weekly sync starts with:
            </p>
            <p className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-6">
              What didn't close. What must move. What matters now.
            </p>
            <div className="flex items-center justify-center gap-6 text-primary font-medium">
              <span>No noise.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Just momentum.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
