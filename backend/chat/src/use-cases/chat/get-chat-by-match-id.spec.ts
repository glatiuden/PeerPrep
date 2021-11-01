import _ from "lodash";

import makeFakeChat from "../../../__tests__/__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Chat from "../../entities/chat";
import makeChatDb from "../../data-access/make-chat-db";
import { chatDbModel } from "../../data-access/models";
import makeCreateChat from "./create-chat";
import makeGetChatByMatchId from "./get-chat-by-match-id";

describe("getChatByMatchId", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the existing chat by match id", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const createChat = makeCreateChat({ chatDb });
    const mock_chat = await makeFakeChat();

    const result = await createChat({ chatDetails: mock_chat });
    const expected = new Chat(mock_chat);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getChatByMatchId = makeGetChatByMatchId({ chatDb });
    const fetch_result = await getChatByMatchId({ match_id: String(mock_chat.match_id) });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));
  });

  test("should return null if chat does not exist", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const mock_chat = await makeFakeChat();

    const getChatByMatchId = makeGetChatByMatchId({ chatDb });
    const fetch_result = await getChatByMatchId({ match_id: String(mock_chat.match_id) });
    const expected = null;

    expect(_.omit(fetch_result, "_id")).toEqual(_.omit(expected, "_id"));
  });
});
