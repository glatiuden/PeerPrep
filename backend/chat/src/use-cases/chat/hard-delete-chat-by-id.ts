import IChatDb from "../../data-access/interfaces/chat-db";

export type IHardDeleteChatById = ({ id }: { id: string }) => Promise<boolean>;

export default function makeHardDeleteChatById({ chatDb }: { chatDb: IChatDb }): IHardDeleteChatById {
  return async function hardDeleteChatById({ id }: { id: string }): Promise<boolean> {
    const existing = await chatDb.findById({ id });
    if (!existing) {
      throw new RangeError(`Chat ${id} not found.`);
    }

    const deleted_chat = await chatDb.hardDelete({ id });
    return deleted_chat;
  };
}
