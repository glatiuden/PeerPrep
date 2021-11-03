export default interface IRating {
  _id: string;
  match_id: string;
  giver_id: string;
  receiver_id: string;
  rating: number;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
