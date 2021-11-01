import _ from "lodash";

import makeFakeChat from "../../../__tests__/__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Chat from "../../entities/chat";
import makeChatDb from "../../data-access/make-chat-db";
import { chatDbModel } from "../../data-access/models";
import makeCreateChat from "./create-chat";
import makeHardDeleteChatById from "./hard-delete-chat-by-id";
import makeGetChatById from "./get-chat-by-id";

describe("hardDeleteChatById", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  test("should throw error", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const mock_chat = await makeFakeChat();
    const hardDeleteChatById = makeHardDeleteChatById({ chatDb });
    const action = async () => {
      await hardDeleteChatById({ id: mock_chat._id });
    };
    expect(action()).rejects.toThrowError(new RangeError(`Chat ${mock_chat._id} not found.`));
  });

  test("should delete chat by id", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const createChat = makeCreateChat({ chatDb });
    const mock_chat = await makeFakeChat();

    const result = await createChat({ chatDetails: mock_chat });
    const expected = new Chat(mock_chat);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getChatById = makeGetChatById({ chatDb });
    const fetch_result = await getChatById({ id: mock_chat._id });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));

    const hardDeleteChatById = makeHardDeleteChatById({ chatDb });
    const deleted_result = await hardDeleteChatById({ id: mock_chat._id });
    expect(deleted_result).toEqual(true);
  });
});
