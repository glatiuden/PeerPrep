import createMatchController from "./create-match";
import getMatchesController from "./get-matches";
import getMatchController from "./get-match";
import updateMatchController from "./update-match";
import deleteMatchController from "./delete-match";
import hardDeleteMatchController from "./hard-delete-match";

const matchController = Object.freeze({
  createMatchController,
  getMatchesController,
  getMatchController,
  updateMatchController,
  deleteMatchController,
  hardDeleteMatchController,
});

export default matchController;

export {
  createMatchController,
  getMatchesController,
  getMatchController,
  updateMatchController,
  deleteMatchController,
  hardDeleteMatchController,
};
