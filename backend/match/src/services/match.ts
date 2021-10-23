import mongoose from "mongoose";

import IMatch, { MatchStatus } from "../models/interfaces/match";

export default function makeMatchService({
  matchDbModel,
}: {
  matchDbModel: mongoose.Model<IMatch & mongoose.Document>;
}) {
  return new (class MongooseMatchDb {
    async insert(insertPayload: Partial<IMatch>): Promise<IMatch | null> {
      const result = await matchDbModel.create([insertPayload]);
      const updated = await matchDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async findByCondition({
      user_id,
      question_id,
      programming_language,
      mode,
    }: {
      user_id: string;
      question_id?: string;
      programming_language?: string;
      mode?: string;
    }): Promise<IMatch | null> {
      const query_conditions = {
        deleted_at: undefined,
        status: MatchStatus.WAITING,
        $and: [{ partner1_id: { $ne: user_id } }, { partner2_id: { $ne: user_id } }],
      };
      if (question_id) {
        query_conditions["question_id"] = question_id;
      }
      if (programming_language) {
        query_conditions["programming_language"] = programming_language;
      }
      if (mode) {
        query_conditions["mode"] = mode;
      }
      const existing = await matchDbModel.findOne(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<IMatch | null> {
      const existing = await matchDbModel.findById(id).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    async findAll(): Promise<IMatch[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await matchDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async findAllByUserId({ user_id }: { user_id: string }): Promise<IMatch[]> {
      const query_conditions = { user_id, deleted_at: undefined };
      const existing = await matchDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async update(payload: Partial<IMatch>): Promise<IMatch | null> {
      await matchDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await matchDbModel.findById({ _id: payload._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await matchDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<IMatch | null> {
      const existing = await matchDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
