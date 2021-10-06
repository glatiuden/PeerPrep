import makeChatService from "./chat";
import { chatDbModel } from "../models";

const chatService = makeChatService({ chatDbModel });

export default Object.freeze({ chatService });

export { chatService };
