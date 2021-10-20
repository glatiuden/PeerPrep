import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { createMatchRules, getMatchRules, updateMatchRules } from "../../controllers/match/validators";
import { createMatchController, getMatchController, updateMatchController } from "../../controllers/match";

const matchRouter = express.Router();

// TODO: Get matches by User ID
matchRouter.post("/", makeValidator(createMatchRules), makeExpressCallback(createMatchController));
matchRouter.get("/:match_id", makeValidator(getMatchRules), makeExpressCallback(getMatchController));
matchRouter.put("/", makeValidator(updateMatchRules), makeExpressCallback(updateMatchController));

export default matchRouter;
