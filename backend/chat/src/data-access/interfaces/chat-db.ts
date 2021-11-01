import Chat from "../../entities/chat";

export default interface IChatDb {
  insert: (insertPayload: Partial<Chat>) => Promise<Chat | null>;
  findById: ({ id }: { id: string }) => Promise<Chat | null>;
  findAll: () => Promise<Chat[]>;
  findByMatchId: ({ match_id }: { match_id: string }) => Promise<Chat | null>;
  update: (updatePayload: Partial<Chat>) => Promise<Chat | null>;
  delete: ({ id }: { id: string }) => Promise<Chat | null>;
  hardDelete: ({ id }: { id: string }) => Promise<boolean>;
}
