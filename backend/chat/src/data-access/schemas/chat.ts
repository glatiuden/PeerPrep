import { Schema } from "mongoose";

const contentSchema = new Schema({
  user_id: { type: String, default: "", trim: true },
  display_name: { type: String, trim: true },
  message: { type: String, default: "" },
  time_sent: { type: Date },
});

const chatSchema = new Schema(
  {
    match_id: { type: Schema.Types.ObjectId, trim: true, unique: true },
    content: [contentSchema],
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
