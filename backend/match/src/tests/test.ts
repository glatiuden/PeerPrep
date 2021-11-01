import _ from "lodash";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe("/match/admin", () =>  {
  let match_id = ""; // Used in retrieval & deletion test
  describe("GET /", () => {
    it("should return all matches", async () => {
      const res = await chai.request(app).get("/match/admin");
      should.exist(res.body);
      res.should.have.status(200);
    });
  });

  describe("GET /:match_id", () => {


  });

  describe("PUT /", () => {


  });


  describe("DELETE /:match_id", () => {
    it("should delete a match", async () => {
      const res = await chai.request(app).delete(`/match/admin/${match_id}`);
      res.should.have.status(200);
    });
  });


});

describe("/match/api", () => {

  let match_id = ""; // Used in retrieval & deletion test
  describe("POST /", () => {
    it("should create a match", async () => {
      const match = {
        partner1_id: "6169b3aa8b3147cb0a8d5000",
        question_id: "6169b3aa8b3147cb0a8d5000",
        status: "waiting",
        mode: "question",
        programming_language: "java",
      };
  
      const res = await chai.request(app).post("/match/api").send(match);
      should.exist(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.property("data").property("partner1_id", match.partner1_id);
      expect(res.body).to.property("data").property("question_id", match.question_id);
      expect(res.body).to.property("data").property("status", match.status);
      expect(res.body).to.property("data").property("mode", match.mode);
      match_id = _.get(res.body, "data._id");
    });
  });

  describe("GET /:match_id", () => {


  });


  describe("PUT /", () => {
    it("should update a match", async () => {
      const res = await chai.request(app).put(`/match/api`).send({
        _id: match_id,
        partner2_id: "6169b3aa8b3147cb0a8d5000",
        status: "completed",
      });
      res.should.have.status(200);
      expect(res.body).to.property("data").property("status", "completed");
    });
  });

  describe("PUT /end", () => {
    
  })

});








