import IChat from "./interfaces/chat";
import { Schema } from "mongoose";

export default class Chat implements IChat {
  public readonly _id: string;
  public readonly match_id: Schema.Types.ObjectId;
  public readonly content: {
    user_id: Schema.Types.ObjectId;
    display_name: string;
    message: string;
    time_sent: Date;
  }[];
  public readonly deleted_at?: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({ _id, match_id, content, deleted_at, created_at, updated_at }: IChat) {
    if (!_id) {
      throw new Error("Chat must have a _id.");
    }

    if (!match_id) {
      throw new Error("Chat must have a match_id.");
    }

    if (!content) {
      throw new Error("Chat must have a content.");
    }

    this._id = _id;
    this.match_id = match_id;
    this.content = content;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
