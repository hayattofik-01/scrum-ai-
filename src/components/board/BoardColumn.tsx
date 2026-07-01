import type { Ticket, TicketStatus } from "@/types";
import { COLUMN_CONFIG } from "@/types";
import { Droppable } from "@hello-pangea/dnd";
import TicketCard from "./TicketCard";
import { cn } from "@/lib/utils";

interface BoardColumnProps {
  status: TicketStatus;
  tickets: Ticket[];
}

const BoardColumn = ({ status, tickets }: BoardColumnProps) => {
  const config = COLUMN_CONFIG[status];

  return (
    <div className="flex flex-col min-w-[280px] max-w-[320px] w-full">
      {/* Column header */}
      <div className="flex items-center gap-2 px-2 py-2 mb-2">
        <div className={cn("w-2.5 h-2.5 rounded-full", config.color)} />
        <span className="text-sm font-semibold text-foreground">{config.label}</span>
        <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full ml-auto">
          {tickets.length}
        </span>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 space-y-2 p-2 rounded-lg min-h-[200px] transition-colors",
              snapshot.isDraggingOver
                ? "bg-primary/5 border-2 border-dashed border-primary/20"
                : "bg-secondary/20 border-2 border-transparent"
            )}
          >
            {tickets.map((ticket, index) => (
              <TicketCard key={ticket.id} ticket={ticket} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
