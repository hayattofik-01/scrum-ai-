import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";

interface WaitlistDialogProps {
  children: React.ReactNode;
}

const WaitlistDialog = ({ children }: WaitlistDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist_submissions")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "You're on the list!",
        description: "We'll notify you when ScrumAI launches.",
      });

      setFormData({ email: "", name: "", company: "" });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-display text-2xl">Join the Waitlist</DialogTitle>
          <DialogDescription>
            Get notified when ScrumAI launches and receive early access.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="waitlist-email">Email *</Label>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-name">Name</Label>
            <Input
              id="waitlist-name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-company">Company</Label>
            <Input
              id="waitlist-company"
              placeholder="Your company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
