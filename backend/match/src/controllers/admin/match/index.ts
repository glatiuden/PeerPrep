import getMatchesController from "./get-matches";
import getMatchController from "./get-match";
import deleteMatchController from "./delete-match";
import hardDeleteMatchController from "./hard-delete-match";
import getMatchesPaginatedController from "./get-matches-paginated";

const matchController = Object.freeze({
  getMatchesController,
  getMatchController,
  deleteMatchController,
  hardDeleteMatchController,
  getMatchesPaginatedController,
});

export default matchController;

export {
  getMatchesController,
  getMatchController,
  deleteMatchController,
  hardDeleteMatchController,
  getMatchesPaginatedController,
};
