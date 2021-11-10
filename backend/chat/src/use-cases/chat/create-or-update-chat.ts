import Chat from "../../entities/chat";
import { IGetChatByMatchId } from "./get-chat-by-match-id";
import { ICreateChat } from "./create-chat";
import { IUpdateChat } from "./update-chat";
import { Schema } from "mongoose";

interface ICreateOrUpdateChatData {
  match_id: string;
  content: {
    user_id: Schema.Types.ObjectId;
    display_name: string;
    message: string;
    time_sent: Date;
  }[];
}

export type ICreateOrUpdateChat = ({ match_id, content }: ICreateOrUpdateChatData) => Promise<Chat | null>;

export default function makeCreateOrUpdateChat({
  getChatByMatchId,
  createChat,
  updateChat,
}: {
  getChatByMatchId: IGetChatByMatchId;
  createChat: ICreateChat;
  updateChat: IUpdateChat;
}): ICreateOrUpdateChat {
  return async function createOrUpdateChat({ match_id, content }: ICreateOrUpdateChatData): Promise<Chat | null> {
    const existing_chat = await getChatByMatchId({ match_id });
    if (existing_chat) {
      const chat_to_be_updated = Object.assign({}, existing_chat, {
        content,
      });
      return await updateChat({ chatDetails: chat_to_be_updated });
    }
    const created_chat = await createChat({ chatDetails: { match_id, content } });
    return created_chat;
  };
}
