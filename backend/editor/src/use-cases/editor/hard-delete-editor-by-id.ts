import IEditorDb from "../../data-access/interfaces/editor-db";

export type IHardDeleteEditorById = ({ id }: { id: string }) => Promise<boolean>;

export default function makeHardDeleteEditorById({ editorDb }: { editorDb: IEditorDb }): IHardDeleteEditorById {
  return async function hardDeleteEditorById({ id }: { id: string }): Promise<boolean> {
    const existing = await editorDb.findById({ id });
    if (!existing) {
      throw new RangeError(`Editor ${id} not found.`);
    }

    const deleted_editor = await editorDb.hardDelete({ id });
    return deleted_editor;
  };
}
