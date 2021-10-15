import getMatchRules from "./get-match";
import updateMatchRules from "./update-match";
import createMatchRules from "./create-match";
import deleteMatchRules from "./delete-match";

export default Object.freeze({
  getMatchRules,
  createMatchRules,
  updateMatchRules,
  deleteMatchRules,
});

export { getMatchRules, createMatchRules, updateMatchRules, deleteMatchRules };
