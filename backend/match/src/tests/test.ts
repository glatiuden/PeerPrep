import _ from "lodash";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Admin
describe("/match/admin", () =>  {
  let match_id = ""; // Used in retrieval & deletion test
  let match: any;

  describe("POST /",  () => {
    it ("should create a match", async () => {
      const res = await chai.request(app).post("/match/api").send({
        partner1_id: "61816a0875c56d6d98fa510e",
        question_id: "61816a0875c56d6d98fa510e",
        status: "waiting",
        mode: "question",
        programming_language: "java",
      });
      
      should.exist(res.body);
      res.should.have.status(200);
      expect(res.body).to.be.a("object");
      match_id = _.get(res.body, "data._id");
    });   

  });

  describe("GET /", () => {
    it("should return all matches", async () => {
      const res = await chai.request(app).get("/match/admin");
      should.exist(res.body);
      res.should.have.status(200);
      expect(res.body).to.be.a("object");
      
    });
  });

  describe("GET /:match_id", () => {
    it("should return a match", async () => {
      const res = await chai.request(app).get(`/match/admin/${match_id}`);
      res.should.have.status(200);
      should.exist(res.body);
    });

    it("should not return a match", async () => {
      const temp_id = "61816a0875c56d6d98fa510e" ;
      const res = await chai.request(app).get(`/match/admin/${temp_id}`);
      res.should.have.status(404);
    })

  });

  describe("PUT /", () => {
    it("should update a match", async () => {
      const res = await chai.request(app).put(`/match/admin`).send({
        _id: match_id,
        status: "completed",
      });
      res.should.have.status(200);
      expect(res.body).to.property("data").property("status", "completed");
    });

    it("should not update a match", async () => {
      const temp_id = "61816a0875c56d6d98fa510e" ;
      const res = await chai.request(app).put(`/match/admin`).send({
        _id: temp_id,
        status: "completed",
      });
      res.should.have.status(404);
    });

  });


  describe("DELETE /:match_id", () => {
    it("should delete a match", async () => {
      const res = await chai.request(app).delete(`/match/admin/${match_id}`);
      res.should.have.status(200);
    });

    it("should not delete a match", async () => {
      const temp_id = "61816a0875c56d6d98fa510e" ;
      const res = await chai.request(app).delete(`/match/admin/${temp_id}`);
      res.should.have.status(404);
    });
  });

  describe("DELETE /hard-delete/:match_id", () => {
    it("should hard delete a match", async () => {
      const res = await chai.request(app).delete(`/match/admin/${match_id}`);
      res.should.have.status(200);
    });

    it("should not hard delete a match", async () => {
      const temp_id = "61816a0875c56d6d98fa510e" ;
      const res = await chai.request(app).delete(`/match/admin/${temp_id}`);
      res.should.have.status(404);
    });
  })

});

// API
describe("/match/api", () => {

  let match_id = ""; // Used in retrieval & deletion test
  let match: any;

  describe("POST /",  () => {
    it ("should create a match", async () => {
      const res = await chai.request(app).post("/match/api").send({
        partner1_id: "61816a0875c56d6d98fa510e",
        question_id: "61816a0875c56d6d98fa510e",
        status: "waiting",
        mode: "question",
        programming_language: "java",
      });
      
      should.exist(res.body);
      res.should.have.status(200);
      expect(res.body).to.be.a("object");
      match_id = _.get(res.body, "data._id");
    });   

  });

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
      // match_id = _.get(res.body, "data._id");
    });

    it("should not create a match", async () => {
      const match = {
        question_id: "6169b3aa8b3147cb0a8d5000",
        status: "waiting",
        mode: "question",
        programming_language: "java",
      };
  
      const res = await chai.request(app).post("/match/api").send(match);
      should.not.exist(res.body.data);
      expect(res).to.have.status(422); // missing field
    })

  });

  describe("GET /:match_id", () => {
    it("should return a match", async () => {
      const res = await chai.request(app).get(`/match/api/${match_id}`);
      res.should.have.status(200);
      should.exist(res.body);
    });

    it("should not return a match", async () => {
      const temp_id = "6169b3zz8b3147cb0a8d5000";
      const res = await chai.request(app).get(`/match/api/${temp_id}`);
      res.should.have.status(422);
    })
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

    it("should not update a match", async () => {
      const temp_id = "61816a0875c56d6d98fa510e" ;
      const res = await chai.request(app).put(`/match/api`).send({
        _id: temp_id,
        status: "completed",
      });
      res.should.have.status(404);
    });

  });

  describe("PUT /end", () => {
      it("should end a match", async () => {
        const res = await chai.request(app).put(`/match/api/end`).send({
           match_id
        });
        res.should.have.status(200);
      });

      it("should not end a match", async () => {
        const temp_id = "6169b3zz8b3147cb0a8d5000";
        const res = await chai.request(app).put(`/match/api/end`).send({
          match_id: temp_id
        });
        res.should.have.status(422);
      });
  })

});








