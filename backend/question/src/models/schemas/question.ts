import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    difficulty: { type: String, enum : ['easy','medium','hard'], default: "" },
    topic: { type: String, enum : ['Data Structures','Algorithms','Database'], default: "" },
    question: { type: String, default: "" },
    hint: { type: String, default: "" },
    solution: { type: String, default: "" },
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

export default questionSchema;
