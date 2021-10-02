import mongoose from "mongoose";
import editorSchema from "./schemas/editor";
import IEditor from "./interfaces/editor";

const EditorDbModel = mongoose.model<IEditor & mongoose.Document>("Editor", editorSchema);

export default Object.freeze({ EditorDbModel });
export { EditorDbModel };
