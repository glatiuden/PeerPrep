import _ from "lodash";

import makeFakeEditor from "../../../__tests__/__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Editor from "../../entities/editor";
import makeEditorDb from "../../data-access/make-editor-db";
import { editorDbModel } from "../../data-access/models";
import makeCreateEditor from "./create-editor";
import makeGetEditors from "./get-editors";

describe("getEditors", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  test("should return null", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const getEditors = makeGetEditors({ editorDb });
    const fetch_result = await getEditors();
    const expected = [];

    expect(fetch_result).toEqual(expected);
  });

  test("should return the existing editor", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const createEditor = makeCreateEditor({ editorDb });
    const mock_editor = makeFakeEditor();

    const result = await createEditor({ editorDetails: mock_editor });
    const expected = new Editor(mock_editor);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getEditors = makeGetEditors({ editorDb });
    const fetch_result = await getEditors();
    const fetched_result_without_id = fetch_result.map((editor) => _.omit(editor, ["_id, content[0]._id"]));
    expect(fetched_result_without_id).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          match_id: mock_editor.match_id,
        }),
      ]),
    );
  });

  test("should contain 1 item as inserted by previous test case", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const getEditors = makeGetEditors({ editorDb });
    const fetch_result = await getEditors();
    expect(fetch_result).toHaveLength(1);
  });
});
