import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import IUser, { UserRole } from "../../models/interfaces/user";
import { userService } from "../../services";

/**
 * @description Check admin's email and password and return login message if successful
 * @function loginAdminController
 */
async function loginAdminController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: IUser = _.get(httpRequest, "context.validated");
    const user = await userService.findByEmail({ email: userDetails.email }, { role: UserRole.ADMIN });

    if (!user) {
      throw new Error(`Admin does not exist`);
    }

    const valid = await bcrypt.compare(userDetails.password, user.password_hash);

    if (!valid) {
      throw new Error(`Incorrect password`)
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "insecure-secret");
    headers["auth-token"] = token;

    return {
      headers,
      statusCode: 200,
      body: {
        data: `Sucessfully logged in as admin ${user.display_name}`,
        login_token: token,
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

export default loginAdminController;
