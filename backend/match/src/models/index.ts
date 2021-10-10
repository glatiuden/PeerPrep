import mongoose from "mongoose";
import matchSchema from "./schemas/match";
import IMatch from "./interfaces/match";

const matchDbModel = mongoose.model<IMatch & mongoose.Document>("Match", matchSchema);

export default Object.freeze({ matchDbModel });
export { matchDbModel };
