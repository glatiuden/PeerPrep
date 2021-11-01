process.env.NODE_ENV = "test";

import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

const should = chai.should();
chai.use(chaiHttp);

describe("GET_MATCHES", () => {
  it("returns all matches", (done) => {
      chai
          .request(app)
          .get("/match/admin")
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            done();
          });
  });
});

describe("CREATE_MATCH", () => {
  it("creates a match", () => {
      const match = {
        partner1_id: "6169b3aa8b3147cb0a8d5000",
        question_id: "6169b3aa8b3147cb0a8d5000",
        status: "waiting",
        programming_languages: ["java", "python"],
        mode: "question",
      };

      chai
          .request(app)
          .post("match/api")
          .send(match)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.partner1_id.should.be.eql(match.partner1_id);
            res.body.question_id.should.be.eql(match.question_id);
            res.body.match.should.have.property("programming_languages");
            res.body.mode.should.be.eql(match.mode);
          });      
  });
})

describe("/DELETE_MATCH", () => {
  let match : any;
  before(async () => {
    match = await  chai.request(app).post("/match/api").send({
        partner1_id: "6169b3aa8b3147cb0a8d5000",
        question_id: "6169b3aa8b3147cb0a8d5000",
        status: "waiting",
        programming_languages: ["java", "python"],
        mode: "question"
    })
  })
  it("deletes a match", async () => {
    const id = match._id;
    await chai.request(app).delete(`/match/api/${id}`).end((err, res) => {
       res.should.have.status(200);
    }); 

  })
})

describe("/UPDATE_MATCH", () => {
  let match : any;
  before(async () => {
    match = await  chai.request(app).post("/match/api").send({
        partner1_id: "6169b3aa8b3147cb0a8d5000",
        question_id: "6169b3aa8b3147cb0a8d5000",
        status: "waiting",
        programming_languages: ["java", "python"],
        mode: "question"
    })
  })
  it("updates a match", async () => {
     const id = match._id;
     await chai.request(app).put(`/match/api/${id}`).send({
      partner1_id: "6169b3aa8b3147cb0a8d5000",
      question_id: "6169b3aa8b3147cb0a8d5000",
      status: "completed",
      programming_languages: ["java", "python"],
      mode: "question"
     }).end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.be.eql("completed");
     });     
  })
})

