import _ from "lodash";

import makeFakeChat from "../../../__tests__/__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Chat from "../../entities/chat";
import makeCreateChat from "./create-chat";
import makeChatDb from "../../data-access/make-chat-db";
import { chatDbModel } from "../../data-access/models";

describe("createChat", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the created chat passed into function", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const createChat = makeCreateChat({ chatDb });
    const mock_chat = await makeFakeChat();

    const result = await createChat({ chatDetails: mock_chat });
    const expected = new Chat(mock_chat);

    expect(_.omit(result, "_id", "content")).toEqual(_.omit(expected, "_id", "content"));
  });
});
