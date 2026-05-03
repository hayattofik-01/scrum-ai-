import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Loader2, Zap } from "lucide-react";

const pilotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  company: z.string().min(2, "Company name must be at least 2 characters.").max(100, "Company name is too long."),
  team_size: z.string().optional(),
  github_repo: z.string().max(200, "Please keep the repo URL brief.").optional().or(z.literal("")),
  stakeholder_emails: z.string().max(500, "Please keep stakeholder emails brief.").optional().or(z.literal("")),
  message: z.string().max(1000, "Message is too long.").optional().or(z.literal("")),
});

type PilotValues = z.infer<typeof pilotSchema>;

interface PilotApplicationDialogProps {
  children: React.ReactNode;
}

const PilotApplicationDialog = ({ children }: PilotApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PilotValues>({
    resolver: zodResolver(pilotSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      team_size: "",
      github_repo: "",
      stakeholder_emails: "",
      message: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: PilotValues) => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("pilot_applications")
        .insert([{
          email: data.email,
          name: data.name,
          company: data.company,
          team_size: data.team_size || null,
          github_repo: data.github_repo || null,
          stakeholder_emails: data.stakeholder_emails || null,
          message: data.message || null,
        }]);

      if (error) throw error;

      setSubmitted(true);
      form.reset();
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
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSubmitted(false); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">You're in!</h3>
            <p className="text-muted-foreground max-w-sm">
              We'll be in touch within 24 hours to get your pilot set up. Keep an eye on your inbox.
            </p>
            <Button variant="hero-outline" onClick={() => { setOpen(false); setSubmitted(false); }}>
              Close
            </Button>
          </div>
        ) : (
        <>
        <DialogHeader>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-display text-2xl">Start your free pilot</DialogTitle>
          <DialogDescription>
            Connect one GitHub repo and get your first plain-English delivery report. No credit card required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="pilot-email">Email *</Label>
            <Input
              id="pilot-email"
              type="email"
              placeholder="you@company.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-name">Name *</Label>
            <Input
              id="pilot-name"
              placeholder="Your name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-company">Company *</Label>
            <Input
              id="pilot-company"
              placeholder="Your company"
              {...form.register("company")}
            />
            {form.formState.errors.company && (
              <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-team-size">Team Size</Label>
            <Select
              onValueChange={(value) => form.setValue("team_size", value)}
              defaultValue={form.getValues("team_size")}
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
            <Label htmlFor="pilot-github-repo">GitHub repository URL</Label>
            <Input
              id="pilot-github-repo"
              placeholder="https://github.com/your-org/your-repo"
              {...form.register("github_repo")}
            />
            {form.formState.errors.github_repo && (
              <p className="text-sm text-destructive">{form.formState.errors.github_repo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-stakeholder-emails">Stakeholder emails (who should receive reports?)</Label>
            <Input
              id="pilot-stakeholder-emails"
              placeholder="e.g., client@agency.com, cto@company.com"
              {...form.register("stakeholder_emails")}
            />
            {form.formState.errors.stakeholder_emails && (
              <p className="text-sm text-destructive">{form.formState.errors.stakeholder_emails.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-message">Anything else? (e.g., what questions do your stakeholders always ask?)</Label>
            <Textarea
              id="pilot-message"
              placeholder="Tell us about your project and what your clients or board need to know..."
              {...form.register("message")}
              rows={3}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Start free pilot"
            )}
          </Button>
        </form>
        </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PilotApplicationDialog;
