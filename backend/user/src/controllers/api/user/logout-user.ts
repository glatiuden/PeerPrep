import _ from "lodash";
import IUser from "../../../models/interfaces/user";
import { userService, accessTokenService } from "../../../services";

/**
 * @description Logout user by destroying their token
 * @function logoutUserController
 */
async function logoutUserController(httpRequest: { context: { validated: { email: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { email }: IUser = _.get(httpRequest, "context.user");
    const user_exists = await userService.findByEmail({ email });

    if (!user_exists) {
      throw new Error(`User by ${email} does not exists.`);
    }

    const is_logout = await accessTokenService.revoke({ user_id: user_exists._id, user_role: "user" });

    return {
      headers,
      statusCode: 200,
      body: {
        data: is_logout,
      },
    };
  } catch (err: any) {
    // TODO: add in error handling here
    throw {
      headers,
      statusCode: 404,
      body: {
        error: err.message,
      },
    };
  }
}

export default logoutUserController;
