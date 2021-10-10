import express from "express";
import makeExpressCallback from "../express-callback";
import makeValidator from "../middlewares/validator-middleware";

import {
  createMatchRules,
  deleteMatchRules,
  getMatchRules,
  updateMatchRules,
} from "../controllers/match/validators";
import {
  createMatchController,
  deleteMatchController,
  getMatchController,
  getMatchesController,
  hardDeleteMatchController,
  updateMatchController,
} from "../controllers/match";

const matchRouter = express.Router();

matchRouter.post("/", makeValidator(createMatchRules), makeExpressCallback(createMatchController));
matchRouter.get("/", makeExpressCallback(getMatchesController));
matchRouter.get("/:match_id", makeValidator(getMatchRules), makeExpressCallback(getMatchController));
matchRouter.put("/", makeValidator(updateMatchRules), makeExpressCallback(updateMatchController));
matchRouter.delete("/:match_id", makeValidator(deleteMatchRules), makeExpressCallback(deleteMatchController));
matchRouter.delete(
  "/hard-delete/:match_id",
  makeValidator(deleteMatchRules),
  makeExpressCallback(hardDeleteMatchController),
);

export default matchRouter;
