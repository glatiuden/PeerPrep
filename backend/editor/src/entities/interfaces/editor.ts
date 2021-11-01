import { Types } from "mongoose";

export default interface IEditor {
  _id: string;
  match_id: Types.ObjectId;
  content: string; // Contains the codes
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
