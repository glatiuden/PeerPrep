import getQuestionController from "./get-question";
import getQuestionsPaginatedController from "./get-questions-paginated";
import getQuestionTopicsController from "./get-question-topics";

const questionController = Object.freeze({
  getQuestionController,
  getQuestionsPaginatedController,
  getQuestionTopicsController,
});

export default questionController;

export { getQuestionController, getQuestionsPaginatedController, getQuestionTopicsController };
