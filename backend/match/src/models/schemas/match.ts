import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    match_id: { type: String, trim: true, unique: true },
    // programming_language: { type: String, trim: true, lowercase: true },
    // content: { type: String, default: "" },
    user_name: {type: String, required: true},
    partner_name: {type: String, required: true},
    user_email: {type: String, required: true, unique: true},
    partner_email: {type: String, required: true, unique: true},
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
