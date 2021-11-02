import createQuestionController from "./create-question";
import getQuestionsController from "./get-questions";
import getQuestionController from "./get-question";
import updateQuestionController from "./update-question";
import deleteQuestionController from "./delete-question";
import hardDeleteQuestionController from "./hard-delete-question";
import resetQuestionsController from "./reset-questions";
import getQuestionsPaginatedController from "./get-questions-paginated";

const questionController = Object.freeze({
  createQuestionController,
  getQuestionsController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
  hardDeleteQuestionController,
  resetQuestionsController,
  getQuestionsPaginatedController,
});

export default questionController;

export {
  createQuestionController,
  getQuestionsController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
  hardDeleteQuestionController,
  resetQuestionsController,
  getQuestionsPaginatedController,
};
