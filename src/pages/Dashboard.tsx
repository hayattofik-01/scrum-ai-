import { useBoardStore } from "@/store/board-store";
import { project, sprints } from "@/data/mock-data";
import { COLUMN_CONFIG, COLUMN_ORDER } from "@/types";
import {
  Columns3,
  Video,
  Bot,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { tickets, meetings, logs } = useBoardStore();
  const activeSprint = sprints.find((s) => s.isActive);
  const sprintTickets = tickets.filter((t) => t.sprintId === activeSprint?.id);
  const doneTickets = sprintTickets.filter((t) => t.status === "done");
  const totalPoints = sprintTickets.reduce((sum, t) => sum + t.storyPoints, 0);
  const donePoints = doneTickets.reduce((sum, t) => sum + t.storyPoints, 0);
  const completionPct = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;

  const recentMeetings = meetings.filter((m) => m.status === "completed").slice(0, 3);
  const totalAiActions = meetings.reduce(
    (sum, m) => sum + m.aiActions.filter((a) => a.applied).length,
    0
  );

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {project.name} · {activeSprint?.name}
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Columns3 className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">Sprint Tickets</span>
          </div>
          <p className="text-2xl font-bold">{sprintTickets.length}</p>
          <p className="text-xs text-muted-foreground">{totalPoints} story points</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground font-medium">Completion</span>
          </div>
          <p className="text-2xl font-bold">{completionPct}%</p>
          <Progress value={completionPct} className="h-1.5 mt-1" />
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">Meetings</span>
          </div>
          <p className="text-2xl font-bold">{meetings.length}</p>
          <p className="text-xs text-muted-foreground">
            {meetings.filter((m) => m.status === "completed").length} completed
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">AI Actions</span>
          </div>
          <p className="text-2xl font-bold">{totalAiActions}</p>
          <p className="text-xs text-muted-foreground">board updates from meetings</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Board summary — 2 cols */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Columns3 className="w-4 h-4 text-muted-foreground" />
              Board Overview
            </h3>
            <Link
              to="/app/board"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View board <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {COLUMN_ORDER.map((status) => {
              const config = COLUMN_CONFIG[status];
              const columnTickets = sprintTickets.filter((t) => t.status === status);
              return (
                <div
                  key={status}
                  className="p-3 rounded-xl border border-border bg-card text-center"
                >
                  <div className={cn("w-2 h-2 rounded-full mx-auto mb-1.5", config.color)} />
                  <p className="text-lg font-bold">{columnTickets.length}</p>
                  <p className="text-[10px] text-muted-foreground">{config.label}</p>
                </div>
              );
            })}
          </div>

          {/* Recent AI activity */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-muted-foreground" />
                Recent AI Activity
              </h3>
              <Link
                to="/app/agent"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {logs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-card/50"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{log.details}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {new Date(log.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {log.ticketKey && (
                    <Badge variant="outline" className="text-[10px] font-mono flex-shrink-0">
                      {log.ticketKey}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent meetings — 1 col */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Video className="w-4 h-4 text-muted-foreground" />
              Recent Meetings
            </h3>
            <Link
              to="/app/meetings"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentMeetings.map((m) => (
              <Link
                key={m.id}
                to={`/app/meetings/${m.id}`}
                className="block p-3 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow"
              >
                <p className="text-sm font-medium mb-1">{m.title}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {m.duration} min
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    {m.aiActions.filter((a) => a.applied).length} actions
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
