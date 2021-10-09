import mongoose from "mongoose";
import IUser, { UserRole } from "../models/interfaces/user";


export default function makeUserService({ userDbModel }: { userDbModel: mongoose.Model<IUser & mongoose.Document> }) {
  return new (class MongooseChatDb {
    async insertUser(insertPayload: Partial<IUser>): Promise<IUser | null> {
      insertPayload.role = UserRole.USER
      const result = await userDbModel.create([insertPayload]);
      const updated = await userDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async insertAdmin(insertPayload: Partial<IUser>): Promise<IUser | null> {
      insertPayload.role = UserRole.ADMIN
      const result = await userDbModel.create([insertPayload]);
      const updated = await userDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<IUser | null> {
      const existing = await userDbModel.findById(id);
      if (existing) {
        return existing;
      }
      return null;
    }

    async findAll(): Promise<IUser[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await userDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async update(payload: Partial<IUser>): Promise<IUser | null> {
      await userDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await userDbModel.findById({ _id: payload._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await userDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<IUser | null> {
      const existing = await userDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return existing;
      }
      return null;
    }

    async reset(): Promise<boolean> {
      const result = await userDbModel.deleteMany({})
      return result.deletedCount > 0;
    }
  })();
}
