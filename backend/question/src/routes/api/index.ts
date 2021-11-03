import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { getQuestionRules } from "../../controllers/api/question/validators";
import {
  getQuestionController,
  getQuestionsPaginatedController,
  getQuestionTopicsController,
  resetQuestionsController,
  getFeaturedQuestionTopicsController,
} from "../../controllers/api/question";

const questionRouter = express.Router();

questionRouter.get("/", makeExpressCallback(getQuestionsPaginatedController));
questionRouter.get("/topic", makeExpressCallback(getQuestionTopicsController));
questionRouter.get("/featured", makeExpressCallback(getFeaturedQuestionTopicsController));
questionRouter.get("/:question_id", makeValidator(getQuestionRules), makeExpressCallback(getQuestionController));
questionRouter.delete("/reset", makeExpressCallback(resetQuestionsController));

export default questionRouter;
