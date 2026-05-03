import { motion } from "framer-motion";
import { FileText, Zap, Target, Mail, Search, Pencil } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Reads the real code",
    description: "Not ticket titles. Not PR names. ScrumAI analyses what was genuinely built — so you know exactly what your developers delivered.",
  },
  {
    icon: Zap,
    title: "Translates code into decisions",
    description: "You don't need to understand code. ScrumAI turns technical work into the insights you need to manage, prioritize, and plan.",
  },
  {
    icon: Target,
    title: "Plain English, always",
    description: "No story points. No GitHub links. No jargon. A report you can read in two minutes and act on immediately.",
  },
  {
    icon: Mail,
    title: "Delivered to you automatically",
    description: "Reports arrive by email and live on your dashboard. You never have to chase developers for updates again.",
  },
  {
    icon: Search,
    title: "See if you're on track",
    description: "A clear verdict on whether your project will hit its deadline — based on what's actually been built, not what's been promised.",
  },
  {
    icon: Pencil,
    title: "Ask questions, get answers",
    description: "Ask ScrumAI anything about your project — what to prioritize, where the risks are, what your team should focus on next.",
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
              Built for managers who need to{" "}
              <span className="text-gradient">understand their developers.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              You don't need to learn to read code. You need a tool that reads it for you and gives you what matters.
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
