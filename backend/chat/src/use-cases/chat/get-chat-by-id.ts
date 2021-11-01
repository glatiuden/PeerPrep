import Chat from "../../entities/chat";
import IChatDb from "../../data-access/interfaces/chat-db";

export type IGetChatById = ({ id }: { id: string }) => Promise<Chat | null>;

export default function makeGetChatById({ chatDb }: { chatDb: IChatDb }): IGetChatById {
  return async function getChatById({ id }: { id: string }): Promise<Chat | null> {
    const chat = await chatDb.findById({ id });
    if (!chat) {
      throw new RangeError(`Chat ${id} not found.`);
    }

    return chat;
  };
}
