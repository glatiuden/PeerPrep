// Retrieve user information via RPC

import { Exchange } from "@pager/jackrabbit";

export default function makeUserService({ exchange }: { exchange: Exchange }) {
  const requestor = "match";

  return new (class UserRPC {
    async findById({ id }: { id: string }): Promise<any> {
      return new Promise((resolve, reject) => {
        exchange.publish(
          { requestor, request_type: "getById", user_id: id },
          {
            key: "user",
            reply: (data) => {
              if (data.result) {
                resolve(data.result);
              }
              reject(`User by ${id} not found.`);
            },
          },
        );
      });
    }
  })();
}
