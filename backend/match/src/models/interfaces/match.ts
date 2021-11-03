import IEloMatchPool from "./elo-match-pool";

export default interface IMatch {
  _id: string; // Match ID
  partner1_id: string; // Used to fetch user info
  partner2_id: string; // Used to fetch user info
  question_id: string; // Used to fetch question info
  status: MatchStatus; // Waiting | In-Progress | Completed | Cancelled -> Status to enqueue the match
  mode: MatchMode;
  match_requirements: {
    programming_language?: string;
    question_mode?: QuestionMode;
    elo_match_pool?: IEloMatchPool;
  };
  // A small data snapshot to aid the ease of displaying meaningful data on frontend
  meta: {
    partner1_display_name?: string;
    partner2_display_name?: string;
    question_title?: string;
  };
  matched_at?: Date;
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
  ELO = "elo",
  QUESTION = "question",
}

export enum QuestionMode {
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
