export type TicketStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface Ticket {
  id: string;
  key: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: TeamMember | null;
  createdAt: string;
  updatedAt: string;
  storyPoints: number;
  labels: string[];
  createdFromMeeting?: string;
  sprintId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: TeamMember[];
  status: "scheduled" | "in_progress" | "completed";
  transcript: TranscriptEntry[];
  aiSummary: string;
  aiActions: MeetingAction[];
  followUps: FollowUp[];
  carryOverContext?: MeetingContext;
  recordingUrl?: string;
}

export interface TranscriptEntry {
  id: string;
  speaker: TeamMember;
  text: string;
  timestamp: string;
}

export interface MeetingAction {
  id: string;
  type: "create_ticket" | "move_ticket" | "update_ticket" | "assign_ticket";
  description: string;
  ticketId?: string;
  ticketKey?: string;
  fromStatus?: TicketStatus;
  toStatus?: TicketStatus;
  confidence: number;
  applied: boolean;
  detectedFrom: string;
}

export type FollowUpStatus = "pending" | "completed" | "missed" | "in_progress";

export interface FollowUp {
  id: string;
  description: string;
  assignee: TeamMember;
  dueDate?: string;
  status: FollowUpStatus;
  originMeetingId: string;
  originMeetingTitle: string;
  ticketKey?: string;
  detectedFrom: string;
  checkedInMeetingId?: string;
  emailSent?: boolean;
  emailSentTo?: string[];
}

export interface MeetingContext {
  previousMeetingId: string;
  previousMeetingTitle: string;
  previousMeetingDate: string;
  unresolvedFollowUps: FollowUp[];
  completedSinceLast: FollowUp[];
  keyDecisions: string[];
}

export type AlertSeverity = "info" | "warning" | "critical";

export interface EmailAlert {
  id: string;
  timestamp: string;
  subject: string;
  recipients: string[];
  ccList: string[];
  severity: AlertSeverity;
  meetingId: string;
  meetingTitle: string;
  body: string;
  followUpIds: string[];
  sent: boolean;
}

export interface AlertConfig {
  enabled: boolean;
  ccEmails: string[];
  alertOnMissedFollowUps: boolean;
  alertOnBlockers: boolean;
  alertOnMissedDeadlines: boolean;
  alertOnHighPriorityChanges: boolean;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  sprints: Sprint[];
  members: TeamMember[];
}

export interface AIAgentLog {
  id: string;
  timestamp: string;
  meetingId: string;
  action: string;
  details: string;
  ticketKey?: string;
  category?: "ticket_move" | "follow_up" | "email_alert" | "context_carry";
}

export const COLUMN_CONFIG: Record<TicketStatus, { label: string; color: string }> = {
  backlog: { label: "Backlog", color: "bg-slate-500" },
  todo: { label: "To Do", color: "bg-blue-500" },
  in_progress: { label: "In Progress", color: "bg-yellow-500" },
  in_review: { label: "In Review", color: "bg-purple-500" },
  done: { label: "Done", color: "bg-green-500" },
};

export const COLUMN_ORDER: TicketStatus[] = [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
];

export const PRIORITY_CONFIG: Record<TicketPriority, { label: string; color: string; icon: string }> = {
  critical: { label: "Critical", color: "text-red-500", icon: "arrow-up" },
  high: { label: "High", color: "text-orange-500", icon: "arrow-up" },
  medium: { label: "Medium", color: "text-yellow-500", icon: "minus" },
  low: { label: "Low", color: "text-blue-500", icon: "arrow-down" },
};
