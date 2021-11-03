import { Schema } from "mongoose";

const editorSchema = new Schema(
  {
    match_id: { type: Schema.Types.ObjectId, trim: true, unique: true },
    content: { type: String, default: "" },
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

export default editorSchema;
