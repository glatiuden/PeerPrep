// Message Queue Client to communicate with User MS

import { Exchange } from "@pager/jackrabbit";

export default function makeUserService({ rpcClient, pubsubClient }: { rpcClient: Exchange; pubsubClient: Exchange }) {
  const requestor = "match";

  return new (class UserRPC {
    /**
     * Find user by ID via RPC
     * @param { user_id }
     * @returns user
     */
    async findById({ user_id }: { user_id: string }): Promise<any> {
      return new Promise((resolve, reject) => {
        rpcClient.publish(
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

    /**
     * Find users via RPC
     * @param { user_ids }
     * @returns array of user
     */
    async findByIds({ user_ids }: { user_ids: string[] }): Promise<any> {
      return new Promise((resolve, reject) => {
        rpcClient.publish(
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

    /**
     * Update user's elo via Pub/Sub
     * @param { user_id, elo }
     */
    updateUserElo({ user_id, elo }: { user_id: string; elo: number }) {
      pubsubClient.publish({ request_type: "updateUserElo", user_id, elo });
    }
  })();
}
