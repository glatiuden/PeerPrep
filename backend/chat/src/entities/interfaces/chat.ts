import { Schema } from "mongoose";

export default interface IChat {
  _id: string;
  match_id: string;
  content: {
    user_id: Schema.Types.ObjectId;
    display_name: string;
    message: string;
    time_sent: Date;
  }[];
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
