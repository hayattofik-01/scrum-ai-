import { motion } from "framer-motion";
import { X, Shield } from "lucide-react";

const notList = [
  "a transcription tool",
  "a note-taker",
  "another reporting system",
];

const DifferentiationSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30">
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
              What makes ScrumAI different?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* What it's NOT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <p className="text-muted-foreground mb-4">ScrumAI is not:</p>
              {notList.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-5 h-5 text-destructive/70" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* What it IS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-card border border-primary/30"
            >
              <Shield className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-foreground mb-4">
                ScrumAI is the <span className="text-gradient font-semibold">execution enforcement layer</span> your team has been missing.
              </p>
              <p className="text-muted-foreground">
                It doesn't help you talk better.
              </p>
              <p className="text-xl font-display font-semibold text-foreground mt-2">
                It helps you <span className="text-gradient">close better.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
