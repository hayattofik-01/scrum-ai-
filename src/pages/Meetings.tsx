import { Link } from "react-router-dom";
import { useBoardStore } from "@/store/board-store";
import { Video, Clock, Users, Bot, Calendar, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusConfig = {
  completed: { label: "Completed", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  in_progress: { label: "Live", color: "bg-red-500/10 text-red-600 border-red-500/20" },
  scheduled: { label: "Scheduled", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
};

const Meetings = () => {
  const { meetings } = useBoardStore();

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-1">Meetings</h1>
        <p className="text-sm text-muted-foreground">
          ScrumAI joins your meetings and automatically updates your board based on the discussion.
        </p>
      </div>

      {/* Connect meeting source */}
      <div className="mb-6 p-4 rounded-xl border border-dashed border-primary/30 bg-primary/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Video className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Connect your calendar</p>
            <p className="text-xs text-muted-foreground">
              Link Google Meet, Zoom, or Teams to let ScrumAI join automatically.
            </p>
          </div>
          <Button size="sm" variant="outline">
            Connect
          </Button>
        </div>
      </div>

      {/* Meeting list */}
      <div className="space-y-3">
        {meetings.map((meeting) => {
          const config = statusConfig[meeting.status];
          const appliedActions = meeting.aiActions.filter((a) => a.applied).length;
          const totalActions = meeting.aiActions.length;

          return (
            <Link
              key={meeting.id}
              to={`/app/meetings/${meeting.id}`}
              className="block p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Video className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(meeting.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meeting.duration} min
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {meeting.participants.length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", config.color)}
                  >
                    {config.label}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* AI actions summary */}
              {totalActions > 0 && (
                <div className="flex items-center gap-2 ml-12">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {appliedActions}/{totalActions} AI actions applied
                  </span>
                  <div className="flex gap-0.5 ml-1">
                    {meeting.aiActions.map((action) => (
                      <div key={action.id}>
                        {action.applied ? (
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        ) : (
                          <Circle className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Summary */}
              {meeting.aiSummary && (
                <p className="text-xs text-muted-foreground mt-2 ml-12 line-clamp-2">
                  {meeting.aiSummary}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Meetings;
