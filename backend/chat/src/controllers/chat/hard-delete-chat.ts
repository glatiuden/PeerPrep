import _ from "lodash";
import { Logger } from "winston";

import { IHardDeleteChatById } from "../../use-cases/chat/hard-delete-chat-by-id";

export default function makeHardDeleteChatController({
  hardDeleteChatById,
  logger,
}: {
  hardDeleteChatById: IHardDeleteChatById;
  logger: Logger;
}) {
  return async function hardDeleteChatController(
    httpRequest: Request & { context: { validated: { chat_id: string } } },
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { chat_id }: { chat_id: string } = _.get(httpRequest, "context.validated");

      const is_deleted = await hardDeleteChatById({ id: chat_id });
      if (!is_deleted) {
        throw new Error(`Chat by ${chat_id} unable to delete.`);
      }

      logger.verbose("Chat hard-deleted", { chat_id: chat_id });
      return {
        headers,
        statusCode: 200,
        body: {
          is_deleted,
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
