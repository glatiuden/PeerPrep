import { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    partner1_id: { type: Schema.Types.ObjectId, required: true },
    partner2_id: { type: Schema.Types.ObjectId },
    question_id: { type: Schema.Types.ObjectId },
    status: {
      type: String,
      required: true,
      enum: ["waiting", "in-progress", "completed", "cancelled"],
      default: "waiting",
    },
    mode: { type: String, enum: ["elo", "question"], default: "question" }, // To differentiate between question & elo match
    match_requirements: {
      programming_language: { type: String, trim: true, lowercase: true },
      question_mode: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ["timed", "otot"],
        required: true,
        default: "timed", // If ELO match => timed
      },
      elo_match_pool: { type: Schema.Types.ObjectId, ref: "EloMatchPool" },
    },
    // A small data snapshot to aid the ease of displaying meaningful data on frontend
    meta: {
      partner1_display_name: { type: String },
      partner2_display_name: { type: String },
      question_title: { type: String },
      parter1_rating: { type: Schema.Types.ObjectId, ref: "Rating" },
      partner2_rating: { type: Schema.Types.ObjectId, ref: "Rating" },
    },
    completed_at: { type: Date },
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
