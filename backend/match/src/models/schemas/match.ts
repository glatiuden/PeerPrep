import { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    partner1_id: { type: Schema.Types.ObjectId, required: true },
    partner2_id: { type: Schema.Types.ObjectId, required: true },
    question_id: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: ["waiting", "in-progress", "completed", "cancelled"],
      default: "waiting",
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
