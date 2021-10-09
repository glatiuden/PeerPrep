import _ from "lodash";
import bcrypt from "bcrypt"

import IUser from "../models/interfaces/user";
import { userService } from "../services";

/**
 * @description Check user's email and password and return login message if successful
 * @function loginUserController
 */
async function loginUserController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: IUser = _.get(httpRequest, "context.validated");
    const user = await userService.findByEmail({ email: userDetails.email });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    const valid = await bcrypt.compare(userDetails.password, user.password_hash);

    if (!valid) {
      throw new Error(`Incorrect password`)
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: `Sucessfully logged in as user ${user.display_name}`,
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

export default loginUserController;
