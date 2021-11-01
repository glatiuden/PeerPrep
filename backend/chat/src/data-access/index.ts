import makeChatDb from "./make-chat-db";
import { chatDbModel } from "./models";

const ChatDb = makeChatDb({ chatDbModel });

export default Object.freeze({ ChatDb });
export { ChatDb };
