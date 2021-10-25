// Retrieve user information via RPC

import { Exchange } from "@pager/jackrabbit";

export default function makeUserService({ exchange }: { exchange: Exchange }) {
  const requestor = "match";

  return new (class UserRPC {
    async findById({ user_id }: { user_id: string }): Promise<any> {
      return new Promise((resolve, reject) => {
        exchange.publish(
          { requestor, request_type: "findById", user_id },
          {
            key: "user",
            reply: (data) => {
              if (data.result) {
                resolve(data.result);
              }
              reject(`User by ${user_id} not found.`);
            },
          },
        );
      });
    }

    async findByIds({ user_ids }: { user_ids: string[] }): Promise<any> {
      return new Promise((resolve, reject) => {
        exchange.publish(
          { requestor, request_type: "findByIds", user_ids },
          {
            key: "user",
            reply: (data) => {
              if (data.result) {
                resolve(data.result);
              }
              reject(`Users by ${user_ids.join()} not found.`);
            },
          },
        );
      });
    }
  })();
}
