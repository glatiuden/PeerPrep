import { userDbModel } from "../models";
import makeUserService from "./user";

const userService = makeUserService({ userDbModel });

export default Object.freeze({ userService });

export { userService };