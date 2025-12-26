import { motion } from "framer-motion";
import { Eye, Ban, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: Eye,
    text: "See what's still open",
  },
  {
    icon: Ban,
    text: "Catch recurring blockers",
  },
  {
    icon: TrendingUp,
    text: "Know what actually moved",
  },
  {
    icon: Users,
    text: "Hold context between meetings",
  },
];

const ValuePitchSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex items-start gap-4 p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground/90 font-medium leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-muted-foreground mt-12 text-lg italic"
          >
            Like a chief of staff that never forgets.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePitchSection;
