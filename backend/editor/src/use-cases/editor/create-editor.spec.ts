import _ from "lodash";

import makeFakeEditor from "../../../__tests__/__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Editor from "../../entities/editor";
import makeCreateEditor from "./create-editor";
import makeEditorDb from "../../data-access/make-editor-db";
import { editorDbModel } from "../../data-access/models";

describe("createEditor", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the created editor passed into function", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const createEditor = makeCreateEditor({ editorDb });
    const mock_editor = makeFakeEditor();

    const result = await createEditor({ editorDetails: mock_editor });
    const expected = new Editor(mock_editor);

    expect(_.omit(result, "_id", "content")).toEqual(_.omit(expected, "_id", "content"));
  });
});
