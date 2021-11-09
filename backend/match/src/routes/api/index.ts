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
import { createRatingController, getAverageRatingByReceiverIdController } from "../../controllers/api/rating";
import { createRatingRules } from "../../controllers/api/rating/validators";
import tokenValidatorMiddleware from "../../middlewares/token-validator-middleware";

const matchRouter = express.Router();

matchRouter.post("/", makeValidator(createMatchRules), makeExpressCallback(createMatchController));
matchRouter.put("/", makeValidator(updateMatchRules), makeExpressCallback(updateMatchController));

// Used in frontends
matchRouter.get("/user/:user_id", tokenValidatorMiddleware, makeExpressCallback(getMatchesByUserIdPaginatedController));
matchRouter.get(
  "/:match_id",
  tokenValidatorMiddleware,
  makeValidator(getMatchRules),
  makeExpressCallback(getMatchController),
);
matchRouter.put(
  "/end",
  tokenValidatorMiddleware,
  makeValidator(endMatchRules),
  makeExpressCallback(endMatchController),
);
matchRouter.post(
  "/rating",
  tokenValidatorMiddleware,
  makeValidator(createRatingRules),
  makeExpressCallback(createRatingController),
);
matchRouter.get(
  "/rating/:receiver_id",
  tokenValidatorMiddleware,
  makeExpressCallback(getAverageRatingByReceiverIdController),
);

export default matchRouter;
