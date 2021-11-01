import _ from "lodash";

import makeFakeChat from "../../../__tests__/__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Chat from "../../entities/chat";
import makeChatDb from "../../data-access/make-chat-db";
import { chatDbModel } from "../../data-access/models";
import makeCreateChat from "./create-chat";
import makeGetChats from "./get-chats";

describe("getChats", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  test("should return null if chat does not exist", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const getChats = makeGetChats({ chatDb });
    const fetch_result = await getChats();
    const expected = [];

    expect(fetch_result).toEqual(expected);
  });
  test("should return the existing chat", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const createChat = makeCreateChat({ chatDb });
    const mock_chat = await makeFakeChat();

    const result = await createChat({ chatDetails: mock_chat });
    const expected = new Chat(mock_chat);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getChats = makeGetChats({ chatDb });
    const fetch_result = await getChats();
    const fetched_result_without_id = fetch_result.map((chat) => _.omit(chat, ["_id, content[0]._id"]));
    expect(fetched_result_without_id).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          match_id: mock_chat.match_id,
        }),
      ]),
    );
  });
  test("should contain 1 item as inserted by previous test case", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const getChats = makeGetChats({ chatDb });
    const fetch_result = await getChats();
    expect(fetch_result).toHaveLength(1);
  });
});
