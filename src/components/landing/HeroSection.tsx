import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, Mail, CheckCircle, Clock, ArrowUpRight, AlertTriangle, TrendingUp, Calendar, Shield, Zap, MessageCircle, Send } from "lucide-react";
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
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Top Left — Copy */}
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
              Finally understand{" "}
              <span className="text-gradient">what your developers are building.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              ScrumAI reads your codebase and gives you a report that actually matters — plain English, no jargon, so you can manage your team with clarity instead of guesswork.
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
              No credit card required
            </motion.p>
          </motion.div>

          {/* Top Right — Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block"
          >
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
                        <span className="font-semibold text-foreground">Your team shipped 29 items this week.</span> Here's what that means for your project.
                      </p>
                      <p className="text-[10px] text-muted-foreground">ScrumAI read your codebase and translated it into the report below — no jargon, just the answers you need to manage your team.</p>
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
          </motion.div>

          {/* Bottom Left — Ask ScrumAI Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] text-muted-foreground font-mono">Ask ScrumAI</span>
              </div>

              <div className="p-5 space-y-2.5">
                {/* Chat messages */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 justify-end">
                    <div className="py-1.5 px-2.5 rounded-lg bg-secondary/50 border border-border/30 max-w-[85%]">
                      <p className="text-[11px] text-foreground/80">What should we prioritize next sprint?</p>
                      <span className="text-[8px] text-muted-foreground">You · 10:32 AM</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <div className="py-1.5 px-2.5 rounded-lg bg-primary/[0.06] border border-primary/15 max-w-[85%]">
                      <p className="text-[11px] text-foreground/80">Based on the codebase, I'd recommend: <span className="font-semibold">1)</span> Resolve the co-host API backend dependency — it's blocking frontend work. <span className="font-semibold">2)</span> Complete the reports dashboard. <span className="font-semibold">3)</span> Stabilize the auth module — high churn there raises regression risk.</p>
                      <span className="text-[8px] text-muted-foreground">ScrumAI · 10:32 AM</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                    <div className="py-1.5 px-2.5 rounded-lg bg-secondary/50 border border-border/30 max-w-[85%]">
                      <p className="text-[11px] text-foreground/80">Are we on track for the next release?</p>
                      <span className="text-[8px] text-muted-foreground">You · 10:34 AM</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <div className="py-1.5 px-2.5 rounded-lg bg-primary/[0.06] border border-primary/15 max-w-[85%]">
                      <p className="text-[11px] text-foreground/80">Velocity is trending up — 29 items last week vs. 10 in week one. Core features are near completion. The only risk is the co-host backend dependency. If resolved by Wednesday, you're on track.</p>
                      <span className="text-[8px] text-muted-foreground">ScrumAI · 10:34 AM</span>
                    </div>
                  </div>
                </div>

                {/* Chat input */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/40">
                    <span className="text-[10px] text-muted-foreground">Ask ScrumAI about your project...</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                    <Send className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right — Stakeholder Email Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block"
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
                      <span className="text-foreground font-medium">ScrumAI — Weekly Progress Report · Apr 25 – May 1, 2026</span>
                    </div>
                  </div>

                  <div className="h-px bg-border/30" />

                  {/* Email body — weekly report */}
                  <div className="space-y-3 text-[11px] text-foreground/75 leading-relaxed max-h-[480px] overflow-y-auto pr-1">
                    <p className="font-medium text-foreground">Here's your weekly status report:</p>

                    {/* Report title */}
                    <div className="text-center py-2">
                      <p className="font-bold text-foreground text-xs">ScrumAI — Weekly Progress Report</p>
                      <p className="text-[10px] text-muted-foreground">Week of April 25 – May 1, 2026</p>
                    </div>

                    <div className="h-px bg-border/30" />

                    {/* What We Delivered */}
                    <div className="space-y-2">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">What We Delivered This Week</p>

                      {[
                        { title: "Team Leader Onboarding — Market Selection", desc: "Team leaders can now select their service market during onboarding." },
                        { title: "Cleaner Profile Tab", desc: "Cleaners now have a dedicated profile tab in the app." },
                        { title: "Reports Dashboard (Started)", desc: "Added the first piece of the reporting interface — a reports card." },
                        { title: "Push Notification Registration After Signup", desc: "New users are now automatically enrolled in push notifications right after they register." },
                        { title: "Signup & Onboarding Quality Improvements", desc: "Added input validation across signup and team leader signup forms." },
                        { title: "Co-Host & Team Leader Invitation Fixes", desc: "Fixed several issues in invitation flows — invitations now process reliably." },
                      ].map((item, i) => (
                        <div key={i} className="py-1.5 px-2.5 rounded-md bg-primary/[0.04] border border-primary/10">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[11px] text-foreground font-semibold">{item.title}</span>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-border/30" />

                    {/* Bugs & Stability Fixes */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Bugs & Stability Fixes</p>
                      {[
                        { issue: "Images not reloading properly", impact: "Users can now see updated photos without force-closing" },
                        { issue: "Broken links on signup page", impact: "New users no longer hit dead ends during registration" },
                        { issue: "Deep link / Branch.io fix", impact: "Marketing links now open the correct screen" },
                        { issue: "Scrolling issues", impact: "Improved usability on screens cutting off content" },
                        { issue: "Subscription data handling", impact: "Subscription status now displays correctly" },
                        { issue: "Cleaner navigation bar", impact: "Navigation works consistently" },
                        { issue: "Logout reliability", impact: "Logout is now faster and more reliable" },
                      ].map((bug, i) => (
                        <div key={i} className="flex items-start gap-2 py-1 px-2.5 rounded-md bg-yellow-500/[0.04] border border-yellow-500/10">
                          <span className="text-yellow-500 text-[10px] mt-0.5">✓</span>
                          <div>
                            <span className="text-[10px] text-foreground/80 font-medium">{bug.issue}</span>
                            <span className="text-[10px] text-muted-foreground"> — {bug.impact}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-border/30" />

                    {/* By the Numbers */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">By the Numbers</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { label: "Work items completed", value: "29" },
                          { label: "PRs merged & reviewed", value: "6" },
                          { label: "Team members active", value: "2" },
                          { label: "New features shipped", value: "5" },
                          { label: "Bugs resolved", value: "7+" },
                        ].map((metric, i) => (
                          <div key={i} className="p-1.5 rounded-md bg-secondary/40 border border-border/30 text-center">
                            <p className="text-xs font-bold font-mono text-primary">{metric.value}</p>
                            <p className="text-[8px] text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-border/30" />

                    {/* Risks & Blockers */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Risks & Blockers</p>
                      <div className="flex items-start gap-2 py-1.5 px-2.5 rounded-lg bg-yellow-500/[0.05] border border-yellow-500/15">
                        <span className="text-yellow-500 text-[10px] mt-0.5">⚠</span>
                        <span className="text-[11px] text-foreground/80"><span className="font-semibold">Co-host API</span> is being prepared on the frontend but is dependent on a backend fix — coordination needed to unblock.</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground px-2.5">No other blockers reported this week.</p>
                    </div>

                    <div className="h-px bg-border/30" />

                    {/* Next Week Outlook */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Next Week Outlook</p>
                      <p className="text-[11px] text-foreground/80 px-2.5">
                        The team closed April at peak velocity (29 commits in the final week vs. 10 in week one). The co-host features, reports, and team leader flows are approaching completion. Key areas to watch: co-host backend dependency resolution and continued stabilization before the next release.
                      </p>
                    </div>

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
          </div>
        </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default HeroSection;
