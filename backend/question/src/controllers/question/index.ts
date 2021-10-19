import createQuestionController from "./create-question";
import getQuestionsController from "./get-questions";
import getQuestionController from "./get-question";
import updateQuestionController from "./update-question";
import deleteQuestionController from "./delete-question";
import hardDeleteQuestionController from "./hard-delete-question";
import getQuestionsPaginatedController from "./get-questions-paginated";
import getQuestionTopicsController from "./get-question-topics";

const questionController = Object.freeze({
  createQuestionController,
  getQuestionsController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
  hardDeleteQuestionController,
  getQuestionsPaginatedController,
  getQuestionTopicsController,
});

export default questionController;

export {
  createQuestionController,
  getQuestionsController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
  hardDeleteQuestionController,
  getQuestionsPaginatedController,
  getQuestionTopicsController,
};
