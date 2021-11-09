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
      user_role,
      revoked,
    }: {
      user_id: string;
      user_role?: string;
      revoked: boolean;
    }): Promise<IAccessToken | null> {
      const existing = await accessTokenDbModel.findOne({ user_id, user_role, revoked }).lean();
      if (existing) {
        return {
          token: existing.token,
          revoked: existing.revoked,
        };
      }
      return existing;
    }

    async findUserId({ token }: { token: string }): Promise<string | undefined> {
      const existing = await accessTokenDbModel.findOne({ token, revoked: false }).lean();
      if (existing) {
        return existing.user_id;
      }
      return undefined;
    }

    async findValidToken({ user_id, user_role }: { user_id: string; user_role?: string }): Promise<string | null> {
      const existing = await accessTokenDbModel.findOne({ user_id, user_role, revoked: false }).lean();
      if (existing) {
        return existing.token;
      }
      return null;
    }

    async insert(insertPayload: Partial<IAccessToken>): Promise<IAccessToken | null> {
      const result = await accessTokenDbModel.create([insertPayload]);
      const updated = await accessTokenDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async revokeByToken(
      {
        token,
      }: {
        token: string;
      },
      options = { session: null },
    ): Promise<string | null> {
      const result = await accessTokenDbModel
        .findOneAndUpdate({ token, revoked: false }, { revoked: true, updated_at: new Date() })
        .session(options.session)
        .lean();
      return result && result.token;
    }

    async revoke(
      {
        user_id,
        user_role,
      }: {
        user_id: string;
        user_role?: string;
      },
      options = { session: null },
    ): Promise<boolean | null> {
      const result = await accessTokenDbModel
        .findOneAndUpdate({ user_id, user_role, revoked: false }, { revoked: true, updated_at: new Date() })
        .session(options.session)
        .lean();
      return !!result && !!result.token;
    }

    async revokeAllByUserId({ user_id }: { user_id: string }, options = { session: null }): Promise<boolean> {
      const query_conditions = { user_id, revoked: false };
      const updated = await accessTokenDbModel
        .updateMany(query_conditions, { revoked: true })
        .session(options.session)
        .lean();
      return updated.acknowledged;
    }
  })();
}
