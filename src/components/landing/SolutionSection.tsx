import { motion } from "framer-motion";
import { Video, Bot, Columns3, Mail, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Video,
    title: "Connect your calendar",
    description: "Link Google Meet, Zoom, or Teams. ScrumAI's agent automatically joins your standups, planning, and review meetings.",
  },
  {
    number: "02",
    icon: Bot,
    title: "AI listens and understands",
    description: "Real-time transcription with AI analysis. It detects ticket updates, new commitments, assignments, and deadlines from what's said.",
  },
  {
    number: "03",
    icon: Columns3,
    title: "Board updates itself",
    description: "Tickets move automatically. 'The API is done' \u2192 ticket moves to Done. 'I'll start payments tomorrow' \u2192 ticket assigned and scheduled.",
  },
  {
    number: "04",
    icon: Mail,
    title: "Follow-ups and alerts",
    description: "Missed a deadline? Forgot a commitment from last meeting? The agent emails the right people and brings it up in the next meeting.",
  },
];

const outcomes = [
  "Tickets move without manual updates",
  "Commitments are tracked across meetings",
  "Stakeholders get emailed when things need attention",
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
              From meeting to{" "}<span className="text-gradient">board update.</span> Automatically.
            </h2>
            <p className="text-lg text-muted-foreground">
              Four steps. No manual ticket management. Your board stays in sync with every conversation.
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
              Every meeting produces real results:
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
              Meetings drive the board. <span className="text-gradient">Automatically.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default SolutionSection;
