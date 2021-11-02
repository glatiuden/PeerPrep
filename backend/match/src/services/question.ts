// Retrieve question information via RPC

import { Exchange } from "@pager/jackrabbit";

export default function makeQuestionService({ rpcClient }: { rpcClient: Exchange }) {
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
  })();
}
