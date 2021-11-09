import _ from "lodash";
import app from "../../index";
import makeFakeEditor from "../__fixtures__/make-fake-editor";
import { connect, clearDatabase } from "../__fixtures__/jest-mongo";
import request from "supertest";

const api = request(app);
describe("Editors Postive Test Cases", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  let editor_id = ""; // Used in retrieval & deletion test
  const mock_editor = makeFakeEditor();

  describe("POST /", () => {
    it("Should create a editor", async () => {
      const res = await api.post("/editor/api").send(mock_editor);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(_.get(res, "body.data.match_id")).toEqual(String(mock_editor.match_id));
      editor_id = _.get(res.body, "data._id");
    });
  });

  describe("GET /", () => {
    it("Should fetch single editor that was previously created", async () => {
      const res = await api.get(`/editor/api/${editor_id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(_.get(res, "body.data._id")).toEqual(String(mock_editor._id));
      expect(_.get(res, "body.data.match_id")).toEqual(String(mock_editor.match_id));
    });
  });
});

describe("Editors Negative Test Cases", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  const valid_editor_id = makeFakeEditor()._id;
  const invalid_editor_id = "123"; // Invalid ID as it is not a valid ObjectID

  describe("POST /", () => {
    it("Should not create a editor", async () => {
      const res = await api.post("/editor/api").send({ name: "Hello" });
      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("GET /", () => {
    it("Should not fetch a editor due to invalid ID", async () => {
      const res = await api.get(`/editor/api/${invalid_editor_id}`);
      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });

    it("Should not fetch a editor due to record not found", async () => {
      const res = await api.get(`/editor/api/${valid_editor_id}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("errors");
    });
  });
});
