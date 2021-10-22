import _ from "lodash";

import { userService } from "../../../services";

/**
 * @description Delete all users in the database
 * @function resetUsersController
 */
async function resetUsersController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const deleted_user = await userService.reset();
    if (!deleted_user) {
      throw new Error(`Unable to delete all users.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: "All users have been deleted from the database",
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

export default resetUsersController;
