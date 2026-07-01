import type { Ticket } from "@/types";
import { PRIORITY_CONFIG } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { MessageCircle, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  ticket: Ticket;
  index: number;
}

const PriorityIcon = ({ priority }: { priority: Ticket["priority"] }) => {
  const config = PRIORITY_CONFIG[priority];
  const iconClass = cn("w-3.5 h-3.5", config.color);
  if (priority === "critical" || priority === "high") return <ArrowUp className={iconClass} />;
  if (priority === "low") return <ArrowDown className={iconClass} />;
  return <Minus className={iconClass} />;
};

const TicketCard = ({ ticket, index }: TicketCardProps) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "p-3 rounded-lg border bg-card shadow-sm transition-shadow cursor-grab active:cursor-grabbing",
            snapshot.isDragging ? "shadow-lg border-primary/30 ring-1 ring-primary/20" : "border-border hover:shadow-md"
          )}
        >
          {/* Ticket key + priority */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-muted-foreground">{ticket.key}</span>
            <PriorityIcon priority={ticket.priority} />
          </div>

          {/* Title */}
          <p className="text-sm font-medium text-foreground leading-snug mb-2">
            {ticket.title}
          </p>

          {/* Labels */}
          {ticket.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {ticket.labels.map((label) => (
                <span
                  key={label}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Footer: assignee + story points */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              {ticket.assignee ? (
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-primary">
                    {ticket.assignee.avatar}
                  </span>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-secondary border border-dashed border-border" />
              )}
            </div>
            <div className="flex items-center gap-2">
              {ticket.createdFromMeeting && (
                <MessageCircle className="w-3 h-3 text-primary" />
              )}
              <span className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                {ticket.storyPoints} SP
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TicketCard;
