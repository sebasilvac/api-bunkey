const app = require("../server/server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("welcomes to Bunkey API", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("verify route login without credentials", done => {
    chai
      .request(app)
      .post("/login")
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe("Login!", () => {

  it("login with false credentials", done => {
    chai
      .request(app)
      .post("/login")
      .send({ email: 'email@email.cl', password: '123' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.ok).to.equals(false);
        expect(res.body.err.message).to.equals("(Usuario) o contraseña incorrectos");
        done();
      });
  });

  it("login without email", done => {
    chai
      .request(app)
      .post("/login")
      .send({ password: '123' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.ok).to.equals(false);
        expect(res.body.err.message).to.equals("(Usuario) o contraseña incorrectos");
        done();
      });
  });

  it("login without password", done => {
    chai
      .request(app)
      .post("/login")
      .send({ email: 'email@email.cl' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.ok).to.equals(false);
        expect(res.body.err.message).to.equals("(Usuario) o contraseña incorrectos");
        done();
      });
  });

  it("login with correct credentials", done => {
    chai
      .request(app)
      .post("/login")
      .send({ email: 'admin16@mail.com' , password: '123456' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.ok).to.equals(true);
        done();
      });
  });

  it("verify correct response", done => {

    const email = 'admin16@mail.com';

    chai
      .request(app)
      .post("/login")
      .send({ email: email , password: '123456' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.ok).to.equals(true);    
        expect(res.body.user).to.exist;
        expect(res.body.token).to.exist;
        expect(res.body.user.email).to.equals(email);
        done();
      });
  });

  let token;
  it("verify access with jwt", done => {

    chai
      .request(app)
      .post("/login")
      .send({ email: 'admin16@mail.com' , password: '123456' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.ok).to.equals(true);    
        expect(res.body.token).to.exist;
        token = res.body.token;

        chai
        .request(app)
        .get("/user")
        .set("token", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.ok).to.equals(true); 
          done();
        });

      });

   
  });

});