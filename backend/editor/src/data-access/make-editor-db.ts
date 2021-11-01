import mongoose from "mongoose";
import Editor from "../entities/editor";

import IEditor from "../entities/interfaces/editor";
import IEditorDb from "./interfaces/editor-db";

export default function makeEditorService({
  editorDbModel,
}: {
  editorDbModel: mongoose.Model<IEditor & mongoose.Document>;
}) {
  return new (class MongooseEditorDb implements IEditorDb {
    async insert(insertPayload: Partial<IEditor>): Promise<Editor | null> {
      const result = await editorDbModel.create([insertPayload]);
      const updated = await editorDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return new Editor(updated);
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<Editor | null> {
      const existing = await editorDbModel.findById(id);
      if (existing) {
        return new Editor(existing);
      }
      return null;
    }

    async findByMatchId({ match_id }: { match_id: string }): Promise<Editor | null> {
      const query_conditions = { match_id: match_id as any, deleted_at: undefined };
      const existing = await editorDbModel.findOne(query_conditions);
      if (existing) {
        return new Editor(existing);
      }
      return null;
    }

    async findAll(): Promise<Editor[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await editorDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing.map((editor) => new Editor(editor));
      }
      return [];
    }

    async update(updatePayload: Partial<IEditor>): Promise<Editor | null> {
      await editorDbModel.findOneAndUpdate({ _id: updatePayload._id }, updatePayload);
      const updated = await editorDbModel.findById({ _id: updatePayload._id });
      if (updated) {
        return new Editor(updated);
      }
      return null;
    }

    async delete({ id }: { id: string }): Promise<Editor | null> {
      const existing = await editorDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      const updated = await editorDbModel.findById({ _id: existing._id });
      if (updated) {
        return new Editor(updated);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await editorDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }
  })();
}
