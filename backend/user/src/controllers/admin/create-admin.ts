import _ from "lodash";
import bcrypt from "bcrypt";

import IUser from "../../models/interfaces/user";
import { userService } from "../../services";

/**
 * @description Create new user record in database
 * @function createUserController
 */
async function createAdminController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: IUser = _.get(httpRequest, "context.validated");
    userDetails.password_hash = await bcrypt.hash(userDetails.password, 1);
    const created_user = await userService.insertAdmin(userDetails);
    if (!created_user) {
      throw new Error(`User was not created.`);
    }
    return {
      headers,
      statusCode: 200,
      body: {
        data: created_user,
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

export default createAdminController;
