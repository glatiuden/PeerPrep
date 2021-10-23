import mongoose from "mongoose";
import userSchema from "./schemas/user";
import accessTokenSchema from "./schemas/access-token";
import IUser from "./interfaces/user";
import IAccessToken from "./interfaces/access-token";

const userDbModel = mongoose.model<IUser & mongoose.Document>("User", userSchema);
const accessTokenDbModel = mongoose.model<IAccessToken & mongoose.Document>("AccessToken", accessTokenSchema);

export default Object.freeze({ userDbModel, accessTokenDbModel });
export { userDbModel, accessTokenDbModel };
