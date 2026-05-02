import { motion } from "framer-motion";
import { FileText, GitBranch, Users, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Upload your project spec",
    description: "PRD, Notion doc, Jira export — any format. ScrumAI extracts your features and delivery commitments into a structured map.",
  },
  {
    number: "02",
    icon: GitBranch,
    title: "Connect your GitHub repo",
    description: "Read-only access. Takes 60 seconds. ScrumAI starts reading what was genuinely built — not PR titles, the actual implementation.",
  },
  {
    number: "03",
    icon: Users,
    title: "Add your stakeholders",
    description: "Client emails. Board emails. Anyone who needs to stay informed. They get added once — then ScrumAI handles every update from here.",
  },
  {
    number: "04",
    icon: Send,
    title: "Reports go out automatically",
    description: "Every sprint. Plain English. Delivered by email, visible on the dashboard. Your stakeholders are always informed. You do nothing.",
  },
];

const outcomes = [
  "What got done this week?",
  "Are we on track?",
  "What needs attention?",
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
              Up and running in{" "}<span className="text-gradient">20 minutes.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Four steps. Zero manual work. Your first report delivered the same day.
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
              Every report answers three questions your stakeholders care about:
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
              Automatic. Non-technical. <span className="text-gradient">Every week.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default SolutionSection;
