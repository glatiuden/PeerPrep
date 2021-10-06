import express from "express";
import makeExpressCallback from "../express-callback";
import makeValidator from "../middlewares/validator-middleware";

import { createChatRules, deleteChatRules, getChatRules, updateChatRules } from "../controllers/chat/validators";
import {
  createChatController,
  deleteChatController,
  getChatController,
  getChatsController,
  hardDeleteChatController,
  updateChatController,
} from "../controllers/chat";

const chatRouter = express.Router();

chatRouter.post("/", makeValidator(createChatRules), makeExpressCallback(createChatController));
chatRouter.get("/", makeExpressCallback(getChatsController));
chatRouter.get("/:chat_id", makeValidator(getChatRules), makeExpressCallback(getChatController));
chatRouter.put("/", makeValidator(updateChatRules), makeExpressCallback(updateChatController));
chatRouter.delete("/:chat_id", makeValidator(deleteChatRules), makeExpressCallback(deleteChatController));
chatRouter.delete(
  "/hard-delete/:chat_id",
  makeValidator(deleteChatRules),
  makeExpressCallback(hardDeleteChatController),
);

export default chatRouter;
