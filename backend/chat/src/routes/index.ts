import express from "express";
import makeExpressCallback from "../express-callback";
import makeValidator from "../middlewares/validator-middleware";

import { createChatRules, getChatRules, updateChatRules } from "../controllers/chat/validators";
import {
  createChatController,
  getChatController,
  updateChatController,
  getChatByMatchIdController,
} from "../controllers/chat";

const chatRouter = express.Router();

chatRouter.post("/", makeValidator(createChatRules), makeExpressCallback(createChatController));
chatRouter.get("/:chat_id", makeValidator(getChatRules), makeExpressCallback(getChatController));
chatRouter.get("/match/:match_id", makeExpressCallback(getChatByMatchIdController));
chatRouter.put("/", makeValidator(updateChatRules), makeExpressCallback(updateChatController));

export default chatRouter;
