import getMatchesController from "./get-matches";
import getMatchController from "./get-match";
import deleteMatchController from "./delete-match";
import hardDeleteMatchController from "./hard-delete-match";
import getMatchesPaginatedController from "./get-matches-paginated";
import updateMatchController from "./update-match";

const matchController = Object.freeze({
  getMatchesController,
  getMatchController,
  deleteMatchController,
  hardDeleteMatchController,
  getMatchesPaginatedController,
  updateMatchController,
});

export default matchController;

export {
  getMatchesController,
  getMatchController,
  deleteMatchController,
  hardDeleteMatchController,
  getMatchesPaginatedController,
  updateMatchController,
};
