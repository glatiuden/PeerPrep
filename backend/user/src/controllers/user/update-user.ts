import _ from "lodash";

import IUser from "../../models/interfaces/user";
import { userService } from "../../services";

/**
 * @description Update existing user record in database
 * @function updateUserController
 */
async function updateUserController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: IUser = _.get(httpRequest, "context.validated");
    const updated_user = await userService.update(userDetails);
    if (!updated_user) {
      throw new Error(`Chat was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: updated_user,
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}

export default updateUserController;
