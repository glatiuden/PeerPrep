import getMatchesController from "./get-matches";
import getMatchController from "./get-match";
import deleteMatchController from "./delete-match";
import hardDeleteMatchController from "./hard-delete-match";

const matchController = Object.freeze({
  getMatchesController,
  getMatchController,
  deleteMatchController,
  hardDeleteMatchController,
});

export default matchController;

export { getMatchesController, getMatchController, deleteMatchController, hardDeleteMatchController };
