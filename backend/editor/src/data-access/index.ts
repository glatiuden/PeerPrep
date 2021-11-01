import makeEditorDb from "./make-editor-db";
import { editorDbModel } from "./models";

const EditorDb = makeEditorDb({ editorDbModel });

export default Object.freeze({ EditorDb });
export { EditorDb };
