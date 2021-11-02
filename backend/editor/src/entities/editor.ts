import IEditor from "./interfaces/editor";
import { Types } from "mongoose";

export default class Editor implements IEditor {
  public readonly _id: string;
  public readonly match_id: string;
  public readonly content: string;
  public readonly deleted_at?: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({ _id, match_id, content, deleted_at, created_at, updated_at }: IEditor) {
    if (!_id) {
      throw new Error("Editor must have a _id.");
    }

    if (!match_id) {
      throw new Error("Editor must have a match_id.");
    }

    if (!content) {
      throw new Error("Editor must have a content.");
    }

    this._id = _id;
    this.match_id = match_id;
    this.content = content;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
