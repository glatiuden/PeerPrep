import mongoose from "mongoose";

import IMatch from "../models/interfaces/match";

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

    async findById({ id }: { id: string }): Promise<IMatch | null> {
      const existing = await matchDbModel.findById(id);
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
