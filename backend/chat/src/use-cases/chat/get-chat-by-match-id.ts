import Chat from "../../entities/chat";
import IChatDb from "../../data-access/interfaces/chat-db";

export type IGetChatByMatchId = ({ match_id }: { match_id: string }) => Promise<Chat | null>;

export default function makeGetChatById({ chatDb }: { chatDb: IChatDb }): IGetChatByMatchId {
  return async function getChatById({ match_id }: { match_id: string }): Promise<Chat | null> {
    const chat = await chatDb.findByMatchId({ match_id });
    return chat;
  };
}
