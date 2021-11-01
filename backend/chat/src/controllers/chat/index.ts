import { logger } from "../../configs/logs";

import {
  createChat,
  getChatById,
  getChatByMatchId,
  getChats,
  updateChat,
  deleteChatById,
  hardDeleteChatById,
} from "../../use-cases/chat";

import makeCreateChatController from "./create-chat";
import makeGetChatController from "./get-chat";
import makeGetChatByMatchIdController from "./get-chat-by-match-id";
import makeGetChats from "./get-chats";
import makeUpdateChatController from "./update-chat";
import makeDeleteChatController from "./delete-chat";
import makeHardDeleteChatController from "./hard-delete-chat";

/**
 * @description Create new chat
 * @function createChatController
 */
const createChatController = makeCreateChatController({ createChat, logger });

/**
 * @description Get chat by ID
 * @function getChatController
 */
const getChatController = makeGetChatController({ getChatById, logger });

/**
 * @description Get chat by Match ID
 * @function getChatByMatchIdController
 */
const getChatByMatchIdController = makeGetChatByMatchIdController({ getChatByMatchId, logger });

/**
 * @description Get all chats
 * @function getChatsController
 */
const getChatsController = makeGetChats({ getChats, logger });

/**
 * @description Update chat's details
 * @function updateChatController
 */
const updateChatController = makeUpdateChatController({ updateChat, logger });

/**
 * @description Soft delete a chat
 * @function deleteChatController
 */
const deleteChatController = makeDeleteChatController({ deleteChatById, logger });

/**
 * @description Hard delete a chat
 * @function hardDeleteChatController
 */
const hardDeleteChatController = makeHardDeleteChatController({ hardDeleteChatById, logger });

const chatController = Object.freeze({
  createChatController,
  getChatController,
  getChatByMatchIdController,
  deleteChatController,
  updateChatController,
  getChatsController,
  hardDeleteChatController,
});

export default chatController;
export {
  createChatController,
  getChatController,
  getChatByMatchIdController,
  deleteChatController,
  updateChatController,
  getChatsController,
  hardDeleteChatController,
};
