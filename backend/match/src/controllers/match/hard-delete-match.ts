import _ from "lodash";

import { matchService } from "../../services";

/**
 * @description Hard delete existing match record in database by ID
 * @function hardDeleteMatchController
 */
async function hardDeleteMatchController(  
  httpRequest: Request & { context: { validated: { match_id: string } } }
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
    const is_deleted = await matchService.hardDelete({ id: match_id });
    if (!is_deleted) {
      throw new Error(`Match by ${match_id} is unable to hard delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted,
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

export default hardDeleteMatchController;
