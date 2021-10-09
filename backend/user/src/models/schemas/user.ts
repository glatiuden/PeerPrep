import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    display_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, trim: true },
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

export default userSchema;
