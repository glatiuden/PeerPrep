import getQuestionController from "./get-question";
import getQuestionsPaginatedController from "./get-questions-paginated";
import getQuestionTopicsController from "./get-question-topics";
import resetQuestionsController from "./reset-questions";

const questionController = Object.freeze({
  getQuestionController,
  getQuestionsPaginatedController,
  getQuestionTopicsController,
  resetQuestionsController
});

export default questionController;

export {
  getQuestionController,
  getQuestionsPaginatedController,
  getQuestionTopicsController,
  resetQuestionsController
};
