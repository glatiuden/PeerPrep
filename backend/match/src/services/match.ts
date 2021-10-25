import _ from "lodash";
import mongoose from "mongoose";

import IMatch, { MatchStatus, PaginatedMatchResult } from "../models/interfaces/match";

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
      is_elo_match = false,
      question_id,
      programming_language,
      mode,
    }: {
      user_id: string;
      is_elo_match: boolean;
      question_id?: string;
      programming_language?: string;
      mode?: string;
    }): Promise<IMatch | null> {
      const query_conditions = {
        deleted_at: undefined,
        status: MatchStatus.WAITING,
        $and: [{ partner1_id: { $ne: user_id } }, { partner2_id: { $ne: user_id } }],
        is_elo_match,
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

    async findAllByUserIdPaginated(
      { user_id, is_elo_match, status }: { user_id: string; is_elo_match?: boolean; status?: MatchStatus },
      {
        query = "",
        page = 1,
        entries_per_page = 15,
      }: {
        query: string;
        page: number;
        entries_per_page?: number;
      },
    ): Promise<PaginatedMatchResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;
      // const search_conditions = [{ partner1_id: { $eq: user_id } }, { partner2_id: { $eq: user_id } }];

      let search_conditions;
      if (query) {
        search_conditions = [
          { partner1_id: { $eq: user_id } },
          { partner2_id: { $eq: user_id } },
          { "match_requirements.topic": { $regex: ".*" + query + ".*", $options: "si" } },
          { "match_requirements.difficulty": { $regex: ".*" + query + ".*", $options: "si" } },
          { "match_requirements.programming_language": { $regex: ".*" + query + ".*", $options: "si" } },
          { "match_requirements.mode": { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      } else {
        search_conditions = [{ partner1_id: { $eq: user_id } }, { partner2_id: { $eq: user_id } }];
      }

      const query_conditions = {
        $or: search_conditions,
        deleted_at: undefined,
      };

      if (_.isBoolean(is_elo_match)) {
        query_conditions["is_elo_match"] = is_elo_match;
      }

      if (status) {
        query_conditions["status"] = status;
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
