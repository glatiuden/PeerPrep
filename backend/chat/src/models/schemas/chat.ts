import { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    match_id: { type: Schema.Types.ObjectId, trim: true, unique: true },
    content: [
      {
        user_id: { type: Schema.Types.ObjectId, default: "" },
        message: { type: String, default: "" },
        time_sent: { type: Date },
      },
    ],
    deleted_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    autoCreate: true,
  },
);

export default chatSchema;
