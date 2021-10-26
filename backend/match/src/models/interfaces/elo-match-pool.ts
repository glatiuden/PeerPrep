export default interface IEloMatchPool {
  _id: string;
  user_id: string;
  user_elo: number;
  status: EloMatchPoolStatus;
  programming_language: string;
  difficulty: string;
  topic?: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export enum EloMatchPoolStatus {
  WAITING = "waiting",
  MATCHED = "matched",
  CANCELLED = "cancelled",
}
