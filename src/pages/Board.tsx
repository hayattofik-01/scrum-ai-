import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { COLUMN_ORDER, type TicketStatus } from "@/types";
import BoardColumn from "@/components/board/BoardColumn";
import { useBoardStore } from "@/store/board-store";
import { project, sprints } from "@/data/mock-data";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Board = () => {
  const { tickets, moveTicket } = useBoardStore();
  const [searchQuery, setSearchQuery] = useState("");
  const activeSprint = sprints.find((s) => s.isActive);

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    const newStatus = destination.droppableId as TicketStatus;
    moveTicket(draggableId, newStatus);
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-display font-bold">{project.name}</h1>
            <p className="text-sm text-muted-foreground">
              {activeSprint?.name} · {activeSprint?.startDate} — {activeSprint?.endDate}
            </p>
          </div>
        </div>

        {/* Search & filter bar */}
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </Button>
        </div>
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMN_ORDER.map((status) => (
            <BoardColumn
              key={status}
              status={status}
              tickets={filteredTickets.filter((t) => t.status === status)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
