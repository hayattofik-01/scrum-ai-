import { motion } from "framer-motion";
import { Headphones, Brain, ListChecks } from "lucide-react";

const steps = [
  {
    icon: Headphones,
    title: "Listens",
    description: "Joins your recurring meetings",
  },
  {
    icon: Brain,
    title: "Remembers",
    description: "Builds memory across every session",
  },
  {
    icon: ListChecks,
    title: "Surfaces",
    description: "Shows what still needs resolution",
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
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ScrumAI is your AI copilot that never loses context.
            </p>
          </motion.div>

          {/* 3-step process */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
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
            <p className="text-xl sm:text-2xl font-display font-semibold text-foreground">
              Before your next meeting, you'll know exactly what needs to close.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
