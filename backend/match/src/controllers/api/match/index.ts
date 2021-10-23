import createMatchController from "./create-match";
import getMatchesByUserIdController from "./get-matches-by-user-id";
import getMatchController from "./get-match";
import updateMatchController from "./update-match";

const matchController = Object.freeze({
  createMatchController,
  getMatchesByUserIdController,
  getMatchController,
  updateMatchController,
});

export default matchController;

export { createMatchController, getMatchesByUserIdController, getMatchController, updateMatchController };
