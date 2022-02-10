
import mongoose from "mongoose";
import Message from "../models/message";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
let should = chai.should();


chai.use(chaiHttp);
describe('Message', () => {
    beforeEach((done) => { 
        Message.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET Message', () => {
      it('it should GET all the messages', (done) => {
        chai.request(server)
            .get('/api/message')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  
  it('it should  POST a message', (done) => {
    let message = {
        name: "allyleandre",
        email: "leandre@gmail.com",
        message: "this is content message"
    }
    chai.request(server)
        .post('/api/message')
        .send(message)
        .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
        });
    });
 
});