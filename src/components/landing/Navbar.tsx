import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PilotApplicationDialog from "./PilotApplicationDialog";
import ContactDialog from "./ContactDialog";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl"
    >
      <div className="section-divider absolute bottom-0 left-0 right-0" />
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ScrumAI Logo" className="h-8 w-auto" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-full border border-border/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Early Access
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ContactDialog>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                Book a Demo
              </Button>
            </ContactDialog>
            <ThemeToggle />
            <PilotApplicationDialog>
              <Button size="sm" className="h-8 px-4 text-xs font-semibold">
                Start Free Pilot
              </Button>
            </PilotApplicationDialog>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
