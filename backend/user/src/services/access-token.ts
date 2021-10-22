import mongoose from "mongoose";
import IAccessToken from "../models/interfaces/access-token";

export default function makeAccessTokenDb({
  accessTokenDbModel,
}: {
  accessTokenDbModel: mongoose.Model<IAccessToken & mongoose.Document>;
}) {
  return new (class MongooseAccessTokenDb {
    async findAll(): Promise<IAccessToken[]> {
      const existing = await accessTokenDbModel.find().lean();
      if (existing) {
        return existing.map((accessToken) => {
          return {
            token: accessToken.token,
            revoked: accessToken.revoked,
          };
        });
      }

      return existing;
    }

    async findOne({
      user_id,
      user_type,
      revoked,
    }: {
      user_id: string;
      user_type?: string;
      revoked: boolean;
    }): Promise<IAccessToken | null> {
      const existing = await accessTokenDbModel.findOne({ user_id, user_type, revoked }).lean();
      if (existing) {
        return {
          token: existing.token,
          revoked: existing.revoked,
        };
      }
      return existing;
    }

    async insert(insertPayload: Partial<IAccessToken>): Promise<IAccessToken | null> {
      const result = await accessTokenDbModel.create([insertPayload]);
      const updated = await accessTokenDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async revoke(
      {
        user_id,
        user_type,
      }: {
        user_id: string;
        user_type?: string;
      },
      options = { session: null },
    ): Promise<string | null> {
      const result = await accessTokenDbModel
        .findOneAndUpdate({ user_id, user_type, revoked: false }, { revoked: true, updated_at: new Date() })
        .session(options.session)
        .lean();
      return result && result.token;
    }

    async revokeByUserId({ user_id }: { user_id: string }, options = { session: null }): Promise<string | null> {
      const result = await accessTokenDbModel
        .findOneAndUpdate({ user_id, revoked: false }, { revoked: true, updated_at: new Date() })
        .session(options.session)
        .lean();
      return result && result.token;
    }
  })();
}
