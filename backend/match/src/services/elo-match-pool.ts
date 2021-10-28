import _ from "lodash";
import mongoose from "mongoose";

import IEloMatchPool, { EloMatchPoolStatus } from "../models/interfaces/elo-match-pool";

export default function makeEloMatchPoolService({
  eloMatchPoolDbModel,
}: {
  eloMatchPoolDbModel: mongoose.Model<IEloMatchPool & mongoose.Document>;
}) {
  return new (class MongooseMatchDb {
    async insert(insertPayload: Partial<IEloMatchPool>): Promise<IEloMatchPool | null> {
      const result = await eloMatchPoolDbModel.create([insertPayload]);
      const updated = await eloMatchPoolDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async findByCondition({
      user_id,
      user_elo,
      programming_language,
      difficulty,
      topic,
    }: {
      user_id: string;
      user_elo;
      programming_language: string;
      difficulty: string;
      topic?: string;
    }): Promise<IEloMatchPool | null> {
      const query_conditions = {
        user_id: { $ne: user_id },
        status: EloMatchPoolStatus.WAITING,
        programming_language,
        difficulty,
        deleted_at: undefined,
      };

      if (topic) {
        query_conditions["topic"] = topic;
      }

      const existing = await eloMatchPoolDbModel.findOne(query_conditions);
      if (existing) {
        return existing;
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<IEloMatchPool | null> {
      const existing = await eloMatchPoolDbModel.findById(id).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    async findAll(): Promise<IEloMatchPool[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await eloMatchPoolDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async update(payload: Partial<IEloMatchPool>): Promise<IEloMatchPool | null> {
      await eloMatchPoolDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await eloMatchPoolDbModel.findById({ _id: payload._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await eloMatchPoolDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<IEloMatchPool | null> {
      const existing = await eloMatchPoolDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
