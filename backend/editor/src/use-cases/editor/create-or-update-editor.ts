import Editor from "../../entities/editor";
import { IGetEditorByMatchId } from "./get-editor-by-match-id";
import { ICreateEditor } from "./create-editor";
import { IUpdateEditor } from "./update-editor";

interface ICreateOrUpdateEditorData {
  match_id: string;
  content: string;
}

export type ICreateOrUpdateEditor = ({ match_id, content }: ICreateOrUpdateEditorData) => Promise<Editor | null>;

export default function makeCreateOrUpdateEditor({
  getEditorByMatchId,
  createEditor,
  updateEditor,
}: {
  getEditorByMatchId: IGetEditorByMatchId;
  createEditor: ICreateEditor;
  updateEditor: IUpdateEditor;
}): ICreateOrUpdateEditor {
  return async function createOrUpdateEditor({ match_id, content }: ICreateOrUpdateEditorData): Promise<Editor | null> {
    const existing_editor = await getEditorByMatchId({ match_id });
    if (existing_editor) {
      const editor_to_be_updated = Object.assign({}, existing_editor, {
        content,
      });
      return await updateEditor({ editorDetails: editor_to_be_updated });
    }
    const created_editor = await createEditor({ editorDetails: { match_id, content } });
    return created_editor;
  };
}
