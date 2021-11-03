import _ from "lodash";

import { ratingService } from "../../../services";

/**
 * @description Get average rating of receiver
 * @function getAverageRatingByReceiverIdController
 */
async function getAverageRatingByReceiverIdController(
  httpRequest: Request & { context: { validated: { receiver_id: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { receiver_id }: { receiver_id: string } = _.get(httpRequest, "context.validated");

    const rating_details = await ratingService.findAverageRatingByReceiverId({ receiver_id });
    return {
      headers,
      statusCode: 200,
      body: {
        data: rating_details,
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

export default getAverageRatingByReceiverIdController;
