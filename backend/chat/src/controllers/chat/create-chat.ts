import _ from "lodash";

import IChat from "../../models/interfaces/chat";
import { chatService } from "../../services";

/**
 * @description Create new chat record in database
 * @function createChatController
 */
async function createChatController(httpRequest: Request & { context: { validated: Partial<IChat> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const chatDetails: IChat = _.get(httpRequest, "context.validated");
    const created_chat = await chatService.insert(chatDetails);
    if (!created_chat) {
      throw new Error(`Chat was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_chat,
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

export default createChatController;
