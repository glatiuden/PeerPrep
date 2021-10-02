import makeEditorDb from "./editor";
import { EditorDbModel } from "../models";

const EditorDb = makeEditorDb({ editorDbModel: EditorDbModel });

export default Object.freeze({ EditorDb });

export { EditorDb };
