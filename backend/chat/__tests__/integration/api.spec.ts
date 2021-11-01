import _ from "lodash";
import app from "../../index";
import makeFakeChat from "../__fixtures__/make-fake-chat";
import { connect, clearDatabase } from "../__fixtures__/jest-mongo";
import request from "supertest";

const api = request(app);
describe("Chats Postive Test Cases", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  let chat_id = ""; // Used in retrieval & deletion test
  const mock_chat = makeFakeChat();

  describe("POST /", () => {
    it("Should create a chat", async () => {
      const res = await api.post("/chat/api").send(mock_chat);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(_.get(res, "body.data.match_id")).toEqual(String(mock_chat.match_id));
      chat_id = _.get(res.body, "data._id");
    });
  });

  describe("GET /", () => {
    it("Should fetch single chat that was previously created", async () => {
      const res = await api.get(`/chat/api/${chat_id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(_.get(res, "body.data._id")).toEqual(String(mock_chat._id));
      expect(_.get(res, "body.data.match_id")).toEqual(String(mock_chat.match_id));
    });
  });

  describe("PUT /", () => {
    it("Should update chat that was previously created", async () => {
      const second_mock_chat = makeFakeChat();
      const updated_chat = Object.assign({}, mock_chat, {
        match_id: second_mock_chat.match_id,
      });

      const res = await api.put("/chat/api").send(updated_chat);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(_.get(res, "body.data._id")).toEqual(String(mock_chat._id));
      expect(_.get(res, "body.data.match_id")).toEqual(String(updated_chat.match_id));
    });
  });
});

describe("Chats Negative Test Cases", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  const mock_chat = makeFakeChat();
  const valid_chat_id = makeFakeChat()._id;
  const invalid_chat_id = "123"; // Invalid ID as it is not a valid ObjectID

  describe("POST /", () => {
    it("Should not create a chat", async () => {
      const res = await api.post("/chat/api").send({ name: "Hello" });
      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("GET /", () => {
    it("Should not fetch a chat due to invalid ID", async () => {
      const res = await api.get(`/chat/api/${invalid_chat_id}`);
      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });

    it("Should not fetch a chat due to record not found", async () => {
      const res = await api.get(`/chat/api/${valid_chat_id}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("PUT /", () => {
    it("Should not update chat due to invalid ID", async () => {
      const res = await api.put("/chat/api").send({
        _id: invalid_chat_id,
        match_id: mock_chat.match_id,
      });
      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });

    it("Should not update chat due to record not found", async () => {
      const res = await api.put("/chat/api").send({
        _id: valid_chat_id,
        match_id: mock_chat.match_id,
      });
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("errors");
    });
  });
});
