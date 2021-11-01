import _ from "lodash";
import { Logger } from "winston";

import IChat from "../../entities/interfaces/chat";
import { ICreateChat } from "../../use-cases/chat/create-chat";

/**
 * @description Create new chat record in database
 * @function createChatController
 */
export default function makeCreateChatController({ createChat, logger }: { createChat: ICreateChat; logger: Logger }) {
  return async function createChatController(httpRequest: Request & { context: { validated: Partial<IChat> } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const chatDetails: IChat = _.get(httpRequest, "context.validated");
      const created_chat = await createChat({ chatDetails });
      if (!created_chat) {
        throw new Error(`Chat was not created.`);
      }

      logger.verbose("Chat created", { chat_id: created_chat._id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_chat,
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
