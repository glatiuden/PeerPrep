import _ from "lodash";
import { matchService } from "../../../services";

/**
 * @description Get all match records by user ID
 * @function getMatchesByUserIdController
 */
async function getMatchesByUserIdController(httpRequest: Request & { context: { validated: { user_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { user_id }: { user_id: string } = _.get(httpRequest, "context.validated");
    const matches = await matchService.findAllByUserId({ user_id });
    return {
      headers,
      statusCode: 200,
      body: {
        data: matches,
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

export default getMatchesByUserIdController;
