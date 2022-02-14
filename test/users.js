/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

// Assertion style
chai.should();
chai.use(chaiHttp);

const token = `${process.env.TOKEN}`;

describe("Users API", () => {
  describe("GET/ the list of users with specification below:", () => {
    it("body should get an output with data type object", (done) => {
      chai
        .request(app)
        .get("/users")
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
        .get("/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("status");
          response.body.status.should.be.a("string").equal("Success");
          done();
        });
    });

    it("it should have property code with statusCode: 200", (done) => {
      chai
        .request(app)
        .get("/users")
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
        .get("/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("data");
          response.body.data.should.be.a("array");
          response.body.should.have.deep.nested.property("data[0]", {
            id: `${response.body.data[0].id}`,
            first_name: `${response.body.data[0].first_name}`,
            last_name: `${response.body.data[0].last_name}`,
            email: `${response.body.data[0].email}`,
            phone: `${response.body.data[0].phone}`,
            picture: `${response.body.data[0].picture}`,
            role: `${response.body.data[0].role}`,
            verified: `${response.body.data[0].verified}`,
            balance: parseInt(`${response.body.data[0].balance}`),
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
        .get("/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("message");
          response.body.message.should.be
            .a("string")
            .equal(
              `Data requests success! Total accounts: ${response.body.pagination.totalAccount}`
            );
          done();
        });
    });

    it("it should have property pagination", (done) => {
      chai
        .request(app)
        .get("/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("pagination");
          response.body.pagination.should.be.a("object");
          response.body.pagination.should.have.all.keys(
            "currentPage",
            "limit",
            "totalAccount",
            "totalPage"
          );
          done();
        });
    });

    // it("it should get query limit", (done) => {
    //   chai
    //     .request(app)
    //     .get("/users?limit=2")
    //     .set({ Authorization: `Bearer ${token}` })
    //     .end((err, response) => {
    //       done();
    //     });
    // });

    it("it should NOT GET all users with statusCode: 404", (done) => {
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

  describe("GET/ a profile (user details) with specification below:", () => {
    it("body should get an output with data type object", (done) => {
      chai
        .request(app)
        .get("/users/profile")
        .set({ Authorization: `Bearer ${token}` })
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
      chai
        .request(app)
        .get("/users/profile")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have
            .property("status")
            .a("string")
            .equal("Success");
          done();
        });
    });

    it("it should have property code with statusCode: 200", (done) => {
      chai
        .request(app)
        .get("/users/profile")
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
        .get("/users/profile")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("data");
          response.body.data.should.be.a("object");
          response.body.data.should.have.all.keys(
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "balance",
            "picture",
            "created_at",
            "updated_at"
          );
          done();
        });
    });

    it("it should have property message", (done) => {
      chai
        .request(app)
        .get("/users/profile")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have
            .property("message")
            .a("string")
            .equal(
              `Profile with email: ${response.body.data.email} successfully requested from Redis!`
            );
          done();
        });
    });

    it("it should NOT GET a user details with statusCode: 404", (done) => {
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

  describe("POST/ login with specification below:", () => {
    it("body should get an output with data type object", (done) => {
      const login = {
        email: "natasharm.blackwidow@gmail.com",
        password: "wanitatangguh88"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(login)
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
      const login = {
        email: "natasharm.blackwidow@gmail.com",
        password: "wanitatangguh88"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(login)
        .end((err, response) => {
          response.body.should.have
            .property("status")
            .a("string")
            .equal("Success");
          done();
        });
    });

    it("it should have property code with statusCode: 200", (done) => {
      const login = {
        email: "natasharm.blackwidow@gmail.com",
        password: "wanitatangguh88"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(login)
        .end((err, response) => {
          response.body.should.have.property("code");
          response.should.have.status(200);
          response.body.code.should.be.a("number");
          done();
        });
    });

    it("it should have property data", (done) => {
      const login = {
        email: "natasharm.blackwidow@gmail.com",
        password: "wanitatangguh88"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(login)
        .end((err, response) => {
          response.body.should.have.property("data");
          response.body.data.should.be.a("object");
          response.body.data.should.have.all.keys(
            "id",
            "email",
            "role",
            "token"
          );
          response.body.data.id.should.be.a("string");
          response.body.data.email.should.be.a("string");
          response.body.data.role.should.be.a("string");
          response.body.data.token.should.be.a("string");
          response.body.data.id.should.be.equal(`${response.body.data.id}`);
          response.body.data.email.should.be.equal(
            `${response.body.data.email}`
          );
          response.body.data.role.should.be.equal(`${response.body.data.role}`);
          response.body.data.token.should.be.equal(
            `${response.body.data.token}`
          );
          done();
        });
    });

    it("it should have property message", (done) => {
      const login = {
        email: "natasharm.blackwidow@gmail.com",
        password: "wanitatangguh88"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(login)
        .end((err, response) => {
          response.body.should.have
            .property("message")
            .a("string")
            .equal(
              `Account with email: ${response.body.data.email} successfully login!`
            );
          done();
        });
    });

    it("it should NOT POST/ login a user with statusCode: 403", (done) => {
      const login = {
        email: "nooooootasharm.blackwidow@gmail.com",
        password: "wanitatangguh88"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(login)
        .end((err, response) => {
          response.body.should.have.property("code");
          response.should.have.status(403);

          response.body.should.have
            .property("message")
            .equal("Please check your email or password!");
          done();
        });
    });
  });

  describe("PUT/ change phone number from a certain user with specification below:", () => {
    it("body should get an output with data type object", (done) => {
      const changePhoneNumber = {
        phone: "232-2121-9090"
      };
      chai
        .request(app)
        .put("/users/profile")
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
        phone: "232-2121-9090"
      };
      chai
        .request(app)
        .put("/users/profile")
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
        phone: "232-2121-9090"
      };
      chai
        .request(app)
        .put("/users/profile")
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
        phone: "232-2121-9090"
      };
      chai
        .request(app)
        .put("/users/profile")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.have.property("data");
          response.body.data.should.be.a("object");
          response.body.data.should.have.all.keys("phone", "updated_at");
          done();
        });
    });

    it("it should have property message", (done) => {
      const changePhoneNumber = {
        phone: "232-2121-9090"
      };
      chai
        .request(app)
        .put("/users/profile")
        .set({ Authorization: `Bearer ${token}` })
        .send(changePhoneNumber)
        .end((err, response) => {
          response.body.should.have
            .property("message")
            .a("string")
            .equal(
              `Profile phone: ${response.body.data.phone} successfully updated!`
            );
          done();
        });
    });

    it("it should NOT PUT/ change phone number with statusCode: 404", (done) => {
      chai
        .request(app)
        .get("/users/prof")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.body.should.have.property("code");
          response.should.have.status(404);
          done();
        });
    });
  });

  //   describe("POST/ sign up with specification below:", () => {
  //     it("body should get an output with data type object", (done) => {
  //       const signUp = {
  //         firstName: "Meiruko",
  //         lastName: "Tatsuya",
  //         email: "mikochaaan99@gmail.com",
  //         password: "mikomiko99",
  //         PIN: 121256
  //       };
  //       chai
  //         .request(app)
  //         .post("/users/register")
  //         .send(signUp)
  //         .end((err, response) => {
  //           response.body.should.be.a("object");
  //           response.body.should.have.all.keys(
  //             "status",
  //             "code",
  //             "data",
  //             "message"
  //           );
  //           done();
  //           //   console.log(response.body);
  //         });
  //     });

  //     it("it should have property status", (done) => {
  //       const signUp = {
  //         firstName: "Natasha",
  //         lastName: "Romanoff",
  //         email: "natasharm.blackwidow@gmail.com",
  //         password: "wanitatangguh88",
  //         PIN: 121256
  //       };
  //       chai
  //         .request(app)
  //         .post("/users/register")
  //         .send(signUp)
  //         .end((err, response) => {
  //           response.body.should.have
  //             .property("status")
  //             .a("string")
  //             .equal("Success");
  //           done();
  //         });
  //     });

  // it("it should have property code with statusCode: 200", (done) => {
  //   const signUp = {
  //     firstName: "Natasha",
  //     lastName: "Romanoff",
  //     email: "natasharm.blackwidow@gmail.com",
  //     password: "wanitatangguh88",
  //     PIN: 121256
  //   };
  //   chai
  //     .request(app)
  //     .post("/users/register")
  //     .send(signUp)
  //     .end((err, response) => {
  //       response.body.should.have.property("code");
  //       response.should.have.status(200);
  //       response.body.code.should.be.a("number");
  //       done();
  //     });
  // });

  // it("it should have property data", (done) => {
  //   const signUp = {
  //     firstName: "Natasha",
  //     lastName: "Romanoff",
  //     email: "natasharm.blackwidow@gmail.com",
  //     password: "wanitatangguh88",
  //     PIN: 121256
  //   };
  //   chai
  //     .request(app)
  //     .post("/users/register")
  //     .send(signUp)
  //     .end((err, response) => {
  //       response.body.should.have.property("data");
  //       response.body.data.should.be.a("object");
  //       response.body.data.should.have.all.keys(
  //         "id",
  //         "email",
  //         "role",
  //         "token"
  //       );
  //       response.body.data.id.should.be.a("string");
  //       response.body.data.email.should.be.a("string");
  //       response.body.data.role.should.be.a("string");
  //       response.body.data.token.should.be.a("string");
  //       response.body.data.id.should.be.equal(`${response.body.data.id}`);
  //       response.body.data.email.should.be.equal(
  //         `${response.body.data.email}`
  //       );
  //       response.body.data.role.should.be.equal(`${response.body.data.role}`);
  //       response.body.data.token.should.be.equal(
  //         `${response.body.data.token}`
  //       );
  //       done();
  //     });
  // });

  // it("it should have property message", (done) => {
  //   const signUp = {
  //     firstName: "Natasha",
  //     lastName: "Romanoff",
  //     email: "natasharm.blackwidow@gmail.com",
  //     password: "wanitatangguh88",
  //     PIN: 121256
  //   };
  //   chai
  //     .request(app)
  //     .post("/users/register")
  //     .send(signUp)
  //     .end((err, response) => {
  //       response.body.should.have
  //         .property("message")
  //         .a("string")
  //         .equal(
  //           `Registration Success! New account with email: ${response.body.data.email} has been created.`
  //         );
  //       done();
  //     });
  // });
  //   });
});
