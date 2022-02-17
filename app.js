import express from "express";
import mongoose from 'mongoose';
import messageRoutes from "./routes/message";
import articleRoutes from "./routes/article";
import userRoutes from "./routes/user";
import likeRoutes from "./routes/likes";

// const YAML = require('yamljs');//new
const swaggerUI = require('swagger-ui-express');
// const swaggerJsDoc = YAML.load('./api.yaml');//new
const swaggerJsDoc = require("swagger-jsdoc"); 
const dotenv = require("dotenv").config();


let database = process.env.NODE_ENV === 'dev' ? process.env.DB_URL
                                              : process.env.DB_URL_TEST;

    mongoose
    .connect(database,{ useNewUrlParser: true})
    .then(() => {
        console.log('Successfully connected to MongoDB !');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB !');
        console.error(error);
    })
    

 const options = {
    definition: {
       openapi: '3.0.0',
      info: {
        title: 'BLOG CRUD API',
        version: '1.0.0',
        description: "A simple blog API",
      },
      paths: {},
      security: [
        {
          bearerAuth: [],
        },
      ],
      components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              name: 'bearerAuth',
              in: 'header'
            }
          }
      },
      servers:[
        {url: 'http://localhost:3000'},
        {url: 'https://portifolio-leandre-blog.herokuapp.com'}
      ],
    },  
      apis: ["./routes/*.js"],
  }

const specs = swaggerJsDoc(options)

  const app = express();
  
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));//new
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.json());
app.use('/api/message',messageRoutes);
app.use('/api/post',articleRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/like', likeRoutes);

app.get('/', (req,res) => {
    res.send("Welcome to Blog API!")
   
});

module.exports = app;
