import { motion } from "framer-motion";
import { TrendingUp, Clock, CheckCircle, DollarSign, ArrowRight } from "lucide-react";

const benefits = [
  { icon: TrendingUp, text: "Fewer recurring blockers" },
  { icon: Clock, text: "Faster decision closure" },
  { icon: CheckCircle, text: "Predictable delivery" },
  { icon: DollarSign, text: "Less wasted time and budget" },
  { icon: ArrowRight, text: "Recurring meetings that actually move work forward" },
];

const BenefitsSection = () => {
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
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Real outcomes teams care about
            </h2>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
              >
                <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground">
              This isn't about pressure.
            </p>
            <p className="text-xl font-display font-semibold text-foreground">
              It's about <span className="text-gradient">clarity, discipline, and momentum.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default BenefitsSection;
