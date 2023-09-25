if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
  
  };


import * as express from "express"
import * as bodyParser from "body-parser"

const cors = require('cors');

import { Request, Response } from "express"
import { AppDataSource } from "./data-source"

import "dotenv/config";

const app = express()









const userRoute=require('./router/user')
const productRoute=require('./router/product')
const paymentRoute=require('./router/payment')


 




app.use(bodyParser.json())
app.use(cors({
  origin:`${process.env.REACT_APP_HOST}`,
  credentials:true
}));






app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

app.use((req:Request, res:Response, next:any) => {
    res.setHeader("Access-Control-Allow-Origin",`${process.env.REACT_APP_HOST}`);
    res.setHeader("Access-Control-Allow-Methods", "DELETE,POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
  })

AppDataSource.initialize().then(async () => {
 


    console.log("Express server has started on port 8000. Open http://localhost:8000/users to see results")

}).catch(error => console.log(error)) 






app.use('/',userRoute)
app.use('/',productRoute)
app.use('/',paymentRoute)





  

 
  
// setup express app here
// ...

// start express server
app.listen(8000,()=>{
    console.log('your port is 8000')
})
 