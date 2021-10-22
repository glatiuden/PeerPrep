import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import {
  createQuestionRules,
  deleteQuestionRules,
  getQuestionRules,
  updateQuestionRules,
} from "../../controllers/admin/question/validators";
import {
  createQuestionController,
  deleteQuestionController,
  getQuestionController,
  getQuestionsController,
  hardDeleteQuestionController,
  updateQuestionController,
} from "../../controllers/admin/question";

const questionRouter = express.Router();

questionRouter.post("/", makeValidator(createQuestionRules), makeExpressCallback(createQuestionController));
questionRouter.get("/", makeExpressCallback(getQuestionsController));
questionRouter.get("/:question_id", makeValidator(getQuestionRules), makeExpressCallback(getQuestionController));
questionRouter.put("/", makeValidator(updateQuestionRules), makeExpressCallback(updateQuestionController));
questionRouter.delete(
  "/:question_id",
  makeValidator(deleteQuestionRules),
  makeExpressCallback(deleteQuestionController),
);
questionRouter.delete(
  "/hard-delete/:question_id",
  makeValidator(deleteQuestionRules),
  makeExpressCallback(hardDeleteQuestionController),
);

export default questionRouter;
