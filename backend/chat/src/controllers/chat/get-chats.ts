import _ from "lodash";
import { Logger } from "winston";

import { IGetChats } from "../../use-cases/chat/get-chats";

export default function makeGetChatsController({ getChats, logger }: { getChats: IGetChats; logger: Logger }) {
  return async function getChatsController() {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const chats = await getChats();

      logger.verbose("Chats retrieved", { chats_count: chats.length });
      return {
        headers,
        statusCode: 200,
        body: {
          data: chats,
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
