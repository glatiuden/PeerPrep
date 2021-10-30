import _ from "lodash";

import { userService } from "../../../services";

/**
 * @description Get user by ID
 * @function getAdminController
 */
async function getAdminController(httpRequest: Request & { context: { validated: { user_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { user_id }: { user_id: string } = _.get(httpRequest, "context.validated");
    const user = await userService.findById({ id: user_id });
    if (!user) {
      throw new Error(`Admin with ${user_id} does not exist.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: _.omit(user, "password_hash"),
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        message: `Unable to get information on admin with id ${httpRequest.context.validated.user_id}`,
        errors: err.message,
      },
    };
  }
}

export default getAdminController;
