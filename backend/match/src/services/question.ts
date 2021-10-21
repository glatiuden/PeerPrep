// Retrieve question information via RPC

import { Exchange } from "@pager/jackrabbit";

export default function makeQuestionService({ exchange }: { exchange: Exchange }) {
  const requestor = "match";

  return new (class QuestionRPC {
    async findById({ id }: { id: string }): Promise<any> {
      return new Promise((resolve, reject) => {
        exchange.publish(
          { requestor, request_type: "getById", question_id: id },
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
  })();
}
