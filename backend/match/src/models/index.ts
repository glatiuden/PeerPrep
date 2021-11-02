import mongoose from "mongoose";

import matchSchema from "./schemas/match";
import eloMatchPoolSchema from "./schemas/elo-match-pool";
import ratingSchema from "./schemas/rating";

import IMatch from "./interfaces/match";
import IEloMatchPool from "./interfaces/elo-match-pool";
import IRating from "./interfaces/rating";

const matchDbModel = mongoose.model<IMatch & mongoose.Document>("Match", matchSchema);
const eloMatchPoolDbModel = mongoose.model<IEloMatchPool & mongoose.Document>("EloMatchPool", eloMatchPoolSchema);
const ratingDbModel = mongoose.model<IRating & mongoose.Document>("Rating", ratingSchema);

export default Object.freeze({ matchDbModel, eloMatchPoolDbModel, ratingDbModel });
export { matchDbModel, eloMatchPoolDbModel, ratingDbModel };
