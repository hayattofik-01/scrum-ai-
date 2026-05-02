import { motion } from "framer-motion";
import { FileText, Zap, Target, Mail, Search, Pencil } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Reads the real code",
    description: "Not ticket titles. Not PR names. ScrumAI analyses what was genuinely implemented — so what gets reported is what is true.",
  },
  {
    icon: Zap,
    title: "Writes itself, sends itself",
    description: "No manual input. The report is generated from your codebase and delivered to your stakeholders — every sprint, without you touching it.",
  },
  {
    icon: Target,
    title: "Plain English, always",
    description: "No story points. No GitHub links. No jargon. A report your client or board can read in two minutes and act on immediately.",
  },
  {
    icon: Mail,
    title: "Email + dashboard",
    description: "Stakeholders receive it by email automatically. Your team sees the live dashboard. Everyone always knows where things stand.",
  },
  {
    icon: Search,
    title: "Deadline visibility",
    description: "A factual verdict on whether your project will hit the date — based on actual delivery pace, not gut feel or burndown charts.",
  },
  {
    icon: Pencil,
    title: "Custom for your team",
    description: "Your clients ask specific questions every sprint. We configure ScrumAI to answer those questions — automatically, in your language.",
  },
];

const DifferentiationSection = () => {
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
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Why ScrumAI</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Built for the gap between{" "}
              <span className="text-gradient">engineering and everyone else.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              The people who fund your work rarely understand what's happening inside it. ScrumAI closes that gap.
            </p>
          </motion.div>

          {/* Feature grid — 3×2 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group relative p-6 rounded-xl border border-border/40 bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default DifferentiationSection;
