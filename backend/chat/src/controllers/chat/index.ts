import createChatController from "./create-chat";
import getChatsController from "./get-chats";
import getChatController from "./get-chat";
import updateChatController from "./update-chat";
import deleteChatController from "./delete-chat";
import hardDeleteChatController from "./hard-delete-chat";
import getChatByMatchIdController from "./get-chat-by-match-id";

const chatController = Object.freeze({
  createChatController,
  getChatsController,
  getChatController,
  updateChatController,
  deleteChatController,
  hardDeleteChatController,
  getChatByMatchIdController,
});

export default chatController;

export {
  createChatController,
  getChatsController,
  getChatController,
  updateChatController,
  deleteChatController,
  hardDeleteChatController,
  getChatByMatchIdController,
};
