import mongoose from "mongoose";
import chatSchema from "../schemas/chat";
import IChat from "../../entities/interfaces/chat";

const chatDbModel = mongoose.model<IChat & mongoose.Document>("Chat", chatSchema);

export default Object.freeze({ chatDbModel });
export { chatDbModel };
