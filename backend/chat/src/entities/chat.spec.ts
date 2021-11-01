import makeFakeChat from "../../__tests__/__fixtures__/make-fake-chat";
import Chat from "./chat";

describe("chat", () => {
  it("should have an _id", async () => {
    const fake_chat = await makeFakeChat({ _id: "" });
    expect(() => {
      new Chat(fake_chat);
    }).toThrow("Chat must have a _id.");
  });

  it("should have an match_id", async () => {
    const fake_chat = await makeFakeChat({ match_id: undefined });
    expect(() => {
      new Chat(fake_chat);
    }).toThrow("Chat must have a match_id.");
  });

  it("should have an email", async () => {
    const fake_chat = await makeFakeChat({ content: undefined });
    expect(() => {
      new Chat(fake_chat);
    }).toThrow("Chat must have a content.");
  });
});
