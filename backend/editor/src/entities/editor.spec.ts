import makeFakeEditor from "../../__tests__/__fixtures__/make-fake-editor";
import Editor from "./editor";

describe("editor", () => {
  it("should have an _id", async () => {
    const fake_editor = await makeFakeEditor({ _id: "" });
    expect(() => {
      new Editor(fake_editor);
    }).toThrow("Editor must have a _id.");
  });

  it("should have an match_id", async () => {
    const fake_editor = await makeFakeEditor({ match_id: undefined });
    expect(() => {
      new Editor(fake_editor);
    }).toThrow("Editor must have a match_id.");
  });

  it("should have an email", async () => {
    const fake_editor = await makeFakeEditor({ content: undefined });
    expect(() => {
      new Editor(fake_editor);
    }).toThrow("Editor must have a content.");
  });
});
