export default interface IMatch {
  _id: string; // Match ID
  partner1_id: string; // Used to fetch user info
  partner2_id: string; // Used to fetch user info
  question_id: string; // Used to fetch question info
  status: MatchStatus; // Waiting | In-Progress | Completed -> Status to enqueue the match
  programming_language: string;
  mode: MatchMode;
  is_random: boolean;
  completed_at?: Date;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export enum MatchStatus {
  WAITING = "waiting", // Waiting for Match
  IN_PROGRESS = "in-progress", // Match in Progress
  COMPLETED = "completed", // Match completed
  CANCELLED = "cancelled", // Match cancelled
}

export enum MatchMode {
  TIMED = "timed",
  OTOT = "otot",
}
export interface PaginatedMatchResult {
  data: IMatch[];
  pagination: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    total_pages: number;
  };
}