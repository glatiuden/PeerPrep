import _ from "lodash";

import { chatService } from "../../services";

/**
 * @description Get chat by ID
 * @function getChatController
 */
async function getChatController(httpRequest: Request & { context: { validated: { chat_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { chat_id }: { chat_id: string } = _.get(httpRequest, "context.validated");
    const chat = await chatService.findById({ id: chat_id });
    if (!chat) {
      throw new Error(`Chat by ${chat_id} does not exists.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: chat,
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

export default getChatController;
