import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-gradient">
              ScrumAI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScrumAI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
