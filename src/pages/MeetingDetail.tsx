import { useParams, Link } from "react-router-dom";
import { useBoardStore } from "@/store/board-store";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Circle,
  Clock,
  Users,
  Video,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertTriangle,
  History,
  Mail,
  CircleDot,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MeetingAction, FollowUpStatus } from "@/types";

const actionTypeLabels: Record<MeetingAction["type"], string> = {
  create_ticket: "Create Ticket",
  move_ticket: "Move Ticket",
  update_ticket: "Update Ticket",
  assign_ticket: "Assign Ticket",
};

const followUpStatusConfig: Record<FollowUpStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  completed: { label: "Completed", color: "text-green-500 bg-green-500/10 border-green-500/20", icon: CheckCircle2 },
  in_progress: { label: "In Progress", color: "text-blue-500 bg-blue-500/10 border-blue-500/20", icon: CircleDot },
  pending: { label: "Pending", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20", icon: Circle },
  missed: { label: "Missed", color: "text-red-500 bg-red-500/10 border-red-500/20", icon: XCircle },
};

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { meetings, applyMeetingAction } = useBoardStore();
  const meeting = meetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Meeting not found.</p>
        <Link to="/app/meetings" className="text-primary text-sm mt-2 inline-block">
          Back to meetings
        </Link>
      </div>
    );
  }

  const hasContext = meeting.carryOverContext !== undefined;
  const context = meeting.carryOverContext;

  return (
    <div className="p-6 max-w-5xl">
      {/* Back link */}
      <Link
        to="/app/meetings"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to meetings
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">{meeting.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(meeting.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {meeting.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {meeting.participants.length} participants
            </span>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            meeting.status === "completed"
              ? "bg-green-500/10 text-green-600 border-green-500/20"
              : meeting.status === "in_progress"
              ? "bg-red-500/10 text-red-600 border-red-500/20"
              : "bg-blue-500/10 text-blue-600 border-blue-500/20"
          )}
        >
          {meeting.status === "in_progress" ? "Live" : meeting.status === "completed" ? "Completed" : "Scheduled"}
        </Badge>
      </div>

      {/* Participants */}
      <div className="mb-6">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2">
          Participants
        </h3>
        <div className="flex gap-2 flex-wrap">
          {meeting.participants.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[9px] font-bold text-primary">{p.avatar}</span>
              </div>
              <span className="text-xs font-medium">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-meeting context banner */}
      {hasContext && context && (
        <div className="mb-6 p-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.03]">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Context from Previous Meeting
            </span>
            <Link
              to={`/app/meetings/${context.previousMeetingId}`}
              className="text-[10px] text-blue-500 hover:underline ml-auto"
            >
              {context.previousMeetingTitle} →
            </Link>
          </div>

          {/* Completed since last */}
          {context.completedSinceLast.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-1.5">
                Completed since last meeting
              </p>
              <div className="space-y-1">
                {context.completedSinceLast.map((fu) => (
                  <div key={fu.id} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground/80">{fu.description}</span>
                    <span className="text-muted-foreground">— {fu.assignee.name}</span>
                    {fu.ticketKey && (
                      <span className="font-mono text-[10px] text-primary bg-primary/10 px-1 rounded">
                        {fu.ticketKey}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unresolved follow-ups from previous meeting */}
          {context.unresolvedFollowUps.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-1.5">
                Open follow-ups to check
              </p>
              <div className="space-y-1.5">
                {context.unresolvedFollowUps.map((fu) => {
                  const config = followUpStatusConfig[fu.status];
                  const StatusIcon = config.icon;
                  return (
                    <div
                      key={fu.id}
                      className={cn(
                        "flex items-start gap-2 p-2 rounded-lg border text-xs",
                        fu.status === "missed" ? "bg-red-500/[0.03] border-red-500/15" : "bg-secondary/30 border-border/40"
                      )}
                    >
                      <StatusIcon className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", config.color.split(" ")[0])} />
                      <div className="flex-1">
                        <span className="text-foreground/80">{fu.description}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-muted-foreground">{fu.assignee.name}</span>
                          {fu.dueDate && (
                            <span className={cn("text-[10px]", fu.status === "missed" ? "text-red-500 font-medium" : "text-muted-foreground")}>
                              Due: {fu.dueDate}
                            </span>
                          )}
                          {fu.ticketKey && (
                            <span className="font-mono text-[10px] text-primary bg-primary/10 px-1 rounded">
                              {fu.ticketKey}
                            </span>
                          )}
                          {fu.emailSent && (
                            <span className="text-[10px] text-orange-500 flex items-center gap-0.5">
                              <Mail className="w-2.5 h-2.5" /> Alert sent
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("text-[9px]", config.color)}>
                        {config.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key decisions */}
          {context.keyDecisions.length > 0 && (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-1.5">
                Key decisions carried forward
              </p>
              <div className="space-y-1">
                {context.keyDecisions.map((decision, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground/70">
                    <span className="text-blue-500">•</span>
                    {decision}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Transcript — 3 cols */}
        <div className="lg:col-span-3">
          {/* AI Summary */}
          {meeting.aiSummary && (
            <div className="mb-6 p-4 rounded-xl bg-primary/[0.03] border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  AI Summary
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {meeting.aiSummary}
              </p>
            </div>
          )}

          <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" />
            Transcript
          </h3>

          {meeting.transcript.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Video className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No transcript yet. The meeting hasn&apos;t started.</p>
              {hasContext && (
                <p className="text-xs mt-2 text-primary">
                  The AI agent has pre-loaded context from previous meetings and will check open follow-ups when this meeting starts.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {meeting.transcript.map((entry) => (
                <div key={entry.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-primary">
                        {entry.speaker.avatar}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold">{entry.speaker.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {entry.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Follow-ups from this meeting */}
          {meeting.followUps.length > 0 && (
            <div>
              <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Follow-ups & Commitments
              </h3>
              <div className="space-y-2">
                {meeting.followUps.map((fu) => {
                  const config = followUpStatusConfig[fu.status];
                  const StatusIcon = config.icon;
                  return (
                    <div
                      key={fu.id}
                      className={cn(
                        "p-3 rounded-xl border",
                        fu.status === "missed"
                          ? "bg-red-500/[0.03] border-red-500/15"
                          : fu.status === "completed"
                          ? "bg-green-500/[0.03] border-green-500/15"
                          : "bg-card border-border"
                      )}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className={cn("w-3.5 h-3.5", config.color.split(" ")[0])} />
                          <Badge variant="outline" className={cn("text-[9px]", config.color)}>
                            {config.label}
                          </Badge>
                        </div>
                        {fu.ticketKey && (
                          <span className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {fu.ticketKey}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1">{fu.description}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[7px] font-bold text-primary">{fu.assignee.avatar}</span>
                        </div>
                        <span>{fu.assignee.name}</span>
                        {fu.dueDate && (
                          <>
                            <span>•</span>
                            <span className={fu.status === "missed" ? "text-red-500 font-medium" : ""}>
                              Due: {fu.dueDate}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground italic mt-1.5">
                        &ldquo;{fu.detectedFrom}&rdquo;
                      </p>
                      {fu.emailSent && (
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-orange-600 bg-orange-500/5 px-2 py-1 rounded-md border border-orange-500/10">
                          <Mail className="w-3 h-3" />
                          Alert sent to {fu.emailSentTo?.join(", ")}
                        </div>
                      )}
                      {fu.originMeetingId !== meeting.id && (
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] text-blue-500">
                          <History className="w-2.5 h-2.5" />
                          From: {fu.originMeetingTitle}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Detected Actions */}
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              AI Detected Actions
            </h3>

            {meeting.aiActions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
                <Bot className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No actions detected yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {meeting.aiActions.map((action) => (
                  <div
                    key={action.id}
                    className={cn(
                      "p-3 rounded-xl border transition-colors",
                      action.applied
                        ? "bg-green-500/[0.03] border-green-500/15"
                        : "bg-card border-border hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {action.applied ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                        <Badge variant="outline" className="text-[10px]">
                          {actionTypeLabels[action.type]}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {Math.round(action.confidence * 100)}%
                      </span>
                    </div>

                    <p className="text-sm font-medium mb-1">{action.description}</p>

                    {action.ticketKey && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[11px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          {action.ticketKey}
                        </span>
                        {action.fromStatus && action.toStatus && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            {action.fromStatus.replace("_", " ")}
                            <ArrowRight className="w-3 h-3" />
                            {action.toStatus.replace("_", " ")}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-[11px] text-muted-foreground italic mb-2">
                      &ldquo;{action.detectedFrom}&rdquo;
                    </p>

                    {!action.applied && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                        onClick={(e) => {
                          e.preventDefault();
                          applyMeetingAction(action);
                        }}
                      >
                        Apply action
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
