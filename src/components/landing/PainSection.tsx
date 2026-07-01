import { motion } from "framer-motion";
import { HelpCircle, Clock, FileQuestion, Eye } from "lucide-react";

const painPoints = [
  {
    icon: HelpCircle,
    title: "Meetings end, nothing moves",
    text: "Your team makes decisions in standups and planning meetings. But someone still has to manually update the Jira board afterwards — and half the time, nobody does.",
  },
  {
    icon: Clock,
    title: "Forgotten commitments",
    text: "\"I'll finish this by Thursday.\" But Thursday comes and goes, and nobody follows up. Promises made in meetings disappear into the void.",
  },
  {
    icon: FileQuestion,
    title: "No meeting memory",
    text: "Each meeting starts from scratch. Nobody remembers what was agreed last time. Action items from two standups ago? Lost.",
  },
  {
    icon: Eye,
    title: "Stakeholders are in the dark",
    text: "When something is at risk or a deadline is missed, the people who need to know — PMs, CTOs, clients — find out too late.",
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
              Meetings are where decisions happen. Your board doesn't know that.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your team talks about progress, makes commitments, and shifts priorities in meetings every day. But none of that reaches the board unless someone manually updates it.
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
              <p className="text-muted-foreground text-sm mb-2">This isn't a process problem.</p>
              <p className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                It's an <span className="text-gradient">automation problem</span> — the decisions happen in meetings, but nobody bridges them to the board.
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
