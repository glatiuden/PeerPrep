import _ from "lodash";
import { Request } from "express";
import { Logger } from "winston";

import IChat from "../../entities/interfaces/chat";
import { IUpdateChat } from "../../use-cases/chat/update-chat";

export default function makeUpdateChatController({ updateChat, logger }: { updateChat: IUpdateChat; logger: Logger }) {
  return async function updateChatController(
    httpRequest: Request & { context: { validated: { chatDetails: IChat } } },
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const chatDetails: IChat = _.get(httpRequest, "context.validated");
      const { _id: chat_id } = chatDetails; // the chat's ID

      const updated_chat = await updateChat({ chatDetails });
      if (!updated_chat) {
        throw new Error(`Chat by ${chat_id} unable to update.`);
      }

      logger.verbose("Chat updated", { chat_id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_chat,
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
