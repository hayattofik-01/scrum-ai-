import { useBoardStore } from "@/store/board-store";
import {
  Bot,
  Zap,
  ArrowRight,
  CheckCircle2,
  Video,
  Clock,
  Activity,
  Mail,
  AlertTriangle,
  History,
  Settings,
  XCircle,
  CircleDot,
  Circle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categoryIcons: Record<string, typeof CheckCircle2> = {
  ticket_move: ArrowRight,
  follow_up: CircleDot,
  email_alert: Mail,
  context_carry: History,
};

const categoryColors: Record<string, string> = {
  ticket_move: "text-green-500 bg-green-500/10",
  follow_up: "text-blue-500 bg-blue-500/10",
  email_alert: "text-orange-500 bg-orange-500/10",
  context_carry: "text-purple-500 bg-purple-500/10",
};

const Agent = () => {
  const { logs, meetings, alerts, alertConfig, updateAlertConfig } = useBoardStore();
  const [showSettings, setShowSettings] = useState(false);
  const [newCcEmail, setNewCcEmail] = useState("");

  const totalActions = meetings.reduce((sum, m) => sum + m.aiActions.length, 0);
  const appliedActions = meetings.reduce(
    (sum, m) => sum + m.aiActions.filter((a) => a.applied).length,
    0
  );
  const meetingsProcessed = meetings.filter((m) => m.status === "completed").length;
  const totalFollowUps = meetings.reduce((sum, m) => sum + m.followUps.length, 0);
  const missedFollowUps = meetings.reduce(
    (sum, m) => sum + m.followUps.filter((f) => f.status === "missed").length,
    0
  );

  const handleAddCcEmail = () => {
    if (newCcEmail && newCcEmail.includes("@")) {
      updateAlertConfig({
        ccEmails: [...alertConfig.ccEmails, newCcEmail],
      });
      setNewCcEmail("");
    }
  };

  const handleRemoveCcEmail = (email: string) => {
    updateAlertConfig({
      ccEmails: alertConfig.ccEmails.filter((e) => e !== email),
    });
  };

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">AI Agent</h1>
              <p className="text-sm text-muted-foreground">
                Autonomous meeting agent with cross-meeting memory and email alerts.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-3.5 h-3.5" />
            {showSettings ? "Hide Settings" : "Alert Settings"}
          </Button>
        </div>
      </div>

      {/* Alert Settings Panel */}
      {showSettings && (
        <div className="mb-6 p-5 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email Alert Configuration
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="alerts-enabled" className="text-sm">
                Enable email alerts
              </Label>
              <Switch
                id="alerts-enabled"
                checked={alertConfig.enabled}
                onCheckedChange={(checked) => updateAlertConfig({ enabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="missed-followups" className="text-sm">
                Alert on missed follow-ups
              </Label>
              <Switch
                id="missed-followups"
                checked={alertConfig.alertOnMissedFollowUps}
                onCheckedChange={(checked) => updateAlertConfig({ alertOnMissedFollowUps: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="blockers" className="text-sm">
                Alert on blockers
              </Label>
              <Switch
                id="blockers"
                checked={alertConfig.alertOnBlockers}
                onCheckedChange={(checked) => updateAlertConfig({ alertOnBlockers: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="deadlines" className="text-sm">
                Alert on missed deadlines
              </Label>
              <Switch
                id="deadlines"
                checked={alertConfig.alertOnMissedDeadlines}
                onCheckedChange={(checked) => updateAlertConfig({ alertOnMissedDeadlines: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-priority" className="text-sm">
                Alert on high-priority changes
              </Label>
              <Switch
                id="high-priority"
                checked={alertConfig.alertOnHighPriorityChanges}
                onCheckedChange={(checked) => updateAlertConfig({ alertOnHighPriorityChanges: checked })}
              />
            </div>

            <div>
              <Label className="text-sm mb-2 block">CC Recipients</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {alertConfig.ccEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary border border-border text-xs"
                  >
                    <span>{email}</span>
                    <button
                      onClick={() => handleRemoveCcEmail(email)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <XCircle className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add CC email..."
                  value={newCcEmail}
                  onChange={(e) => setNewCcEmail(e.target.value)}
                  className="h-8 text-xs"
                  onKeyDown={(e) => e.key === "Enter" && handleAddCcEmail()}
                />
                <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleAddCcEmail}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Status
            </span>
          </div>
          <p className="text-lg font-bold text-green-500">Active</p>
          <p className="text-xs text-muted-foreground">Listening for meetings</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Meetings
            </span>
          </div>
          <p className="text-lg font-bold">{meetingsProcessed}</p>
          <p className="text-xs text-muted-foreground">{meetings.length} total</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <CircleDot className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Follow-ups
            </span>
          </div>
          <p className="text-lg font-bold">
            {totalFollowUps}
            {missedFollowUps > 0 && (
              <span className="text-sm font-normal text-red-500 ml-1">({missedFollowUps} missed)</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">tracked across meetings</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Alerts Sent
            </span>
          </div>
          <p className="text-lg font-bold">{alerts.filter((a) => a.sent).length}</p>
          <p className="text-xs text-muted-foreground">email notifications</p>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8 p-5 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4">How the AI Agent Works</h3>
        <div className="grid sm:grid-cols-5 gap-3">
          {[
            {
              step: "1",
              title: "Joins Meeting",
              desc: "Automatically joins your scheduled meetings via Google Meet, Zoom, or Teams.",
            },
            {
              step: "2",
              title: "Loads Context",
              desc: "Pulls in follow-ups, commitments, and decisions from previous meetings.",
            },
            {
              step: "3",
              title: "Transcribes & Analyzes",
              desc: "Real-time transcription with AI detection of ticket updates and new commitments.",
            },
            {
              step: "4",
              title: "Updates Board",
              desc: "Tickets are created, moved, or updated automatically based on what's discussed.",
            },
            {
              step: "5",
              title: "Alerts & Follow-up",
              desc: "Emails CC'd stakeholders about missed deadlines, blockers, or forgotten items.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-2">
                {item.step}
              </div>
              <p className="text-xs font-medium mb-1">{item.title}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email Alerts
          </h3>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-xl border",
                  alert.severity === "critical"
                    ? "bg-red-500/[0.03] border-red-500/15"
                    : alert.severity === "warning"
                    ? "bg-orange-500/[0.03] border-orange-500/15"
                    : "bg-blue-500/[0.03] border-blue-500/15"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {alert.severity === "critical" ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : alert.severity === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Mail className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="text-sm font-medium">{alert.subject}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      alert.severity === "critical"
                        ? "text-red-500 bg-red-500/10 border-red-500/20"
                        : alert.severity === "warning"
                        ? "text-orange-500 bg-orange-500/10 border-orange-500/20"
                        : "text-blue-500 bg-blue-500/10 border-blue-500/20"
                    )}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-foreground/70 mb-2 whitespace-pre-line leading-relaxed">
                  {alert.body}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>To: {alert.recipients.join(", ")}</span>
                  {alert.ccList.length > 0 && <span>CC: {alert.ccList.join(", ")}</span>}
                  <span className="ml-auto">
                    {new Date(alert.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {alert.sent && (
                    <Badge variant="outline" className="text-[9px] text-green-500 bg-green-500/10 border-green-500/20">
                      Sent
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity log */}
      <div>
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Activity Log
        </h3>

        <div className="space-y-2">
          {logs.map((log) => {
            const meeting = meetings.find((m) => m.id === log.meetingId);
            const category = log.category || "ticket_move";
            const IconComponent = categoryIcons[category] || CheckCircle2;
            const colorClass = categoryColors[category] || "text-green-500 bg-green-500/10";
            return (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50"
              >
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", colorClass)}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{log.action}</span>
                    {log.ticketKey && (
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {log.ticketKey}
                      </Badge>
                    )}
                    {log.category && (
                      <Badge variant="outline" className={cn("text-[9px]", colorClass)}>
                        {log.category.replace("_", " ")}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(log.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {meeting && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <ArrowRight className="w-2.5 h-2.5" />
                        {meeting.title}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Agent;
