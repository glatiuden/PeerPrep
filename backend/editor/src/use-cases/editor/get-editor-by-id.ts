import Editor from "../../entities/editor";
import IEditorDb from "../../data-access/interfaces/editor-db";

export type IGetEditorById = ({ id }: { id: string }) => Promise<Editor | null>;

export default function makeGetEditorById({ editorDb }: { editorDb: IEditorDb }): IGetEditorById {
  return async function getEditorById({ id }: { id: string }): Promise<Editor | null> {
    const editor = await editorDb.findById({ id });
    return editor;
  };
}
