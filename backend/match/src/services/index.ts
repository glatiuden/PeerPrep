import makeEditorService from "./match";
import { matchDbModel } from "../models";

const matchService = makeEditorService({ matchDbModel });

export default Object.freeze({ matchService });

export { matchService };
