/* eslint-disable no-undef */
/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

// Assertion style
chai.should();
chai.use(chaiHttp);

const token = `${process.env.TOKEN_ADMIN}`;

describe("Wallets API", () => {
  describe("GET/ the list of wallets with specification below:", () => {
    it("body should get an output with data type object", (done) => {
      chai
        .request(app)
        .get("/wallet")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.have.all.keys(
            "status",
            "code",
            "data",
            "message",
            "pagination"
          );
          done();
        });
    });

    it("it should have property status", (done) => {
      chai
        .request(app)
        .get("/wallet")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("status");
          response.body.status.should.be.a("string");
          response.body.status.should.be.equal("Success");
          done();
        });
    });

    it("it should have property code with statusCode: 200", (done) => {
      chai
        .request(app)
        .get("/wallet")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("code");
          response.should.have.status(200);
          response.body.code.should.be.a("number");
          done();
        });
    });

    it("it should have property data", (done) => {
      chai
        .request(app)
        .get("/wallet")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("data");
          response.body.data.should.be.a("array");
          response.body.should.have.deep.nested.property("data[0]", {
            id: `${response.body.data[0].id}`,
            user_id: `${response.body.data[0].user_id}`,
            balance: parseInt(`${response.body.data[0].balance}`),
            amount_topup: parseInt(`${response.body.data[0].amount_topup}`),
            created_at: `${response.body.data[0].created_at}`,
            updated_at: `${response.body.data[0].updated_at}`
            // password: `${response.body.data[0].password}`
          });
          done();
        });
    });

    it("it should have property message", (done) => {
      chai
        .request(app)
        .get("/wallet")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("message");
          response.body.message.should.be.a("string");
          response.body.message.should.be.equal(
            `Data requests success! Total Wallets: ${response.body.pagination.totalWallet}`
          );
          done();
        });
    });

    it("it should have property pagination", (done) => {
      chai
        .request(app)
        .get("/wallet")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("pagination");
          response.body.pagination.should.be.a("object");
          response.body.pagination.should.have.all.keys(
            "currentPage",
            "limit",
            "totalWallet",
            "totalPage"
          );
          done();
        });
    });

    // it("it should get query limit", (done) => {
    //   chai
    //     .request(app)
    //     .get("/wallet?limit=2")
    //     .set({ Authorization: `Bearer ${token}` })
    //     .end((err, response) => {
    //       done();
    //     });
    // });

    it("it should NOT GET all wallets with statusCode: 404", (done) => {
      chai
        .request(app)
        .get("/user")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("code");
          response.should.have.status(404);
          done();
        });
    });
  });

  describe("PUT/ Top Up with specification below:", () => {
    it("body should get an output with data type object", (done) => {
      const changePhoneNumber = {
        amount_topup: 50
      };
      chai
        .request(app)
        .put("/wallet/topup")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.have.all.keys(
            "status",
            "code",
            "data",
            "message"
          );
          done();
        });
    });

    it("it should have property status", (done) => {
      const changePhoneNumber = {
        amount_topup: 50
      };
      chai
        .request(app)
        .put("/wallet/topup")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.have
            .property("status")
            .a("string")
            .equal("Success");
          done();
        });
    });

    it("it should have property code with statusCode: 200", (done) => {
      const changePhoneNumber = {
        amount_topup: 50
      };
      chai
        .request(app)
        .put("/wallet/topup")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.have.property("code").a("number");
          response.should.have.status(200);
          done();
        });
    });

    it("it should have property data", (done) => {
      const changePhoneNumber = {
        amount_topup: 50
      };
      chai
        .request(app)
        .put("/wallet/topup")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.have.property("data");
          response.body.data.should.be.a("object");
          response.body.data.should.have.all.keys(
            "amount_topup",
            "balance",
            "updated_at"
          );
          done();
        });
    });

    it("it should have property message", (done) => {
      const changePhoneNumber = {
        amount_topup: 50
      };
      chai
        .request(app)
        .put("/wallet/topup")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.have
            .property("message")
            .a("string")
            .equal(`Top Up ${response.body.data.amount_topup} success!`);
          done();
        });
    });

    it("it should NOT PUT/ Top Up with statusCode: 404", (done) => {
      chai
        .request(app)
        .get("/users/to")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("code");
          response.should.have.status(404);
          done();
        });
    });
  });
});
