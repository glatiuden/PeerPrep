import mongoose from "mongoose";

import IEditor, { PaginatedEditorResult } from "../models/interfaces/editor";

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

    async findAllPaginated({
      query = "",
      page = 1,
      entries_per_page = 15,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
    }): Promise<PaginatedEditorResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };
      if (query) {
        query_conditions["$or"] = [
          { content: { $regex: ".*" + query + ".*", $options: "si" } },
          { programming_language: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      }

      const existing = await editorDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          updated_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await editorDbModel.countDocuments(query_conditions);

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
