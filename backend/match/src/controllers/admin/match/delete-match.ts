import _ from "lodash";

import { matchService } from "../../../services";

/**
 * @description Delete existing match record in database by ID
 * @function deleteMatchController
 */
async function deleteMatchController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
    const deleted_match = await matchService.delete({ id: match_id });
    if (!deleted_match) {
      throw new Error(`Match by ${match_id} is unable to delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: deleted_match,
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

export default deleteMatchController;
