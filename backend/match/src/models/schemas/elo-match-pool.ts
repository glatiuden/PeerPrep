import { Schema } from "mongoose";

/**
 * @description Used for searching elo, to match user as closely as possible based on requirements.
 * Upon match, it will be converted into a normal match
 */
const eloMatchPoolSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    user_elo: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["waiting", "matched", "cancelled"],
      default: "waiting",
    },
    programming_language: { type: String, trim: true, lowercase: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], trim: true },
    topic: { type: String, enum: ["Data Structures", "Algorithms", "Concurrency"], trim: true }, // Optional
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

export default eloMatchPoolSchema;
