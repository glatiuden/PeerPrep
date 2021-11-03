// Message Queue Client to communicate with Question MS

import { Exchange } from "@pager/jackrabbit";

export default function makeQuestionService({
  rpcClient,
  pubsubClient,
}: {
  rpcClient: Exchange;
  pubsubClient: Exchange;
}) {
  const requestor = "match";

  return new (class QuestionRPC {
    async findById({ id }: { id: string }): Promise<any> {
      return new Promise((resolve, reject) => {
        rpcClient.publish(
          { requestor, request_type: "findById", question_id: id },
          {
            key: "question",
            reply: (data) => {
              if (data.result) {
                resolve(data.result);
              }
              reject(`Question by ${id} not found.`);
            },
          },
        );
      });
    }

    async findByDifficultyAndTopic({ difficulty, topic }: { difficulty: string; topic?: string }): Promise<any> {
      return new Promise((resolve, reject) => {
        rpcClient.publish(
          { requestor, request_type: "findByDifficultyAndTopic", difficulty, topic },
          {
            key: "question",
            reply: (data) => {
              if (data.result) {
                resolve(data.result);
              }
              reject(`Question by ${difficulty} not found.`);
            },
          },
        );
      });
    }

    /**
     * Update question's attempt count via Pub/Sub
     * @param { question_id }
     */
    updateQuestionAttemptCount({ question_id }: { question_id: string }) {
      pubsubClient.publish({ request_type: "updateQuestionAttemptCount", question_id });
    }
  })();
}
