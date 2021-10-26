import _ from "lodash";
import mongoose from "mongoose";

import IMatch, {PaginatedMatchResult} from "../models/interfaces/match";

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

    async findAllPaginated({
      programming_languages = [],
      statuses = [],
      query = "",
      page = 1,
      entries_per_page = 15,
    }: {
      programming_languages?: string[];
      statuses?: string[];
      query: string;
      page: number;
      entries_per_page?: number;
    }): Promise<PaginatedMatchResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (!_.isEmpty(programming_languages)) {
        query_conditions["programming_language"] = { $in: programming_languages };
      }

      if (!_.isEmpty(statuses)) {
        query_conditions["status"] = { $in: statuses };
      }

      if (query) {
        query_conditions["$or"] = [
          { programming_language: { $regex: ".*" + query + ".*", $options: "si" } },
          { status: { $regex: ".*" + query + ".*", $options: "si" } }
        ];
      }

      const existing = await matchDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          updated_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await matchDbModel.countDocuments(query_conditions);

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
