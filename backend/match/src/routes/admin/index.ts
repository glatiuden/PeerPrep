import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { getMatchRules, deleteMatchRules, updateMatchRules } from "../../controllers/admin/match/validators";
import {
  getMatchController,
  deleteMatchController,
  hardDeleteMatchController,
  getMatchesController,
  getMatchesPaginatedController,
  updateMatchController,
} from "../../controllers/admin/match";

const matchRouter = express.Router();

matchRouter.get("/", makeExpressCallback(getMatchesController));
matchRouter.get("/paginated", makeExpressCallback(getMatchesPaginatedController));
matchRouter.get("/:match_id", makeValidator(getMatchRules), makeExpressCallback(getMatchController));
matchRouter.delete("/:match_id", makeValidator(deleteMatchRules), makeExpressCallback(deleteMatchController));
matchRouter.delete(
  "/hard-delete/:match_id",
  makeValidator(deleteMatchRules),
  makeExpressCallback(hardDeleteMatchController),
);
matchRouter.put("/", makeValidator(updateMatchRules), makeExpressCallback(updateMatchController));

export default matchRouter;
