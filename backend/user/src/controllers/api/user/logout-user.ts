import _ from "lodash";
import { accessTokenService } from "../../../services";

/**
 * @description Logout user by destroying their token
 * @function logoutUserController
 */
async function logoutUserController(httpRequest: { context: { validated: { email: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { user_id } = _.get(httpRequest, "context.validated");
    const is_logout = await accessTokenService.revoke({ user_id, user_role: "user" });

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
        errors: err.message,
      },
    };
  }
}

export default logoutUserController;
