import { ChatDb } from "../../data-access";

import makeCreateChat from "./create-chat";
import makeGetChatById from "./get-chat-by-id";
import makeGetChatByMatchId from "./get-chat-by-match-id";
import makeGetChats from "./get-chats";
import makeUpdateChat from "./update-chat";
import makeDeleteChatById from "./delete-chat-by-id";
import makeHardDeleteChatById from "./hard-delete-chat-by-id";

/**
 * @description Use case to create a new chat
 * @function createChat
 */
const createChat = makeCreateChat({ chatDb: ChatDb });

/**
 * @description Use case to get chat by ID
 * @function getChatById
 */
const getChatById = makeGetChatById({ chatDb: ChatDb });

/**
 * @description Use case to get chat by Match ID
 * @function getChatByMatchId
 */
const getChatByMatchId = makeGetChatByMatchId({ chatDb: ChatDb });

/**
 * @description Use case to get all chats
 * @function getChats
 */
const getChats = makeGetChats({ chatDb: ChatDb });

/**
 * @description Use case to update chat
 * @function updateChat
 */
const updateChat = makeUpdateChat({ chatDb: ChatDb });

/**
 * @description Use case to delete chat by ID
 * @function deleteChatById
 */
const deleteChatById = makeDeleteChatById({ chatDb: ChatDb });

/**
 * @description Use case to hard delete chat by ID
 * @function hardDeleteChatById
 */
const hardDeleteChatById = makeHardDeleteChatById({ chatDb: ChatDb });

const chatServices = Object.freeze({
  createChat,
  getChatById,
  getChatByMatchId,
  getChats,
  updateChat,
  deleteChatById,
  hardDeleteChatById,
});

export default chatServices;
export { createChat, getChatById, getChatByMatchId, getChats, updateChat, deleteChatById, hardDeleteChatById };
