import _ from "lodash";

import makeFakeEditor from "../../../__tests__/__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../../../__tests__/__fixtures__/jest-mongo";

import Editor from "../../entities/editor";
import makeEditorDb from "../../data-access/make-editor-db";
import { editorDbModel } from "../../data-access/models";
import makeCreateEditor from "./create-editor";
import makeDeleteEditorById from "./delete-editor-by-id";
import makeGetEditorById from "./get-editor-by-id";

describe("deleteEditorById", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  test("should throw error", async () => {
    const editorDb = makeEditorDb({ editorDbModel });
    const mock_editor = makeFakeEditor();
    const deleteEditorById = makeDeleteEditorById({ editorDb });
    expect(deleteEditorById({ id: mock_editor._id })).rejects.toThrowError(
      new RangeError(`Editor ${mock_editor._id} not found.`),
    );
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

    const deleteEditorById = makeDeleteEditorById({ editorDb });
    const deleted_result = await deleteEditorById({ id: mock_editor._id });
    expect(_.get(deleted_result, "deleted_at")).not.toBeUndefined();
  });
});
