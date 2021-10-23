import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true }, // Title of the question
    description: { type: String, default: "" }, // Description of the question
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "", trim: true },
    recommended_duration: { type: Number, default: 30 },
    topic: { type: String, enum: ["Data Structures", "Algorithms", "Database"], default: "", trim: true },
    hints: [{ type: String, trim: true }],
    examples: [
      {
        input: { type: String, trim: true },
        output: { type: String, trim: true },
      },
    ],
    constraints: [{ type: String, trim: true }], // Array of strings
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
