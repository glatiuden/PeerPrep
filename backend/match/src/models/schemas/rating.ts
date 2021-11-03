import { Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    match_id: { type: Schema.Types.ObjectId, required: true },
    giver_id: { type: Schema.Types.ObjectId, required: true },
    receiver_id: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number },
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

export default ratingSchema;
