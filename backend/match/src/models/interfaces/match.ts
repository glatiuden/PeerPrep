export default interface IMatch {
  _id: string;
  match_id: string;
  user_name: string;
  partner_name: string;
  user_email: string;
  partner_email: string;
  difficulty_level: string;
  topic_chosen: string;
  // user_rating: int;
  // partner_rating: int;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
