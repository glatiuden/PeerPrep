import _ from "lodash";
import { Logger } from "winston";

import { IGetChatByMatchId } from "../../use-cases/chat/get-chat-by-match-id";

export default function makeGetChatCoMatchntroller({
  getChatByMatchId,
  logger,
}: {
  getChatByMatchId: IGetChatByMatchId;
  logger: Logger;
}) {
  return async function getChatController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
      const chat = await getChatByMatchId({ match_id });
      if (!chat) {
        throw new Error(`Chat by ${match_id} does not exists.`);
      }

      logger.verbose("Chat retrieved", { match_id });
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
