import _ from "lodash";
import IUser from "../models/interfaces/user";
import { userService } from "../services";


/**
 * @description Create new user record in database
 * @function createUserController
 */
async function createUserController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: IUser = _.get(httpRequest, "context.validated");
    const created_user = await userService.insert(userDetails);
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

export default createUserController;
