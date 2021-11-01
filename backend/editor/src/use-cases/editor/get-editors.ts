import IEditorDb from "../../data-access/interfaces/editor-db";
import Editor from "../../entities/editor";

export type IGetEditors = () => Promise<Editor[]>;

export default function makeGetEditors({ editorDb }: { editorDb: IEditorDb }): IGetEditors {
  return async function getEditors(): Promise<Editor[]> {
    const editors = await editorDb.findAll();
    return editors;
  };
}
