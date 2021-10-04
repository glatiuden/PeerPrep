import makeEditorService from "./editor";
import { editorDbModel } from "../models";

const editorService = makeEditorService({ editorDbModel });

export default Object.freeze({ editorService });

export { editorService };
