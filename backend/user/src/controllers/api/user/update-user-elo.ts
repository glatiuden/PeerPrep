import _ from "lodash";
import { logger } from "../../../configs/logs";
import IUser from "../../../models/interfaces/user";
import { userService } from "../../../services";

/**
 * @description Update user's elo in database
 * @function updateUserEloController
 */
async function updateUserEloController(
  httpRequest: Request & { context: { validated: Partial<IUser> & { password: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { user_id, elo }: { user_id: string; elo: string } = _.get(httpRequest, "context.validated");
    // Password is passed in, hash the new password and save into DB
    const current_user = await userService.findById({ id: user_id });
    if (!current_user) {
      throw new Error(`User not found.`);
    }

    const updated_user = await userService.update({
      _id: user_id,
      elo: current_user.elo + Number(elo),
    });

    if (!updated_user) {
      throw new Error(`User was not updated.`);
    }
    logger.verbose("User's elo updated", { user_id: updated_user._id });

    return {
      headers,
      statusCode: 200,
      body: {
        data: _.omit(updated_user, "password_hash"),
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

export default updateUserEloController;
