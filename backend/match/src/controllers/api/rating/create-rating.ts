import _ from "lodash";
import mongoose from "mongoose";
import IRating from "../../../models/interfaces/rating";

import { matchService, ratingService, userService } from "../../../services";

/**
 * @description Update rating for a given match
 * @function createRatingController
 */
async function createRatingController(httpRequest: Request & { context: { validated: Partial<IRating> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      match_id,
      rating: rating_str,
      giver_id,
    }: { match_id: string; rating: string; giver_id: string } = _.get(httpRequest, "context.validated");

    const rating = Number(rating_str);

    const match_details = await matchService.findById({ id: match_id });
    if (!match_details) {
      throw Error("Invalid match");
    }

    const { partner1_id, partner2_id } = match_details;
    let receiver_id = String(partner1_id);
    let is_partner1 = true;
    if (String(partner1_id) === giver_id) {
      is_partner1 = false;
      receiver_id = String(partner2_id);
    }

    const rating_details = {
      match_id,
      giver_id,
      receiver_id,
      rating,
    };

    const rating_obj = await ratingService.insert(rating_details, { session });
    if (!rating_obj) {
      throw Error("Rating not created");
    }

    const update_match_details = await matchService.findById({ id: match_id });
    if (!update_match_details) {
      throw Error("No such match");
    }

    if (is_partner1) {
      Object.assign(update_match_details, {
        updated_at: new Date(),
        meta: {
          ...update_match_details.meta,
          partner1_rating: rating_obj._id,
        },
      });
    } else {
      Object.assign(update_match_details, {
        updated_at: new Date(),
        meta: {
          ...update_match_details.meta,
          partner2_rating: rating_obj._id,
        },
      });
    }

    const updated_match = await matchService.update(update_match_details, { session });
    if (!updated_match) {
      throw new Error(`Failed to update rating.`);
    }

    userService.updateUserElo({ user_id: receiver_id, elo: 50 + rating * 10 });
    await session.commitTransaction();
    return {
      headers,
      statusCode: 200,
      body: {
        data: true,
      },
    };
  } catch (err: any) {
    await session.abortTransaction();
    return {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}

export default createRatingController;
