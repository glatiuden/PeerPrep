import makeQuestionService from "./question";
import { questionDbModel } from "../models";

const questionService = makeQuestionService({ questionDbModel });

export default Object.freeze({ questionService });

export { questionService };
