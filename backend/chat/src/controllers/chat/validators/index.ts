import getChatRules from "./get-chat";
import updateChatRules from "./update-chat";
import createChatRules from "./create-chat";
import deleteChatRules from "./delete-chat";

export default Object.freeze({
  getChatRules,
  createChatRules,
  updateChatRules,
  deleteChatRules,
});

export { getChatRules, createChatRules, updateChatRules, deleteChatRules };
