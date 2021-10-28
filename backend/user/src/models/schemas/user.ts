import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    display_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, trim: true, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    elo: { type: Number, default: 1000 },
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
