import { motion } from "framer-motion";
import { RefreshCw, Clock, HelpCircle, EyeOff } from "lucide-react";

const problems = [
  { icon: RefreshCw, text: "The same topics reappear" },
  { icon: Clock, text: "Blockers roll week after week" },
  { icon: HelpCircle, text: "Decisions stay open" },
  { icon: EyeOff, text: "No one clearly sees what didn't move" },
];

const ProblemSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* The Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              The Problem
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              You discuss the same things week after week. Decisions stay open. Blockers keep coming back.
            </p>
            <p className="text-xl text-foreground font-semibold">
              Humans forget. <span className="text-gradient">AI doesn't.</span>
            </p>
          </motion.div>

          {/* Problem cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5"
              >
                <problem.icon className="w-5 h-5 text-destructive/70 flex-shrink-0" />
                <span className="text-foreground/80">{problem.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default ProblemSection;
