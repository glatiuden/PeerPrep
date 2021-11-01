import _ from "lodash";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../index";
import makeFakeChat from "../../__tests__/__fixtures__/make-fake-chat";
import { clearDatabase } from "../../__tests__/__fixtures__/jest-mongo";

chai.use(chaiHttp);
chai.should();

const request = chai.request(app).keepOpen();
const expect = chai.expect;

describe("Chats Postive Test Cases", () => {
  after(async () => {
    await clearDatabase();
  });

  let chat_id = ""; // Used in retrieval & deletion test
  const mock_chat = makeFakeChat();

  describe("POST /", () => {
    it("Should create a chat", async () => {
      const res = await request.post("/chat/api").send(mock_chat);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(res.body).to.property("data").property("match_id", String(mock_chat.match_id));
      chat_id = _.get(res.body, "data._id");
    });
  });

  describe("GET /", () => {
    it("Should fetch single chat that was previously created", async () => {
      const res = await request.get(`/chat/api/${chat_id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(res.body).to.property("data").property("_id", String(chat_id));
      expect(res.body).to.property("data").property("match_id", String(mock_chat.match_id));
    });
  });

  describe("PUT /", () => {
    it("Should update chat that was previously created", async () => {
      const second_mock_chat = makeFakeChat();
      const updated_chat = Object.assign({}, mock_chat, {
        match_id: second_mock_chat.match_id,
      });

      const res = await request.put("/chat/api").send(updated_chat);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(res.body).to.property("data").property("_id", String(chat_id));
      expect(res.body).to.property("data").property("match_id", String(updated_chat.match_id));
    });
  });
});

describe("Chats Negative Test Cases", () => {
  after(async () => {
    await clearDatabase();
  });

  const mock_chat = makeFakeChat();
  const valid_chat_id = makeFakeChat()._id;
  const invalid_chat_id = "123"; // Invalid ID as it is not a valid ObjectID

  describe("POST /", () => {
    it("Should not create a chat", async () => {
      const res = await request.post("/chat/api").send({ name: "Hello" });
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
    });
  });

  describe("GET /", () => {
    it("Should not fetch a chat due to invalid ID", async () => {
      const res = await request.get(`/chat/api/${invalid_chat_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("chat_id", ["The chat id format is invalid."]);
    });

    it("Should not fetch a chat due to record not found", async () => {
      const res = await request.get(`/chat/api/${valid_chat_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors", `Chat by ${valid_chat_id} does not exists.`);
    });
  });

  describe("PUT /", () => {
    it("Should not update chat due to invalid ID", async () => {
      const res = await request.put("/chat/api").send({
        _id: invalid_chat_id,
        match_id: mock_chat.match_id,
      });
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("_id", ["The  id format is invalid."]);
    });

    it("Should not update chat due to record not found", async () => {
      const res = await request.put("/chat/api").send({
        _id: valid_chat_id,
        match_id: mock_chat.match_id,
      });
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors", `Chat ${valid_chat_id} not found.`);
    });
  });
});
