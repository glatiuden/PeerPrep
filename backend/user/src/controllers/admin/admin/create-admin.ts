import _ from "lodash";
import { hashPassword } from "../../../configs/bcrypt";

import IUser, { UserRole } from "../../../models/interfaces/user";
import { userService } from "../../../services";

/**
 * @description Create new user record in database
 * @function createUserController
 */
async function createAdminController(httpRequest: Request & { context: { validated: Partial<IUser> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const adminDetails: Omit<IUser, "_id"> & { password: string } = _.get(httpRequest, "context.validated");
    const admin_exist = await userService.findByEmail({
      email: adminDetails.email,
      role: UserRole.ADMIN,
    });

    if (admin_exist) {
      throw Error("Admin already existed. Please login instead.");
    }

    const password_hash = await hashPassword({
      password: adminDetails.password,
    });

    Object.assign(adminDetails, {
      password_hash,
      role: UserRole.ADMIN,
    });

    const created_admin = await userService.insertUser(adminDetails);
    if (!created_admin) {
      throw new Error(`Admin was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_admin,
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
