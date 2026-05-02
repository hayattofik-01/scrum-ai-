import { motion } from "framer-motion";
import { Building2, Rocket, TrendingUp, Palette, Code } from "lucide-react";

const audiences = [
  { icon: Building2, label: "Agencies" },
  { icon: Rocket, label: "Series A startups" },
  { icon: TrendingUp, label: "Scale-ups" },
  { icon: Palette, label: "Product studios" },
  { icon: Code, label: "Dev consultancies" },
];

const AudienceSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Trusted by engineering teams at</p>
          </motion.div>

          {/* Audience badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-border/40 bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300"
              >
                <audience.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{audience.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="relative p-8 rounded-2xl border border-border/40 bg-gradient-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
              <div className="relative">
                <p className="text-lg sm:text-xl text-foreground leading-relaxed italic mb-6">
                  "My clients used to email me every week asking for updates. Now they get a report before they think to ask. The chasing stopped completely."
                </p>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/80">Engineering Manager</span>
                  <span className="mx-2">·</span>
                  <span>London agency</span>
                  <span className="mx-2">·</span>
                  <span className="text-primary">pilot customer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default AudienceSection;
