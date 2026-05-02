import { motion } from "framer-motion";
import { HelpCircle, Clock, FileQuestion, Eye } from "lucide-react";

const painPoints = [
  {
    icon: HelpCircle,
    title: "\"Where do we stand?\"",
    text: "Stakeholders ask for updates. You spend hours digging through GitHub, Slack, and standups to piece together an answer.",
  },
  {
    icon: Clock,
    title: "Hours lost to reporting",
    text: "Every week, someone on your team manually writes a progress report instead of doing actual work.",
  },
  {
    icon: FileQuestion,
    title: "Reports nobody reads",
    text: "When reports finally go out, they're too technical, too vague, or too late for stakeholders to care.",
  },
  {
    icon: Eye,
    title: "Great work, zero credit",
    text: "Your team ships constantly — but stakeholders can't see it, so they assume nothing is happening.",
  },
];

const PainSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header — left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">The Problem</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              Your team ships every day. Your stakeholders have no idea.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GitHub is where the work happens. But the people who pay for that work can't read GitHub.
            </p>
          </motion.div>

          {/* Pain point cards — 2×2 grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative p-6 rounded-xl bg-secondary/30 border border-border/40 hover:border-destructive/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-destructive/70" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 p-8 rounded-2xl border border-border/40 bg-gradient-card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
            <div className="relative text-center">
              <p className="text-muted-foreground text-sm mb-2">This isn't a delivery problem.</p>
              <p className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                It's a <span className="text-gradient">reporting gap</span> — the work happens in GitHub, but stakeholders need it in plain English.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default PainSection;
