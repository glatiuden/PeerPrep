import _ from "lodash";
import mongoose from "mongoose";

import IQuestion, { PaginatedEditorResult } from "../models/interfaces/question";

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

    async findByDifficultyAndTopic({
      difficulty,
      topic,
    }: {
      difficulty: string;
      topic?: string;
    }): Promise<IQuestion | null> {
      const query_conditions = { difficulty, deleted_at: undefined };
      if (topic) {
        query_conditions["topic"] = topic;
      }

      const resultArray = await questionDbModel.find({ difficulty, topic });

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

    async findAllPaginated({
      difficulty_levels = [],
      topics = [],
      query = "",
      page = 1,
      entries_per_page = 15,
    }: {
      difficulty_levels?: string[];
      topics?: string[];
      query: string;
      page: number;
      entries_per_page?: number;
    }): Promise<PaginatedEditorResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;
      const query_conditions = { deleted_at: undefined };

      if (!_.isEmpty(difficulty_levels)) {
        query_conditions["difficulty"] = { $in: difficulty_levels };
      }

      if (!_.isEmpty(topics)) {
        query_conditions["topic"] = { $in: topics };
      }

      if (query) {
        query_conditions["$or"] = [
          { title: { $regex: ".*" + query + ".*", $options: "si" } },
          { description: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      }

      const existing = await questionDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          updated_at: "desc",
        })
        .select("-__v")
        .lean({ virtuals: true });

      const total_count = await questionDbModel.countDocuments(query_conditions);

      if (existing) {
        const from = page - 1 > 0 ? page - 1 : null;
        const has_more_entries = existing.length === entries_per_page && page * entries_per_page !== total_count;
        const to = has_more_entries ? page + 1 : null;
        const total_pages = Math.ceil(total_count / entries_per_page);
        return {
          data: existing,
          pagination: {
            current_page: page,
            from,
            to,
            per_page: entries_per_page,
            total: total_count,
            total_pages,
          },
        };
      }

      return null;
    }

    async findAllTopics(): Promise<string[]> {
      const query_conditions = { deleted_at: undefined, topic: { $ne: undefined } };
      const topics: string[] = await questionDbModel.distinct("topic", query_conditions).lean({ virtuals: true });
      return topics;
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
