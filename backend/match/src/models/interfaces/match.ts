export default interface IMatch {
  _id: string;
  match_id: string;
  user_name: string;
  partner_name: string;
  user_email: string;
  partner_email: string;
  difficulty_level: string;
  topic_chosen: string;
  question: string;
  // user_rating: number;
  // partner_rating: number;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
