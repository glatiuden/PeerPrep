import makeEditorDb from "./editor";
import { EditorDbModel } from "../models";

const editorDb = makeEditorDb({ editorDbModel: EditorDbModel });

export default Object.freeze({ editorDb });

export { editorDb };
