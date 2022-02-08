
let mongoose = require('mongoose');
let User = require('../models/message');


const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Test All Message APIs', () => {
     
    describe('Test GET route /api/message', () => {
      
        it('it shoul return all Message', (done) => {
            chai.request(server)
                .get('/api/message')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eq(1);

                    done();
                });
        });
    });


      
        describe('/POST Message', () => {   
            it('it should send a message ', (done) => {
              let message = {
               name: "this is name",
                email: "testmail@mail.com",
                message: "this is message to send for admin",
                userId: "this is userId"
              }
                  chai.request(server)
                  .post('/api/message')
                  .send(message)
                  .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('message sent successfully');

                    done();
                  });
            });
        });
    
});

























// let mongoose = require("mongoose");
// let Article = require("../models/article");

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let should = chai.should();
// let server = require("../app");
// chai.use(chaiHttp);

// // Test the Post routes
// describe('POST /post', () => {

//     describe('Article', () => {
//         beforeEach((done) => {
//         Article.remove({}, (err) => {
//            done();  
//         });
//         });
         
        // describe('/POST posts', () => {   
        //     it('it should create a post ', (done) => {
        //       let post = {
        //         title: "this is title",
        //         content: "thi is content",
        //         imageUrl: "this is imageUrl",
        //         userId: "this is userId"
        //       }
        //           chai.request(server)
        //           .post('/api/post')
        //         //   here authentican a user
        //           .send(post)
        //           .end((err, res) => {
        //                 res.should.have.status(201);
        //                 res.body.should.be.a('object');
        //                 res.body.should.have.property('message').eql('Post saved successfully!');

        //             done();
        //           });
        //     });
        // });
            
           
 
//   })
// });




