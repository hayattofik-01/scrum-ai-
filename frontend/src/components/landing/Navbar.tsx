import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import WaitlistDialog from "./WaitlistDialog";
import ContactDialog from "./ContactDialog";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between p-3 rounded-2xl glass">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ScrumAI Logo" className="h-24 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <ContactDialog>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Learn More
              </Button>
            </ContactDialog>
            <WaitlistDialog>
              <Button variant="default" size="sm">
                Join Waitlist
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
