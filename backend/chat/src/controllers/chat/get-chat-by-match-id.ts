import _ from "lodash";
import { chatService } from "../../services";

/**
 * @description Get chat record by match ID
 * @function getChatByMatchIdController
 */
async function getChatByMatchIdController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
    const chats = await chatService.findByMatchId({ match_id });
    return {
      headers,
      statusCode: 200,
      body: {
        data: chats,
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

export default getChatByMatchIdController;
