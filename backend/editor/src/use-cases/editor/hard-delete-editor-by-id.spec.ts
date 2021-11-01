import _ from "lodash";

import makeFakeEditor from "../../../__tests__/__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Editor from "../../entities/editor";
import makeEditorDb from "../../data-access/make-editor-db";
import { editorDbModel } from "../../data-access/models";
import makeCreateEditor from "./create-editor";
import makeHardDeleteEditorById from "./hard-delete-editor-by-id";
import makeGetEditorById from "./get-editor-by-id";

describe("hardDeleteEditorById", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  test("should throw error", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const mock_editor = makeFakeEditor();
    const hardDeleteEditorById = makeHardDeleteEditorById({ editorDb });
    const action = async () => {
      await hardDeleteEditorById({ id: mock_editor._id });
    };
    expect(action()).rejects.toThrowError(new RangeError(`Editor ${mock_editor._id} not found.`));
  });

  test("should delete editor by id", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const createEditor = makeCreateEditor({ editorDb });
    const mock_editor = makeFakeEditor();

    const result = await createEditor({ editorDetails: mock_editor });
    const expected = new Editor(mock_editor);
    expect(_.omit(result, ["_id", "content"])).toEqual(_.omit(expected, ["_id", "content"]));

    const getEditorById = makeGetEditorById({ editorDb });
    const fetch_result = await getEditorById({ id: mock_editor._id });
    expect(_.omit(fetch_result, ["_id", "content"])).toEqual(_.omit(fetch_result, ["_id", "content"]));

    const hardDeleteEditorById = makeHardDeleteEditorById({ editorDb });
    const deleted_result = await hardDeleteEditorById({ id: mock_editor._id });
    expect(deleted_result).toEqual(true);
  });
});
