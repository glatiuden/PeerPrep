import createMatchController from "./create-match";
import getMatchesByUserIdPaginatedController from "./get-matches-by-user-id-paginated";
import getMatchController from "./get-match";
import updateMatchController from "./update-match";
import endMatchController from "./end-match";

const matchController = Object.freeze({
  createMatchController,
  getMatchesByUserIdPaginatedController,
  getMatchController,
  updateMatchController,
  endMatchController,
});

export default matchController;

export {
  createMatchController,
  getMatchesByUserIdPaginatedController,
  getMatchController,
  updateMatchController,
  endMatchController,
};
