import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { getMatchRules, deleteMatchRules } from "../../controllers/admin/match/validators";
import { getMatchController, deleteMatchController, hardDeleteMatchController } from "../../controllers/admin/match";

const matchRouter = express.Router();

// TODO: Get matches by User ID
matchRouter.get("/:match_id", makeValidator(getMatchRules), makeExpressCallback(getMatchController));
matchRouter.delete("/:match_id", makeValidator(deleteMatchRules), makeExpressCallback(deleteMatchController));
matchRouter.delete(
  "/hard-delete/:match_id",
  makeValidator(deleteMatchRules),
  makeExpressCallback(hardDeleteMatchController),
);

export default matchRouter;
