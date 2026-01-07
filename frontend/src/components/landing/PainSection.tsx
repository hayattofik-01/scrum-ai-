import { motion } from "framer-motion";
import { RotateCcw, Clock, HelpCircle, Activity } from "lucide-react";

const painPoints = [
  { icon: RotateCcw, text: "The same blockers return week after week" },
  { icon: HelpCircle, text: "Decisions remain open" },
  { icon: Clock, text: "Timelines stretch quietly" },
  { icon: Activity, text: "Work sounds productive, but doesn't truly move" },
];

const PainSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why projects slip — even in capable teams
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Meetings happen. Updates sound convincing. Everyone feels busy.
              <br />Yet somehow:
            </p>
          </motion.div>

          {/* Pain points */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5"
              >
                <point.icon className="w-5 h-5 text-destructive/70 flex-shrink-0" />
                <span className="text-foreground/80">{point.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Execution drift callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center p-8 rounded-2xl glass"
          >
            <p className="text-muted-foreground mb-2">This isn't a productivity problem.</p>
            <p className="text-xl sm:text-2xl font-display font-semibold text-foreground">
              This is <span className="text-gradient">execution drift</span> — and it's one of the biggest reasons projects overrun time, budget, and trust.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default PainSection;
