import Editor from "../../entities/editor";
import IEditor from "../../entities/interfaces/editor";
import IEditorDb from "../../data-access/interfaces/editor-db";

interface ICreateEditorData {
  editorDetails: Partial<IEditor>;
}

export type ICreateEditor = ({ editorDetails }: ICreateEditorData) => Promise<Editor | null>;

export default function makeCreateEditor({ editorDb }: { editorDb: IEditorDb }): ICreateEditor {
  return async function createEditor({ editorDetails }: ICreateEditorData): Promise<Editor | null> {
    const created_editor = await editorDb.insert(editorDetails);
    return created_editor;
  };
}
