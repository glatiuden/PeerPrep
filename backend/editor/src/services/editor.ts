import mongoose from "mongoose";

import IEditor from "../models/interfaces/editor";

export default function makeEditorService({
  editorDbModel,
}: {
  editorDbModel: mongoose.Model<IEditor & mongoose.Document>;
}) {
  return new (class MongooseEditorDb {
    async insert(insertPayload: Partial<IEditor>): Promise<IEditor | null> {
      const result = await editorDbModel.create([insertPayload]);
      const updated = await editorDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<IEditor | null> {
      const existing = await editorDbModel.findById(id);
      if (existing) {
        return existing;
      }
      return null;
    }

    async findAll(): Promise<IEditor[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await editorDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing;
      }
      return [];
    }

    async update(payload: Partial<IEditor>): Promise<IEditor | null> {
      await editorDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await editorDbModel.findById({ _id: payload._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await editorDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<IEditor | null> {
      const existing = await editorDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
