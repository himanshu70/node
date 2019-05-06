const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();
const http = require('http');

const dishes = express.Router();
dishes.route('/')
 .get((req,res,next)=>{
    console.log('request recived for get');
    res.status = 200;
    res.send('Welcome to application with get method');
    })
 .post((req,res,next)=>{
    console.log('request recived for post');
    res.status = 200;
    res.send('Welcome to application with get method');
    })
 .all((req,res,next)=>{
     console.log('request recived for rest');
     res.status = 200;
     res.send('Welcome to application with get method');
    })

/*app.all('/', (req,res,next)=>{
    console.log('request recived');
    res.statusCode =200;
    res.end("Welcome to application ");
})*/
const hostname = 'localhost';
const port = 3001;
//const url = hostname:port

var server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log('server started');
});
