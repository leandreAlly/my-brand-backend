
import mongoose from "mongoose";
import User from "../models/User";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';


chai.use(chaiHttp);

describe('it should signup and login', (done) => {
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

    it('should not login without email', (done) => {
        let logins = {
            email: "",
            password: "passcode"
          }
    chai.request(server)
        .post('/api/auth/login')
        .send(logins)
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')

         done();
        });



    })
    it('should not login without password', (done) => {
        let logins = {
            email: "mytestusser@email.com",
            password: ""
          }
    chai.request(server)
        .post('/api/auth/login')
        .send(logins)
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')

         done();
        });



    })

   


    it('should login for registered user', (done) => {

        const login = {
            email: "mytestusser@email.com",
            password: "passcode"
          }
    chai.request(server)
        .post('/api/auth/login')
        .send(login)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')

         done();
        });

    });

    
    






})



