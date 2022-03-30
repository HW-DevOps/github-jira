const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Task API', () => {


    /**
     * Test the GET route
     */
  // check response text
describe("test / route", () => {
    it("check if index returns status 200", (done) => {
      chai
        .request(server)
        .get("/index")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
  
  //Test if resopnse type is array, response status is 200 and array length is 3
  describe("test /users", () => {
    it("check if status 200 and return type array", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
          // console.log(response);
        });
    });
  });
  // Get the welcome and pass an parameter - userename
  describe(" /welcome route", () => {
    it("get route by id,", (done) => {
      const username = "Kevin Mathew";
      chai
        .request(server)
        .get("/welcome?username=" + username)
        .end((err, response) => {
          response.should.have.status(200);
          done();
          // console.log(response);
        });
    });
  });
  
  // Check if response type is object and retrieve value of the object
  describe("test /user", () => {
    it("check if status 200 and return type array", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id");
          done();
          // console.log(response);
        });
    });
  });
  
  //Test return value of object, property, value
  describe("test /user", () => {
    it("check if status 200 and return type array", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").eq(1);
          done();
          // console.log(response);
        });
    });
  });

    /**
     * Test the POST route
     */

    /**
     * Test the PUT route
     */
})
