import _ from "lodash";
import { Logger } from "winston";

import { IDeleteChatById } from "../../use-cases/chat/delete-chat-by-id";

export default function makeDeleteChatController({
  deleteChatById,
  logger,
}: {
  deleteChatById: IDeleteChatById;
  logger: Logger;
}) {
  return async function deleteChatController(httpRequest: Request & { context: { validated: { chat_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { chat_id }: { chat_id: string } = _.get(httpRequest, "context.validated");
      const deleted_chat = await deleteChatById({ id: chat_id });
      if (!deleted_chat) {
        throw new Error(`Chat by ${chat_id} unable to delete.`);
      }

      logger.verbose("Chat soft-deleted", { chat_id });
      return {
        headers,
        statusCode: 200,
        body: {
          is_deleted: true,
          data: deleted_chat,
        },
      };
    } catch (err: any) {
      logger.error(err.message);
      return {
        headers,
        statusCode: 404,
        body: {
          errors: err.message,
        },
      };
    }
  };
}
