import { useState, useCallback } from "react";
import type { Ticket, TicketStatus, MeetingAction, EmailAlert, AlertConfig } from "@/types";
import {
  initialTickets,
  meetings as initialMeetings,
  aiAgentLogs as initialLogs,
  emailAlerts as initialAlerts,
  defaultAlertConfig,
} from "@/data/mock-data";
import type { AIAgentLog } from "@/types";

let globalTickets = [...initialTickets];
let globalMeetings = [...initialMeetings];
let globalLogs = [...initialLogs];
let globalAlerts = [...initialAlerts];
let globalAlertConfig: AlertConfig = { ...defaultAlertConfig };
let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((fn) => fn());
}

export function useBoardStore() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const rerender = () => setTick((t) => t + 1);
    listeners.push(rerender);
    return () => {
      listeners = listeners.filter((fn) => fn !== rerender);
    };
  }, []);

  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const moveTicket = useCallback((ticketId: string, newStatus: TicketStatus) => {
    globalTickets = globalTickets.map((t) =>
      t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
    );
    notify();
  }, []);

  const addTicket = useCallback((ticket: Ticket) => {
    globalTickets = [...globalTickets, ticket];
    notify();
  }, []);

  const updateTicket = useCallback((ticketId: string, updates: Partial<Ticket>) => {
    globalTickets = globalTickets.map((t) =>
      t.id === ticketId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    notify();
  }, []);

  const applyMeetingAction = useCallback((action: MeetingAction) => {
    if (action.type === "move_ticket" && action.ticketId && action.toStatus) {
      moveTicket(action.ticketId, action.toStatus);
    }
    globalMeetings = globalMeetings.map((m) => ({
      ...m,
      aiActions: m.aiActions.map((a) =>
        a.id === action.id ? { ...a, applied: true } : a
      ),
    }));
    notify();
  }, [moveTicket]);

  const addLog = useCallback((log: AIAgentLog) => {
    globalLogs = [log, ...globalLogs];
    notify();
  }, []);

  const updateAlertConfig = useCallback((config: Partial<AlertConfig>) => {
    globalAlertConfig = { ...globalAlertConfig, ...config };
    notify();
  }, []);

  const addEmailAlert = useCallback((alert: EmailAlert) => {
    globalAlerts = [alert, ...globalAlerts];
    notify();
  }, []);

  return {
    tickets: globalTickets,
    meetings: globalMeetings,
    logs: globalLogs,
    alerts: globalAlerts,
    alertConfig: globalAlertConfig,
    moveTicket,
    addTicket,
    updateTicket,
    applyMeetingAction,
    addLog,
    updateAlertConfig,
    addEmailAlert,
  };
}
