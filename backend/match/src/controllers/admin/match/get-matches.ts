import { matchService } from "../../../services";

/**
 * @description Get all match records
 * @function getMatchesController
 */
async function getMatchesController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const matches = await matchService.findAll();
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

export default getMatchesController;
