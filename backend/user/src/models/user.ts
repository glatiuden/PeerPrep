import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, trim: true, unique: true },
    display: { type: String },
    email: { type: String, unique: true },
    password: { type: String, trim: true },
    past_matches: { type: [Schema.Types.ObjectId] } // tentative: holds all the match_ids of this user
  }
);

export default userSchema;
