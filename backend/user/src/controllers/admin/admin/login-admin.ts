import _ from "lodash";
import { verifyPassword } from "../../../configs/bcrypt";
import { generateJWTToken } from "../../../configs/jwt";
import { logger } from "../../../configs/logs";

import IUser, { UserRole } from "../../../models/interfaces/user";
import { userService, accessTokenService } from "../../../services";

/**
 * @description Check admin's email and password and return login message if successful
 * @function loginAdminController
 */
async function loginAdminController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { email, password }: { email: string; password: string } = _.get(httpRequest, "context.validated");
    const admin_exists = await userService.findByEmail({
      email,
      role: UserRole.ADMIN,
    });

    if (!admin_exists) {
      throw new Error(`Admin does not exist.`);
    }

    const is_valid_password = await verifyPassword({
      password: password,
      hash_password: admin_exists.password_hash,
    });
    if (!is_valid_password) {
      throw new Error(`Incorrect password`);
    }

    let login_token = await accessTokenService.findValidToken({
      user_id: admin_exists._id,
      user_role: admin_exists.role,
    });

    if (!login_token) {
      logger.verbose(`User has no valid token, creating one now...`);
      login_token = generateJWTToken({ user_id: admin_exists._id, user_role: admin_exists.role }, { expiresIn: "1y" });
      await accessTokenService.insert({
        user_id: admin_exists._id,
        user_role: admin_exists.role,
        token: login_token,
      });
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: admin_exists,
        login_token,
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
