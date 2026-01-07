import { motion } from "framer-motion";
import { Code2, Package, Users, Target, Rocket } from "lucide-react";

const audiences = [
  { icon: Code2, label: "Engineering Teams" },
  { icon: Package, label: "Product Teams" },
  { icon: Users, label: "Tech Leads" },
  { icon: Target, label: "Scrum Masters" },
  { icon: Rocket, label: "Startups & growing companies" },
];

const AudienceSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for teams where delivery matters
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ScrumAI supports:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-background border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <audience.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{audience.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            If meetings happen often but movement feels slow — <span className="text-foreground font-semibold">ScrumAI is for you.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
