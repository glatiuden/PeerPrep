import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { createMatchRules, updateMatchRules, getMatchRules } from "../../controllers/api/match/validators";
import {
  createMatchController,
  getMatchController,
  updateMatchController,
  getMatchesByUserIdController,
} from "../../controllers/api/match";

const matchRouter = express.Router();

matchRouter.post("/", makeValidator(createMatchRules), makeExpressCallback(createMatchController));
matchRouter.get("/:user_id", makeExpressCallback(getMatchesByUserIdController));
matchRouter.get("/:match_id", makeValidator(getMatchRules), makeExpressCallback(getMatchController));
matchRouter.put("/", makeValidator(updateMatchRules), makeExpressCallback(updateMatchController));

export default matchRouter;
