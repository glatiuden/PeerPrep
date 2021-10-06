import _ from "lodash";

import { chatService } from "../../services";

/**
 * @description Delete existing chat record in database by ID
 * @function deleteChatController
 */
async function deleteChatController(httpRequest: Request & { context: { validated: { chat_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { chat_id }: { chat_id: string } = _.get(httpRequest, "context.validated");
    const deleted_chat = await chatService.delete({ id: chat_id });
    if (!deleted_chat) {
      throw new Error(`Chat by ${chat_id} is unable to delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: deleted_chat,
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

export default deleteChatController;
