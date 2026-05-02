import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, Mail, CheckCircle, Clock, ArrowUpRight, AlertTriangle, TrendingUp, Calendar, Shield, Zap } from "lucide-react";
import PilotApplicationDialog from "./PilotApplicationDialog";
import ContactDialog from "./ContactDialog";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden bg-gradient-hero noise pt-16">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh" />

      {/* Radial glow behind hero content */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-glow opacity-60" />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <GitBranch className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                Now in pilot · 7 spots remaining
              </span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              An insight for your team{" "}
              <span className="text-gradient">where you stand.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              ScrumAI reads your codebase and sends your clients and board a plain-English delivery report — automatically, every sprint.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <PilotApplicationDialog>
                <Button variant="hero" size="lg">
                  Start free pilot
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </PilotApplicationDialog>
              <ContactDialog>
                <Button variant="hero-outline" size="lg">
                  Book a demo
                </Button>
              </ContactDialog>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-xs text-muted-foreground mt-4"
            >
              No credit card · First report in 20 minutes
            </motion.p>
          </motion.div>

          {/* Right — Dashboard + Email Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* ── Dashboard Card — Non-technical Report Demo ── */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-glow opacity-30 blur-2xl" />
              <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-elevated overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-2 font-mono">ScrumAI — RetailCorp / Sprint Report</span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Date range selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/40 cursor-pointer">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-medium text-foreground">Apr 14 – Apr 28, 2026</span>
                      <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-[9px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">Sprint 8</span>
                  </div>

                  {/* ① Highlights */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Highlights</span>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/[0.03] border border-primary/10 space-y-1.5">
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        <span className="font-semibold text-foreground">82 commits</span> from 2 contributors across <span className="font-semibold text-foreground">21 merged PRs</span>. Major features delivered: team leader job flow, subscription handling, market selection, and reporting screens.
                      </p>
                      <p className="text-[10px] text-muted-foreground italic">Development activity increased steadily, peaking in week 4.</p>
                    </div>
                  </div>

                  <div className="h-px bg-border/30" />

                  {/* ② Business Impact */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Business Impact</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { text: "Improved onboarding flow → expected increase in user activation", icon: "↗" },
                        { text: "Subscription handling → enables monetization", icon: "↗" },
                        { text: "Password reset → reduces support friction", icon: "↗" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 py-1.5 px-2.5 rounded-lg bg-primary/[0.04] border border-primary/10">
                          <span className="text-primary font-bold text-[11px] mt-0.5">{item.icon}</span>
                          <span className="text-[11px] text-foreground/80">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border/30" />

                  {/* ③ Work Completed */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Work Completed</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "Team leader job flow",
                        "Market selection module",
                        "Co-host management",
                        "Password reset",
                        "Subscription handling",
                        "Reporting screens",
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-1.5 py-1 px-2 rounded-md bg-secondary/30 border border-border/20">
                          <CheckCircle className="w-2.5 h-2.5 text-primary flex-shrink-0" />
                          <span className="text-[10px] text-foreground/75">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border/30" />

                  {/* ④ Delivery Health */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Delivery Health</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 rounded-lg bg-secondary/40 border border-border/30 text-center">
                        <p className="text-sm font-bold font-mono text-primary">2.3d</p>
                        <p className="text-[8px] text-muted-foreground uppercase tracking-wider">Avg merge time</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/40 border border-border/30 text-center">
                        <p className="text-sm font-bold font-mono text-primary">Healthy</p>
                        <p className="text-[8px] text-muted-foreground uppercase tracking-wider">Review activity</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/40 border border-border/30 text-center">
                        <p className="text-sm font-bold font-mono text-primary">None</p>
                        <p className="text-[8px] text-muted-foreground uppercase tracking-wider">Bottlenecks</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border/30" />

                  {/* ⑤ Risks / Observations */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Risks &amp; Observations</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 py-1.5 px-2.5 rounded-lg bg-yellow-500/[0.05] border border-yellow-500/15">
                        <span className="text-yellow-500 text-[10px] mt-0.5">⚠</span>
                        <span className="text-[11px] text-foreground/80">High activity in auth module — potential instability</span>
                      </div>
                      <div className="flex items-start gap-2 py-1.5 px-2.5 rounded-lg bg-yellow-500/[0.05] border border-yellow-500/15">
                        <span className="text-yellow-500 text-[10px] mt-0.5">⚠</span>
                        <span className="text-[11px] text-foreground/80">Large PR sizes — risk of hidden bugs in merged changes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Stakeholder Email Preview ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-card overflow-hidden">
                {/* Email header bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground font-mono">Auto-generated</span>
                </div>

                <div className="p-5 space-y-3">
                  {/* Email meta */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground">From:</span>
                      <span className="text-foreground/70">reports@scrumai.tech</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground">To:</span>
                      <span className="text-foreground/70">board@company.com, client@agency.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="text-foreground font-medium">RetailCorp platform — Apr 1 – Apr 30 feature report</span>
                    </div>
                  </div>

                  <div className="h-px bg-border/30" />

                  {/* Email body — feature report */}
                  <div className="space-y-2.5 text-[11px] text-foreground/75 leading-relaxed">
                    <p className="font-medium text-foreground">Here's your feature report for Apr 1 – Apr 30, generated from your codebase.</p>

                    <p><span className="font-semibold text-foreground">82 commits</span> from 2 contributors · <span className="font-semibold text-foreground">21 merged PRs</span> · 17,740 lines added</p>

                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Features delivered</p>
                      {[
                        "Team leader job flow",
                        "Co-host management",
                        "Password reset",
                        "Subscription handling",
                        "Market selection",
                        "Reporting screens",
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 py-1 px-2.5 rounded-md bg-primary/[0.04] border border-primary/10">
                          <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="text-[11px] text-foreground/80 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-muted-foreground italic">Activity ramped up throughout the month, peaking at 29 commits in week 4.</p>
                    <p className="text-muted-foreground italic text-[10px]">Next report arrives automatically. No action required.</p>
                  </div>

                  {/* Email footer */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                    <ArrowUpRight className="w-3 h-3 text-primary" />
                    <span className="text-[9px] text-muted-foreground">Generated from GitHub · no manual input · <span className="text-primary cursor-pointer">scrumai.tech</span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default HeroSection;
