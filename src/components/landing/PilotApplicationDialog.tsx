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
  meeting_types: z.string().max(200, "Please keep meeting types brief.").optional().or(z.literal("")),
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
      meeting_types: "",
      message: "",
    },
  });

  const onSubmit = async (data: PilotValues) => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("pilot_applications")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      form.reset();
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
            <Label htmlFor="pilot-meeting-types">What recurring meetings do you run?</Label>
            <Input
              id="pilot-meeting-types"
              placeholder="e.g., Daily standups, Sprint planning, Leadership syncs"
              {...form.register("meeting_types")}
            />
            {form.formState.errors.meeting_types && (
              <p className="text-sm text-destructive">{form.formState.errors.meeting_types.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pilot-message">Anything else you'd like us to know?</Label>
            <Textarea
              id="pilot-message"
              placeholder="Tell us about your team's biggest meeting challenges..."
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
              "Submit Application"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PilotApplicationDialog;
