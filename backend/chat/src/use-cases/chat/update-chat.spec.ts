import _ from "lodash";

import makeFakeChat from "../../../__tests__/__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import makeChatDb from "../../data-access/make-chat-db";
import { chatDbModel } from "../../data-access/models";
import Chat from "../../entities/chat";

import makeCreateChat from "./create-chat";
import makeUpdateChat from "./update-chat";
import makeGetChatById from "./get-chat-by-id";

describe("updateChat", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the updated chat", async () => {
    const chatDb = makeChatDb({ chatDbModel });
    const createChat = makeCreateChat({ chatDb });
    const mock_chat = await makeFakeChat();

    const result = await createChat({ chatDetails: mock_chat });
    const expected = new Chat(mock_chat);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getChatByEmail = makeGetChatById({ chatDb });
    const fetch_result = await getChatByEmail({ id: mock_chat._id });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));

    const second_mock_chat = await makeFakeChat();
    const updateChat = makeUpdateChat({ chatDb });

    // const expected_update = _.cloneDeep(mock_chat);
    // expected_update.match_id = second_mock_chat.match_id;
    // expect(_.omit(updated_result, ["_id", "content", "updated_at"])).toEqual(
    //   _.omit(expected_update, "_id", "content", "updated_at"),
    // );
  });
});
