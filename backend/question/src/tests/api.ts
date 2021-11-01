import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

chai.use(chaiHttp);
chai.should();

describe("/question/admin", () => {
  let question: any;

  before(async () => {
    question = await chai.request(app).post("/question/admin/").set("content-type", "application/json").send({
      "title": "Test",
      "description": "Sample Question",
      "difficulty": "medium",
      "recommended_duration": 55,
      "topic": "Algorithms",
      "hints": [
        "hint1",
        "hint2"
      ],
      "examples": [
        {
          "input": "input1",
          "output": "output1"
        },
        {
          "input": "input2",
          "output": "output2"
        }
      ],
      "constraints": [
        "Sample Constraint"
      ],
      "solution": "Sample Solution"
    });

    Promise.all([question]);
  });

  after(async () => {
    await chai.request(app).delete("/question/admin/reset");
  });

  describe("GET /", () => {
    it("should get all questions", async () => {
      const res = await chai.request(app).get("/question/admin");

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("data").which.is.an.instanceof(Array).with.length(1);
      expect(res.body["data"][0]).to.include.all.keys([
        "_id",
        "title",
        "description",
        "difficulty",
        "recommended_duration",
        "topic",
        "hints",
        "examples",
        "constraints",
        "solution",
        "created_at",
        "updated_at",
      ]);
    });
  });
  describe("GET /:question_id", () => {
    it("should get one question", async () => {
      const id = question.body.data._id;
      const res = await chai.request(app).get(`/question/admin/${id}`);
      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
      expect(res.body)
        .to.have.property("data")
        .which.includes.all.keys([
          "_id",
          "title",
          "description",
          "difficulty",
          "recommended_duration",
          "topic",
          "hints",
          "examples",
          "constraints",
          "solution",
          "created_at",
          "updated_at",
        ]);
    });
    it("should not get a question", async () => {
      const id = 0;
      const res = await chai.request(app).get(`/question/admin/${id}`);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.all.keys(["errors"]);
    });
  });
  describe("POST /", () => {
    it("should create a question", async () => {
      const res = await chai.request(app).post(`/question/admin`).set("content-type", "application/json").send({
        "title": "Test2",
        "description": "Sample Question",
        "difficulty": "medium",
        "recommended_duration": 55,
        "topic": "Algorithms",
        "hints": [
          "hint1",
          "hint2"
        ],
        "examples": [
          {
            "input": "input1",
            "output": "output1"
          },
          {
            "input": "input2",
            "output": "output2"
          }
        ],
        "constraints": [
          "Sample Constraint"
        ],
        "solution": "Sample Solution"
      });

      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
      expect(res.body)
        .to.have.property("data")
        .which.includes.all.keys([
          "_id",
          "title",
          "description",
          "difficulty",
          "recommended_duration",
          "topic",
          "hints",
          "examples",
          "constraints",
          "solution",
          "created_at",
          "updated_at",
        ]);
    });

    //Missing difficulty and description
    it("should not create a question", async () => {
      const res = await chai.request(app).post(`/question/admin/`).set("content-type", "application/json").send({
        "title": "Test2",
        "recommended_duration": 55,
        "topic": "Algorithms",
        "hints": [
          "hint1",
          "hint2"
        ],
        "examples": [
          {
            "input": "input1",
            "output": "output1"
          },
          {
            "input": "input2",
            "output": "output2"
          }
        ],
        "constraints": [
          "Sample Constraint"
        ],
        "solution": "Sample Solution"
      });
      expect(res).to.have.status(422);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.all.keys(["errors"]);
    });
  });

  describe("PUT /", () => {
    it("should update topic", async () => {
      const id = question.body.data._id;
      const res = await chai.request(app).put(`/question/admin`).send({
        "_id": id,
        "topic": "Algorithms"
      });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("data")
    });
    it("should not update topic", async () => {
      const id = "invalid_id";
      const res = await chai.request(app).put(`/question/admin`).send({
        "_id": id,
        "topic": "Algorithms"
      });
      expect(res).to.have.status(422);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys(["errors"]);
    });
  });

  describe("DELETE /:question_id", () => {
    it("should delete one question", async () => {
      const id = question.body.data._id;
      const res = await chai.request(app).delete(`/question/admin/${id}`);

      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
      expect(res.body).to.have.property("is_deleted").which.equals(true);
      expect(res.body)
        .to.have.property("data")
        .which.includes.all.keys([
          "_id",
          "title",
          "description",
          "difficulty",
          "recommended_duration",
          "topic",
          "hints",
          "examples",
          "constraints",
          "solution",
          "created_at",
          "updated_at",
        ]);
    });
    it("should not delete one question", async () => {
      const id = 0;
      const res = await chai.request(app).delete(`/question/admin/${id}`);
      expect(res).to.have.status(422);
      expect(res).to.be.a("object");
      expect(res.body).to.include.all.keys(["errors"]);
    });
  });
});

describe("/question/api", () => {
  let question: any;

  before(async () => {
    question = await chai.request(app).post("/question/admin/").set("content-type", "application/json").send({
      "title": "Test",
      "description": "Sample Question",
      "difficulty": "medium",
      "recommended_duration": 55,
      "topic": "Algorithms",
      "hints": [
        "hint1",
        "hint2"
      ],
      "examples": [
        {
          "input": "input1",
          "output": "output1"
        },
        {
          "input": "input2",
          "output": "output2"
        }
      ],
      "constraints": [
        "Sample Constraint"
      ],
      "solution": "Sample Solution"
    });
  });

  after(async () => {
    await chai.request(app).delete("/question/api/reset");
  });
  describe("GET /", () => {
    it("should get all questions", async () => {
      const res = await chai.request(app).get("/question/api");

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("data").which.is.an.instanceof(Array).with.length(1);
      expect(res.body["data"][0]).to.include.all.keys([
        "_id",
        "title",
        "description",
        "difficulty",
        "recommended_duration",
        "topic",
        "hints",
        "examples",
        "constraints",
        "solution",
        "created_at",
        "updated_at",
      ]);
    });
  });
  describe("GET /:question_id", () => {
    it("should get one question", async () => {
      const id = question.body.data._id;
      const res = await chai.request(app).get(`/question/api/${id}`);
      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
      expect(res.body)
        .to.have.property("data")
        .which.includes.all.keys([
          "_id",
          "title",
          "description",
          "difficulty",
          "recommended_duration",
          "topic",
          "hints",
          "examples",
          "constraints",
          "solution",
          "created_at",
          "updated_at",
        ]);
    });
    it("should not get a question", async () => {
      const id = 0;
      const res = await chai.request(app).get(`/question/api/${id}`);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.all.keys(["errors"]);
    });
  });

  describe("PUT /", () => {
    it("should not update", async () => {
      const id = question.body.data._id;
      const res = await chai.request(app).put(`/question/api`).send({
        "_id": id,
        "topic": "Algorithms"
      });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a("object");
    });
  });

  describe("DELETE /:question_id", () => {
    it("should not delete", async () => {
      const id = question.body.data._id;
      const res = await chai.request(app).delete(`/question/api/${id}`);

      expect(res).to.have.status(404);
      expect(res).to.be.a("object");
    });
  });
});
