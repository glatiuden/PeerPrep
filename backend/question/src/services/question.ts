import mongoose from "mongoose";

import IQuestion from "../models/interfaces/question";

export default function makeQuestionService({
  questionDbModel,
}: {
  questionDbModel: mongoose.Model<IQuestion & mongoose.Document>;
}) {
  return new (class MongooseQuestionDb {
    async insert(insertPayload: Partial<IQuestion>): Promise<IQuestion | null> {
      const result = await questionDbModel.create([insertPayload]);
      const updated = await questionDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<IQuestion | null> {
      const existing = await questionDbModel.findById(id);
      if (existing) {
        return existing;
      }
      return null;
    }

    async findByDifficulty({ difficulty }: { difficulty: string }): Promise<IQuestion | null> {
      const existing = await questionDbModel.findOne({ difficulty: difficulty });
      if (existing) {
        return existing;
      }
      return null;
    }

    async findByTopic({ topic }: { topic: string }): Promise<IQuestion | null> {
      const existing = await questionDbModel.findOne({ topic: topic });
      if (existing) {
        return existing;
      }
      return null;
    }

    async findByDifficultyAndTopic(
      { difficulty }: { difficulty: string },
      { topic }: { topic: string },
    ): Promise<IQuestion | null> {
      const resultArray = await questionDbModel.find({ difficulty: difficulty, topic: topic });

      const resultArrayLength = resultArray.length;

      if (resultArrayLength <= 0) {
        return null;
      }
      const random = Math.floor(Math.random() * resultArrayLength);
      const result = resultArray[random];

      return result;
    }

    async findAll(): Promise<IQuestion[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await questionDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async update(payload: Partial<IQuestion>): Promise<IQuestion | null> {
      await questionDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await questionDbModel.findById({ _id: payload._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await questionDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<IQuestion | null> {
      const existing = await questionDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
