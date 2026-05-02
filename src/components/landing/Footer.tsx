import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ScrumAI Logo" className="h-6 w-auto opacity-70" />
            <span className="text-xs text-muted-foreground/60">·</span>
            <span className="text-xs text-muted-foreground/60">Automated delivery reports from your codebase</span>
          </div>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} ScrumAI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
