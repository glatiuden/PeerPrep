import Chat from "../../entities/chat";
import IChatDb from "../../data-access/interfaces/chat-db";

export type IDeleteChatById = ({ id }: { id: string }) => Promise<Chat | null>;

export default function makeDeleteChatById({ chatDb }: { chatDb: IChatDb }): IDeleteChatById {
  return async function deleteChatById({ id }: { id: string }): Promise<Chat | null> {
    const existing = await chatDb.findById({ id });
    if (!existing) {
      throw new RangeError(`Chat ${id} not found.`);
    }

    if (existing.deleted_at) {
      throw new Error(`Chat ${id} has already been soft-deleted.`);
    }

    const deleted_chat = await chatDb.delete({ id });
    return deleted_chat;
  };
}
