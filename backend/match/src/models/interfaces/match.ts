export default interface IMatch {
  _id: string; // Match ID
  partner1_id: string; // Used to fetch user info
  partner2_id: string; // Used to fetch user info
  question_id: string; // Used to fetch question info
  status: MatchStatus; // Waiting | In-Progress | Completed -> Status to enqueue the match
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