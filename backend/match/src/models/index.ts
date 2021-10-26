import mongoose from "mongoose";

import matchSchema from "./schemas/match";
import eloMatchPoolSchema from "./schemas/elo-match-pool";

import IMatch from "./interfaces/match";
import IEloMatchPool from "./interfaces/elo-match-pool";

const matchDbModel = mongoose.model<IMatch & mongoose.Document>("Match", matchSchema);
const eloMatchPoolDbModel = mongoose.model<IEloMatchPool & mongoose.Document>("EloMatchPool", eloMatchPoolSchema);

export default Object.freeze({ matchDbModel, eloMatchPoolDbModel });
export { matchDbModel, eloMatchPoolDbModel };
