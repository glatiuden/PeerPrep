import Chat from "../../entities/chat";
import IChat from "../../entities/interfaces/chat";

export default interface IChatDb {
  insert: (insertPayload: Partial<IChat>) => Promise<Chat | null>;
  findById: ({ id }: { id: string }) => Promise<Chat | null>;
  findAll: () => Promise<Chat[]>;
  findByMatchId: ({ match_id }: { match_id: string }) => Promise<Chat | null>;
  update: (updatePayload: Partial<IChat>) => Promise<Chat | null>;
  delete: ({ id }: { id: string }) => Promise<Chat | null>;
  hardDelete: ({ id }: { id: string }) => Promise<boolean>;
}
