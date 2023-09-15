require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //Commenting this out access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// console.log(process.env)
mongodb();

app.use((req, res, next)=>{
  res.setHeader("Access-Cantrol-Allow-Origin", "https://localhost:3000")
  res.header(
    "Acess-Cantrol-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(cors(corsOptions)) // Use this after the variable declaration
// app.use(cors());
// app.options('*', cors());
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello to the API for goFoodProject, you can access the endpoints with POST method. The endpoints are /api/createuser, /api/myOrderData, /api/loginuser, /api/foodData')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})