import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();


describe("/user/admin", () => {
  var user: any;
  var admin: any;

  before(async () => {
    user = await chai.request(app)
      .post("/user/admin/user/")
      .set("content-type", "application/json")
      .send({
        "display_name": "user",
        "email": "test_user@email.com",
        "password": "123456"
      });

    admin = await chai.request(app)
      .post("/user/admin/admin/")
      .set("content-type", "application/json")
      .send({
        "display_name": "admin",
        "email": "test_admin@email.com",
        "password": "123456"
      });

    Promise.all([user, admin]);
  })
  after(async () => {
    await chai.request(app).delete("/user/admin/user/reset");
  })
  describe("GET /user", () => {
    it("should get all users", async () => {
      const res = await chai.request(app).get("/user/admin/user");

      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data').which.is.an.instanceof(Array).with.length(2);
      expect(res.body['data'][0])
        .to.include.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
    });
  });
  describe(("GET /user/:user_id"), () => {
    it("should get one user", async () => {
      const id = user.body.data._id;
      const res = await chai.request(app).get(`/user/admin/user/${id}`);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('data')
        .which.includes.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
    });
    it("should not get a user", async () => {
      const id = 0;
      const res = await chai.request(app).get(`/user/admin/user/${id}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.all.keys(['message', 'errors']);
    })
  });
  describe(("POST /user"), () => {
    it("should create a user", async () => {
      const res = await chai.request(app).post(`/user/admin/user/`)
        .set("content-type", "application/json")
        .send({
          "display_name": "test",
          "email": "test@email.com",
          "password": "123456"
        });
      user = res;

      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('data')
        .which.includes.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
    });

    it("should not create a user", async () => {
      const res = await chai.request(app).post(`/user/admin/user/`)
        .set("content-type", "application/json")
        .send({
          "display_name": "test",
          "email": "test@email.com",
          "password": "123456"
        });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.all.keys(['errors']);
    })
  });

  describe(("DELETE /user/:user_id"), () => {
    it("should delete one user", async () => {
      const id = user.body.data._id;
      const res = await chai.request(app).delete(`/user/admin/user/${id}`);

      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('is_deleted').which.equals(true);
      expect(res.body).to.have.property('data')
        .which.includes.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
    });
    it("should not delete one user", async () => {
      const id = 0;
      const res = await chai.request(app).delete(`/user/admin/user/${id}`);
      expect(res).to.have.status(404);
      expect(res).to.be.a('object');
      expect(res.body).to.include.all.keys(['errors']);
    });
  });
  describe(("POST /admin"), () => {
    it("should create admin", async () => {
      const res = await chai.request(app)
        .post("/user/admin/admin/")
        .set("content-type", "application/json")
        .send({
          "display_name": "test",
          "email": "test@email.com",
          "password": "123456"
        });

      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('data')
        .which.includes.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
    });
    it("should not create admin", async () => {
      const res = await chai.request(app)
        .post("/user/admin/admin/")
        .set("content-type", "application/json")
        .send({
          "display_name": "thisdoesntmatter",
          "email": "test@email.com",
          "password": "randompassword"
        });
      expect(res).to.have.status(404);
      expect(res).to.be.a('object');
      expect(res.body).to.include.all.keys(['errors']);
    });
  });
  describe(("POST /admin/login"), () => {
    it("should login admin", async () => {
      const res = await chai.request(app).post("/user/admin/admin/login")
        .set("content-type", "application/json")
        .send({
          "email": "test_admin@email.com",
          "password": "123456"
        });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('data')
        .that.includes.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
      expect(res.body).to.have.property('login_token');
    });
    it("should not login admin", async () => {
      const res = await chai.request(app).post("/user/admin/admin/login")
        .set("content-type", "application/json")
        .send({
          "email": "invalid_admin@email.com",
          "password": "thisdoesntmatter"
        });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.all.keys(['errors']);
    });
  });
});

describe("/user/api", () => {
  var user: any;

  before(async () => {
    user = await chai.request(app)
      .post("/user/admin/user/")
      .set("content-type", "application/json")
      .send({
        "display_name": "user",
        "email": "test_user@email.com",
        "password": "123456"
      });
  })

  after(async () => {
    await chai.request(app).delete("/user/admin/user/reset");
  });
  describe("POST /login", () => {
    it("should login user", async () => {
      const res = await chai.request(app).post("/user/api/login")
        .set("content-type", "application/json")
        .send({
          "email": "test_user@email.com",
          "password": "123456"
        });
      user = res.body;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('data')
        .that.includes.all.keys(['_id', 'display_name', 'email', 'password_hash', 'role', 'elo', 'created_at', 'updated_at']);
      expect(res.body).to.have.property('login_token');
    });
    it("should not login user", async () => {
      const res = await chai.request(app).post("/user/api/login")
        .set("content-type", "application/json")
        .send({
          "email": "invalid_user@email.com",
          "password": "thisdoesntmatter"
        });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.all.keys(['errors']);
    });
  });
  describe("GET /auth", () => {
    it("should authenticate", async () => {
      const res = await chai.request(app).get("/user/api/auth")
        .set("Authorization", user.login_token)
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data');

    });
    it("should not authenticate", async () => {
      const res = await chai.request(app).get("/user/api/auth")
        .set("Authorization", "invalid_token");
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
    });
  });
  describe("GET /email/:email", () => {
    it("should get user", async () => {
      const email = user.data.email;
      const res = await chai.request(app).get(`/user/api/email/${email}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data');

    });
    it("should not get user", async () => {
      const email = "invalid_email@email.com";
      const res = await chai.request(app).get(`/user/api/email/${email}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.key('errors')
    });
  });
  describe("GET /:user_id", () => {
    it("should get user", async () => {
      const id = user.data._id
      const res = await chai.request(app).get(`/user/api/${id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data');

    });
    it("should not get user", async () => {
      const id = "invalid_id"
      const res = await chai.request(app).get(`/user/api/${id}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys(['errors', 'message'])
    });
  });
  describe("PUT /elo/:user_id", () => {
    it("should update elo", async () => {
      const id = user.data._id
      const res = await chai.request(app).put(`/user/api/elo/${id}`)
        .send({ "elo": 123 });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data');

    });
    it("should not update elo", async () => {
      const id = "invalid_id"
      const res = await chai.request(app).put(`/user/api/elo/${id}`)
        .send({ "elo": 123 });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys(['errors'])
    });
  });
  describe("PUT /:user_id", () => {
    it("should update user", async () => {
      const id = user.data._id
      const res = await chai.request(app).put(`/user/api/`)
        .send({
          "_id": id,
          "display_name": "test_user"
        });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data').with.property('display_name').which.equals('test_user');

    });
    it("should not update user", async () => {
      const id = "invalid_id"
      const res = await chai.request(app).put(`/user/api/`)
        .send({
          "_id": id,
          "display_name": "test_user"
        });

      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys(['errors'])
    });
  });

  describe("POST /logout", () => {
    it("should logout", async () => {
      const res = await chai.request(app).post("/user/api/logout")
        .set("content-type", "application/json")
        .send({
          "email": "test_user@email.com"
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('data');

    });
    it("should not logout", async () => {
      const res = await chai.request(app).post("/user/api/logout")
        .set("content-type", "application/json")
        .send({
          "email": "invalid_user@email.com"
        });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.all.keys(['errors']);
    });
  });
});
