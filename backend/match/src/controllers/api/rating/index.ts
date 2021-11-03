import createRatingController from "./create-rating";
import getAverageRatingByReceiverIdController from "./get-average-rating-by-receiver-id";

const ratingController = Object.freeze({
  createRatingController,
  getAverageRatingByReceiverIdController,
});

export default ratingController;

export { createRatingController, getAverageRatingByReceiverIdController };
