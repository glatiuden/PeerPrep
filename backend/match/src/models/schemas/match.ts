import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    match_id: { type: String, trim: true, unique: true },
    user_name: {type: String, required: true},
    partner_name: {type: String, required: true},
    user_email: {type: String, required: true, unique: true},
    partner_email: {type: String, required: true, unique: true},
    difficulty_level: {type: String, required: true},
    topic_chosen: {type: String, required: true},
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

export default matchSchema;
