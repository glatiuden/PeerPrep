import mongoose from "mongoose";
import questionSchema from "./schemas/question";
import IQuestion from "./interfaces/question";

const questionDbModel = mongoose.model<IQuestion & mongoose.Document>("Question", questionSchema);

export default Object.freeze({ questionDbModel });
export { questionDbModel };
