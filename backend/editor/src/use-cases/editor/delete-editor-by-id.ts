import Editor from "../../entities/editor";
import IEditorDb from "../../data-access/interfaces/editor-db";

export type IDeleteEditorById = ({ id }: { id: string }) => Promise<Editor | null>;

export default function makeDeleteEditorById({ editorDb }: { editorDb: IEditorDb }): IDeleteEditorById {
  return async function deleteEditorById({ id }: { id: string }): Promise<Editor | null> {
    const existing = await editorDb.findById({ id });
    if (!existing) {
      throw new RangeError(`Editor ${id} not found.`);
    }

    if (existing.deleted_at) {
      throw new Error(`Editor ${id} has already been soft-deleted.`);
    }

    const deleted_editor = await editorDb.delete({ id });
    return deleted_editor;
  };
}
