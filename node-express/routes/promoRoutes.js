const express = require('express');
const bodyParser = require('body-parser');

dishRoutes = express.Router();
dishRoutes.use(bodyParser.json());

dishRoutes.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('content-type','text/html');
    next();
})
.get((req,res,next) => {
    res.end('Getting all dishes for you!');
})
.post((req,res,next) =>{
    res.end(`saving dish with name: ${req.body.name} and description: ${req.body.desc}`);
})
.all((req,res,next) =>{
    res.statusCode = 403;
    res.end(`ERROR 403: ${req.method} not supported or Implemented for this API`);
});


dishRoutes.route('/:dishId')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('content-type','text/html');
    next();
})
.get((req,res,next) => {
    res.end(`getting dish id ${req.params.dishId} for you!`);
})
.put((req,res,next) =>{
    res.end(`updating dish ${req.params.dishId} with name: ${req.body.name} and description: ${req.body.desc}`);
})
.all((req,res,next) =>{
    res.statusCode = 403;
    res.end(`ERROR 403: ${req.method} not supported or Implemented for this API`);
});

module.exports = dishRoutes;