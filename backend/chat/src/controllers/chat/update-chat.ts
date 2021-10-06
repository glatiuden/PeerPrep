import _ from "lodash";

import IChat from "../../models/interfaces/chat";

import { chatService } from "../../services";

/**
 * @description Update existing chat record in database
 * @function updateChatController
 */
async function updateChatController(httpRequest: Request & { context: { validated: Partial<IChat> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const chatDetails: IChat = _.get(httpRequest, "context.validated");
    const updated_chat = await chatService.update(chatDetails);
    if (!updated_chat) {
      throw new Error(`Chat was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: updated_chat,
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

export default updateChatController;
