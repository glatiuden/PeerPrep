import Editor from "../../entities/editor";
import IEditorDb from "../../data-access/interfaces/editor-db";
import IEditor from "../../entities/interfaces/editor";

export type IUpdateEditor = ({
  editorDetails,
}: {
  editorDetails: Partial<IEditor> & { _id: string };
}) => Promise<Editor | null>;

export default function makeUpdateEditor({ editorDb }: { editorDb: IEditorDb }): IUpdateEditor {
  return async function updateEditor({
    editorDetails,
  }: {
    editorDetails: Partial<IEditor> & { _id: string };
  }): Promise<Editor | null> {
    const { _id: editor_id } = editorDetails;
    const existing = await editorDb.findById({ id: editor_id });
    if (!existing) {
      throw new RangeError(`Editor ${editor_id} not found.`);
    }

    const editor = new Editor(Object.assign({}, existing, editorDetails, { updated_at: new Date() }));
    const updated_editor = await editorDb.update(editor);

    return updated_editor;
  };
}
