process.env.NODE_ENV = 'test'

const mongoose = require('mongoose');
const User = require('../models/User');
const Article = require('../models/article');
const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion
chai.should();
chai.use(chaiHttp);

const loginDetails = {

    user: {
        email: "newtest@email.com",
        password: "passcode"

    },
    tokens: {
        user:''
    }
    
}


describe('*********** ARTICLES ***********', () => {
              

    describe('/POST login', () => {
        it('it should GET token', (done) => {
          chai
            .request(server)
            .post('/api/auth/login')
            .send(loginDetails.user)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.an('object')
              res.body.should.have.property('token')
              token = res.body.token
             
              done()
              console.log(token);
            })
        })
        
      })
      
      describe('/GET Articles', () => {

        it('it should NOT be able to consume the route since no token was sent', (done) => {
          chai
            .request(server)
            .get('/cities')
            .end((err, res) => {
              res.should.have.status(404)
              done()
              
            })
        })

        it('it shoul return all Articles', (done) => {

            chai.request(server)
                .get('/api/post')
                .set('Authorization', `Bearer ${token}`)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eq(1);
                    done();
                }).catch(done)

           
        });


        
     

    })

      

    
     })
    
    
        
      //---------------------------------------------------------------

      
    //     describe('/POST Message', () => {   
    //         it('it should send a message ', (done) => {
    //           let message = {
    //            name: "this is name",
    //             email: "testmail@mail.com",
    //             message: "this is message to send for admin",
    //             userId: "this is userId"
    //           }
    //               chai.request(server)
    //               .post('/api/message')
    //               .send(message)
    //               .end((err, res) => {
    //                     res.should.have.status(201);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('message').eql('message sent successfully');

    //                 done();
    //               });
    //         });
    //    });
    


















