import _ from "lodash";

import makeFakeChat from "../../../__tests__/__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Chat from "../../entities/chat";
import makeChatDb from "../../data-access/make-chat-db";
import { chatDbModel } from "../../data-access/models";
import makeCreateChat from "./create-chat";
import makeGetChatById from "./get-chat-by-id";

describe("getChatById", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the existing chat", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const createChat = makeCreateChat({ chatDb });
    const mock_chat = makeFakeChat();

    const result = await createChat({ chatDetails: mock_chat });
    const expected = new Chat(mock_chat);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getChatById = makeGetChatById({ chatDb });
    const fetch_result = await getChatById({ id: mock_chat._id });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));
  });

  test("should return null if chat does not exist", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const mock_chat = makeFakeChat();

    const getChatById = makeGetChatById({ chatDb });
    const fetch_result = await getChatById({ id: mock_chat._id });
    const expected = null;

    expect(_.omit(fetch_result, "_id")).toEqual(_.omit(expected, "_id"));
  });
});
