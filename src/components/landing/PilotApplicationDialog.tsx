import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Loader2, Zap } from "lucide-react";

interface PilotApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PilotApplicationDialog = ({ open, onOpenChange }: PilotApplicationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    team_size: "",
    meeting_types: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name || !formData.company) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("pilot_applications")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      setFormData({ email: "", name: "", company: "", team_size: "", meeting_types: "", message: "" });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-display text-2xl">Apply for Early Pilot</DialogTitle>
          <DialogDescription>
            Join our early pilot program and use ScrumAI with your real recurring meetings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="pilot-email">Email *</Label>
            <Input
              id="pilot-email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-name">Name *</Label>
            <Input
              id="pilot-name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-company">Company *</Label>
            <Input
              id="pilot-company"
              placeholder="Your company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-team-size">Team Size</Label>
            <Select
              value={formData.team_size}
              onValueChange={(value) => setFormData({ ...formData, team_size: value })}
            >
              <SelectTrigger id="pilot-team-size">
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 people</SelectItem>
                <SelectItem value="6-15">6-15 people</SelectItem>
                <SelectItem value="16-50">16-50 people</SelectItem>
                <SelectItem value="50+">50+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-meeting-types">What recurring meetings do you run?</Label>
            <Input
              id="pilot-meeting-types"
              placeholder="e.g., Daily standups, Sprint planning, Leadership syncs"
              value={formData.meeting_types}
              onChange={(e) => setFormData({ ...formData, meeting_types: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-message">Anything else you'd like us to know?</Label>
            <Textarea
              id="pilot-message"
              placeholder="Tell us about your team's biggest meeting challenges..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PilotApplicationDialog;
