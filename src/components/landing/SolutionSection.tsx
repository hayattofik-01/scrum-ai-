import { motion } from "framer-motion";
import { MessageSquare, RotateCcw, Target, FileText, CheckCircle } from "lucide-react";

const features = [
  { icon: MessageSquare, text: "Tracks what was discussed vs what actually moved" },
  { icon: RotateCcw, text: "Detects blockers that keep returning" },
  { icon: Target, text: "Highlights decisions that never closed" },
  { icon: FileText, text: "Generates focused \"closure agendas\" for the next meeting" },
];

const outcomes = [
  "What didn't close",
  "What must move",
  "What actually matters now",
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
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              ScrumAI keeps execution on track — <span className="text-gradient">between meetings</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ScrumAI isn't a meeting recorder or another dashboard. It acts as your execution companion:
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50"
              >
                <feature.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Outcome statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl glass text-center"
          >
            <p className="text-lg text-muted-foreground mb-4">
              So your next standup or sync begins with:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{outcome}</span>
                </div>
              ))}
            </div>
            <p className="text-xl font-display font-semibold text-foreground">
              No noise. Just <span className="text-gradient">forward motion.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
