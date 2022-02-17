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


// Connecting MongDB
mongoose.connect("mongodb+srv://leandre:Ally0788!@cluster0.vnywd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => {
    console.log('Successfully connected to MongoDB !');//validation if it is connected
})
.catch((error) => {
    console.log('Unable to connect to MongoDB !');//Return error if it not connected 
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
    servers: [
        {
            url: "https://portifolio-leandre-blog.herokuapp.com"
        },
], 
    },  
      apis: ["./routes/*.js"],
  }

const specs = swaggerJsDoc(options)

  const app = express();
  
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));//new
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors({
    origin:"*"
}) )
app.use(express.json());
app.use('/api/message',messageRoutes);
app.use('/api/post',articleRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/like', likeRoutes);

app.get('/', (req,res) => {
    res.send("Welcome to Blog API!")
   
});

module.exports = app;
