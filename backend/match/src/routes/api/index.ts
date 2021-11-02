import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import {
  createMatchRules,
  updateMatchRules,
  getMatchRules,
  endMatchRules,
} from "../../controllers/api/match/validators";
import {
  createMatchController,
  getMatchController,
  updateMatchController,
  getMatchesByUserIdPaginatedController,
  endMatchController,
} from "../../controllers/api/match";
import { createRatingController } from "../../controllers/api/rating";
import { createRatingRules } from "../../controllers/api/rating/validators";

const matchRouter = express.Router();

matchRouter.post("/", makeValidator(createMatchRules), makeExpressCallback(createMatchController));
matchRouter.get("/user/:user_id", makeExpressCallback(getMatchesByUserIdPaginatedController));
matchRouter.get("/:match_id", makeValidator(getMatchRules), makeExpressCallback(getMatchController));
matchRouter.put("/end", makeValidator(endMatchRules), makeExpressCallback(endMatchController));
matchRouter.put("/", makeValidator(updateMatchRules), makeExpressCallback(updateMatchController));
matchRouter.post("/rating", makeValidator(createRatingRules), makeExpressCallback(createRatingController));

export default matchRouter;
