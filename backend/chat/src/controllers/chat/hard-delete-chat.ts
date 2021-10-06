import _ from "lodash";

import { chatService } from "../../services";

/**
 * @description Hard delete existing chat record in database by ID
 * @function hardDeleteChatController
 */
async function hardDeleteChatController(httpRequest: Request & { context: { validated: { chat_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { chat_id }: { chat_id: string } = _.get(httpRequest, "context.validated");
    const is_deleted = await chatService.hardDelete({ id: chat_id });
    if (!is_deleted) {
      throw new Error(`Chat by ${chat_id} is unable to hard delete.`);
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

export default hardDeleteChatController;
