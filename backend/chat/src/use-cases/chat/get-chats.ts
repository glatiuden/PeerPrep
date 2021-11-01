import IChatDb from "../../data-access/interfaces/chat-db";
import Chat from "../../entities/chat";

export type IGetChats = () => Promise<Chat[]>;

export default function makeGetChats({ chatDb }: { chatDb: IChatDb }): IGetChats {
  return async function getChats(): Promise<Chat[]> {
    const chats = await chatDb.findAll();
    return chats;
  };
}
