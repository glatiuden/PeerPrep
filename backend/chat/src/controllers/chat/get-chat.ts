import _ from "lodash";
import { Logger } from "winston";

import { IGetChatById } from "../../use-cases/chat/get-chat-by-id";

export default function makeGetChatController({ getChatById, logger }: { getChatById: IGetChatById; logger: Logger }) {
  return async function getChatController(httpRequest: Request & { context: { validated: { chat_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { chat_id }: { chat_id: string } = _.get(httpRequest, "context.validated");
      const chat = await getChatById({ id: chat_id });
      if (!chat) {
        throw new Error(`Chat by ${chat_id} does not exists.`);
      }

      logger.verbose("Chat retrieved", { chat_id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: chat,
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
