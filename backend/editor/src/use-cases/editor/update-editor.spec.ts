import _ from "lodash";

import makeFakeEditor from "../../../__tests__/__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import makeEditorDb from "../../data-access/make-editor-db";
import { editorDbModel } from "../../data-access/models";
import Editor from "../../entities/editor";

import makeCreateEditor from "./create-editor";
import makeUpdateEditor from "./update-editor";
import makeGetEditorById from "./get-editor-by-id";

describe("updateEditor", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the updated editor", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const createEditor = makeCreateEditor({ editorDb });
    const mock_editor = makeFakeEditor();

    const result = await createEditor({ editorDetails: mock_editor });
    const expected = new Editor(mock_editor);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getEditorByEmail = makeGetEditorById({ editorDb });
    const fetch_result = await getEditorByEmail({ id: mock_editor._id });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));

    const second_mock_editor = makeFakeEditor();
    const updateEditor = makeUpdateEditor({ editorDb });

    const updated_editor = Object.assign({}, mock_editor, {
      match_id: second_mock_editor.match_id,
    });

    const updated_result = await updateEditor({ editorDetails: _.omit(updated_editor, "content") });
    const expected_update = new Editor(updated_editor);
    expect(_.omit(updated_result, ["_id", "content", "updated_at"])).toEqual(
      _.omit(expected_update, "_id", "content", "updated_at"),
    );
  });
});
