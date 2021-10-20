import _ from "lodash";

import { matchService } from "../../services";
import { RPCProducerClient } from "../../configs/make-rpc-producer";

/**
 * @description Get match by ID
 * @function getMatchController
 */
async function getMatchController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
    const match = await matchService.findById({ id: match_id });
    if (!match) {
      throw new Error(`Match ${match_id} does not exist.`);
    }

    const getQuestion = () => {
      return new Promise((resolve, reject) => {
        RPCProducerClient.exchange.publish(
          { requestor: "match", request_type: "getById", question_id: match?.question_id },
          {
            key: "rpc_queue",
            reply: (data) => resolve(data.result),
          },
        );
      });
    };

    const question: any = await getQuestion();

    return {
      headers,
      statusCode: 200,
      body: {
        data: {
          ...match,
          question,
        },
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

export default getMatchController;
