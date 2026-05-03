import { motion } from "framer-motion";
import { FileText, GitBranch, Users, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Connect your GitHub repo",
    description: "Read-only access. Takes 60 seconds. ScrumAI starts reading what your developers actually built — not ticket titles, the real work.",
  },
  {
    number: "02",
    icon: GitBranch,
    title: "ScrumAI reads the code for you",
    description: "It analyses commits, pull requests, and code changes — and translates everything into plain English you can actually understand.",
  },
  {
    number: "03",
    icon: Users,
    title: "You get a report that matters",
    description: "What got done. What's at risk. Whether you're on track. No jargon, no guesswork — just the answers you need to manage your team.",
  },
  {
    number: "04",
    icon: Send,
    title: "Every sprint, automatically",
    description: "Reports are delivered by email and live on your dashboard. You never have to ask your developers for an update again.",
  },
];

const outcomes = [
  "What did the team actually build?",
  "Are we on track?",
  "What should I be worried about?",
];

const SolutionSection = () => {
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
            className="max-w-2xl mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">How It Works</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              Understand your team{" "}<span className="text-gradient">clearly.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Four steps. No technical knowledge needed. Your first real report delivered the same day.
            </p>
          </motion.div>

          {/* Steps — vertical timeline */}
          <div className="grid gap-6 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative grid md:grid-cols-[80px_1fr] gap-6 p-6 rounded-xl border border-border/40 bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300"
              >
                {/* Step number */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                  <span className="text-3xl font-display font-bold text-gradient">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Outcome badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="p-8 rounded-2xl border border-primary/20 bg-primary/[0.03] text-center"
          >
            <p className="text-sm text-muted-foreground mb-5">
              Every report answers three questions managers actually care about:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm text-foreground font-medium">{outcome}</span>
                </div>
              ))}
            </div>
            <p className="text-lg font-display font-semibold text-foreground">
              Clear. Actionable. <span className="text-gradient">Every sprint.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default SolutionSection;
