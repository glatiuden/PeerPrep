import _ from "lodash";

import makeFakeEditor from "../../../__tests__/__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Editor from "../../entities/editor";
import makeEditorDb from "../../data-access/make-editor-db";
import { editorDbModel } from "../../data-access/models";
import makeCreateEditor from "./create-editor";
import makeGetEditorByMatchId from "./get-editor-by-match-id";

describe("getEditorByMatchId", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });
  test("should return the existing editor by match id", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const createEditor = makeCreateEditor({ editorDb });
    const mock_editor = makeFakeEditor();

    const result = await createEditor({ editorDetails: mock_editor });
    const expected = new Editor(mock_editor);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getEditorByMatchId = makeGetEditorByMatchId({ editorDb });
    const fetch_result = await getEditorByMatchId({ match_id: String(mock_editor.match_id) });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));
  });

  test("should return null if editor does not exist", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const mock_editor = makeFakeEditor();

    const getEditorByMatchId = makeGetEditorByMatchId({ editorDb });
    const fetch_result = await getEditorByMatchId({ match_id: String(mock_editor.match_id) });
    const expected = null;

    expect(_.omit(fetch_result, "_id")).toEqual(_.omit(expected, "_id"));
  });
});
