import Chat from "../../entities/chat";
import IChat from "../../entities/interfaces/chat";
import IChatDb from "../../data-access/interfaces/chat-db";

interface ICreateChatData {
  chatDetails: Omit<IChat, "_id">;
}

export type ICreateChat = ({ chatDetails }: ICreateChatData) => Promise<Chat | null>;

export default function makeCreateChat({ chatDb }: { chatDb: IChatDb }): ICreateChat {
  return async function createChat({ chatDetails }: ICreateChatData): Promise<Chat | null> {
    const created_chat = await chatDb.insert(chatDetails);
    return created_chat;
  };
}
