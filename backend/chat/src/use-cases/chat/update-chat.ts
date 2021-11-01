import Chat from "../../entities/chat";
import IChatDb from "../../data-access/interfaces/chat-db";
import IChat from "../../entities/interfaces/chat";

export type IUpdateChat = ({ chatDetails }: { chatDetails: Partial<IChat> & { _id: string } }) => Promise<Chat | null>;

export default function makeUpdateChat({ chatDb }: { chatDb: IChatDb }): IUpdateChat {
  return async function updateChat({
    chatDetails,
  }: {
    chatDetails: Partial<IChat> & { _id: string };
  }): Promise<Chat | null> {
    const { _id: chat_id } = chatDetails;
    const existing = await chatDb.findById({ id: chat_id });
    if (!existing) {
      throw new RangeError(`Chat ${chat_id} not found.`);
    }

    const chat = new Chat(Object.assign({}, existing, chatDetails, { updated_at: new Date() }));
    const updated_chat = await chatDb.update(chat);

    return updated_chat;
  };
}
