import _ from "lodash";
import mongoose, { ClientSession, Types } from "mongoose";

import IRating from "../models/interfaces/rating";

export default function makeRatingService({
  ratingDbModel,
}: {
  ratingDbModel: mongoose.Model<IRating & mongoose.Document>;
}) {
  return new (class MongooseRatingDb {
    async insert(
      insertPayload: Partial<IRating>,
      { session = undefined }: { session?: ClientSession | undefined } = {},
    ): Promise<IRating | null> {
      const result = await ratingDbModel.create([insertPayload], { session });
      const updated = await ratingDbModel
        .findOne({ _id: result[0]?._id })
        .session(session || null)
        .lean();
      if (updated) {
        return updated;
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<IRating | null> {
      const existing = await ratingDbModel.findById(id).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    async findAll(): Promise<IRating[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await ratingDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async findAllByReceiverId({ receiver_id }: { receiver_id: string }): Promise<IRating[]> {
      const query_conditions = { receiver_id: new Types.ObjectId(receiver_id) as any, deleted_at: undefined };
      const existing = await ratingDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async findAverageRatingByReceiverId({ receiver_id }: { receiver_id: string }): Promise<number> {
      const query_conditions = { receiver_id: new Types.ObjectId(receiver_id), deleted_at: undefined };
      const receiver_average_ratings = await ratingDbModel.aggregate([
        {
          $match: query_conditions,
        },
        {
          $group: {
            _id: null,
            avg_rating: { $avg: "$rating" },
          },
        },
      ]);

      if (!_.isEmpty(receiver_average_ratings)) {
        return receiver_average_ratings[0].avg_rating;
      }
      return 0;
    }

    async update(
      payload: Partial<IRating>,
      { session = undefined }: { session?: ClientSession | undefined } = {},
    ): Promise<IRating | null> {
      await ratingDbModel.findOneAndUpdate({ _id: payload._id }, payload, { session });
      const updated = await ratingDbModel
        .findById({ _id: payload._id })
        .session(session || null)
        .lean();
      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await ratingDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<IRating | null> {
      const existing = await ratingDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
