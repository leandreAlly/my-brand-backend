import mongoose from "mongoose";
import User from "../models/User";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

let should = chai.should();


chai.use(chaiHttp);

describe('it should signup and login and generate token', (done) => {
    after((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });


    it('should signup for user', (done) => {
        const user = {
            name:'testname',
            email: "mytestusser@email.com",
            password: "passcode"
          }
    chai.request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
            res.should.have.status(201)
            res.body.should.be.a('object')

         done();
        });
    });

    it('should login for registered user and Generate Token', (done) => {

        const login = {
            email: "mytestusser@email.com",
            password: "passcode"
          }

          let tokens = ""
    chai.request(server)
        .post('/api/auth/login')
        .send(login)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('token')
            tokens = res.body.token

            console.log(tokens)

         done();
        });

    });

    
    






})
