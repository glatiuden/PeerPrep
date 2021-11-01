import mongoose from "mongoose";

import IChatDb from "./interfaces/chat-db";

import Chat from "../entities/chat";
import IChat from "../entities/interfaces/chat";

export default function makeChatService({ chatDbModel }: { chatDbModel: mongoose.Model<IChat & mongoose.Document> }) {
  return new (class MongooseChatDb implements IChatDb {
    async insert(insertPayload: Partial<IChat>): Promise<Chat | null> {
      const result = await chatDbModel.create([insertPayload]);
      const updated = await chatDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return new Chat(updated);
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<Chat | null> {
      const existing = await chatDbModel.findById(id);
      if (existing) {
        return new Chat(existing);
      }
      return null;
    }

    async findAll(): Promise<Chat[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await chatDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing.map((chat) => new Chat(chat));
      }
      return [];
    }

    async findByMatchId({ match_id }: { match_id: string }): Promise<Chat | null> {
      const query_conditions = { match_id: match_id as any, deleted_at: undefined };
      const existing = await chatDbModel.findOne(query_conditions);
      if (existing) {
        return new Chat(existing);
      }
      return null;
    }

    async update(updatePayload: Partial<IChat>): Promise<Chat | null> {
      await chatDbModel.findOneAndUpdate({ _id: updatePayload._id }, updatePayload);
      const updated = await chatDbModel.findById({ _id: updatePayload._id });
      if (updated) {
        return new Chat(updated);
      }
      return null;
    }

    async delete({ id }: { id: string }): Promise<Chat | null> {
      const existing = await chatDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return new Chat(existing);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await chatDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }
  })();
}
