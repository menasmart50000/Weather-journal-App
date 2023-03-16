// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express  and body-parser to run server and routes
const express = require('express');
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const body = app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//server Creation
const local_port = 8888;

app.listen(local_port, function(){
    console.log(`server is runing on port ${local_port}`);
});

    
//POST route  to the server side 
let data = {};

app.post("/posturl",function(req,res){
   data = req.body;
   res.send(data);
   console.log(data);
});

//GET route to server side 

app.get("/geturl",function(req,res){
    
    res.send(data);
    console.log(data);
    
})

