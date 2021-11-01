import Editor from "../../entities/editor";
import IEditorDb from "../../data-access/interfaces/editor-db";

export type IGetEditorByMatchId = ({ match_id }: { match_id: string }) => Promise<Editor | null>;

export default function makeGetEditorById({ editorDb }: { editorDb: IEditorDb }): IGetEditorByMatchId {
  return async function getEditorById({ match_id }: { match_id: string }): Promise<Editor | null> {
    const editor = await editorDb.findByMatchId({ match_id });
    return editor;
  };
}
