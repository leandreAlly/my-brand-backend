process.env.NODE_ENV = 'test'
const mongoose = require('mongoose');
const User = require('../models/User');

const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require('chai');

//Assertion
chai.should();
chai.expect();
chai.use(chaiHttp);

const createdID = []

const loginDetails = {
    
    register: {
        name:'mytestuser',
        email: "mytestuser@email.com",
        password: "passcode"

    },

    user: {
        email: "newtest@email.com",
        password: "passcode"

    },
    tokens: {
        user:''
    }
    
}

describe('*********** USERS ***********', () => {
  
    describe('/POST login', () => {
        it('it should GET token as user', (done) => {
          chai
            .request(server)
            .post('/api/auth/login')
            .send(loginDetails.user)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.an('object')
              res.body.should.have.property('token')
              loginDetails.user.tokens = res.body.token
              
              done()
           
            })
        })
      })

      describe('/GET users', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
          chai
            .request(server)
            .get('/api/post')
            .end((err, res) => {
              res.should.have.status(403)
              done()
            })
        })

    })
    describe('/POST SignUp for user', () => {
        it('it should NOT create a user without name', (done) => {
          const user = {
            name:'',
            email: "mytestuser@email.com",
            password: "passcode"
          }
          chai
            .request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, res) => {
              res.should.have.status(400)
              res.body.should.be.a('object')
              done()
            })
        })

    })

    it('it should POST a user ', (done) => {
        const register = {
            name:'mytestusers',
            email: "mytestsaucsfvdr@email.com",
            password: "passcode"
        }
        chai
          .request(server)
          .post('/api/auth/signup')
          .send(register)
          .end((err, res) => {
            res.should.have.status(201)
            res.body.should.be.a('object')
            done()
          })
      })






      after(() => {
        createdID.forEach((id) => {
          User.findByIdAndRemove(id, (err) => {
            if (err) {
              console.log(err)
            }
          })
        })
      })
});

