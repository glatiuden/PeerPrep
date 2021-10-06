import { Schema } from "mongoose";

export default interface IChat {
  _id: string;
  match_id: Schema.Types.ObjectId;
  content: {
    user_id: Schema.Types.ObjectId;
    message: string;
    time_sent: Date;
  }[];
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
