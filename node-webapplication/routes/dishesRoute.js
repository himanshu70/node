const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const dishesModel = require('../model/dishesModel');

const dishesRoute = express.Router();
dishesRoute.use(bodyParser.json());

dishesRoute.route('/')
.get((req,res,next)=>{
    console.log("request recived");
    dishesModel.find({})
    .then((dishes)=>{
    res.statusCode = 200;
    res.setHeader("content-Type","application/json");
    res.json(dishes);
    }, (err) => next(err))
    .catch((err)=> {
        res.statusCode = 303;
        res.setHeader("content-Type","application/json");
        res.json('{"msg": "Error while retrieving data from DB"}');

    });
})
.post((req,res,next)=>{
    dishesModel.create(req.body)
    .then((dish)=>{
    res.statusCode = 200;
    res.setHeader("content-Type","application/json");
    res.json(dish);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.setHeader("content-Type","application/json");
    err = new Error(req.method + "not supported by this API");
    err.status = 403;
    res.json(err);

})
.delete((req,res,next)=>{
    dishesModel.remove()
    .then((resp)=>{
    res.statusCode = 200;
    res.setHeader("content-Type","application/json");
    res.json(resp);
    }, (err) => next(err))
    .catch((err)=> next(err));
})


dishesRoute.route('/:dishId')
.get((req,res,next) => {
    dishesModel.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res, next)  =>{
    dishesModel.findByIdAndUpdate(req.params.dishId,{$set: req.body},{new:true})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete((req, res, next) => {
    dishesModel.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishesRoute.route('/:dishId/comments')
.get((req,res,next) => {
    dishesModel.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish.comments);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
     dishesModel.findById(req.params.dishId)
            .then((dish) => {
             if (dish != null){
                dish.comments.push(req.body);
                dish.save()
                .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
                },(err)=>next(err));
            } else{
            err = new Error("dish not found with id "+ req.param.dishId);
            err.statusCode = 200;
                            return next(err);
            }},(err) => next(err))
            .catch((err) => next(err));
})
.put((req,res, next)  =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'+ req.params.dishId);
})
.delete((req, res, next) => {
    dishesModel.findById(req.params.dishId)
    .then((dish) => {
     if (dish != null) {
    for( var i= (dish.comments.length - 1); i>=0; i-- ){
        dish.comments.id(dish.comments[i]._id).remove();
    }
    dish.save()
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err));
    }
    else{
    err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
    }
    },(err) => next(err))
    .catch((err) => next(err));
});


dishesRoute.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    dishesModel.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish.comments.id(req.params.commentId));
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res, next)  =>{
     dishesModel.findById(req.params.dishId)
                .then((dish) => {
                 if (dish != null && dish.comments.id(req.params.commentId).comment != null){
                    if(req.body.comment){
                    dish.comments.id(req.params.commentId).comment = req.body.comment;}
                    if(req.body.rating){
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    dish.save()
                    .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                    },(err)=>next(err));
                } else{
                err = new Error("dish not found with id "+ req.param.dishId);
                err.statusCode = 403;
                                return next(err);
                }},(err) => next(err))
                .catch((err) => next(err));
})
.delete((req, res, next) => {
    dishesModel.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId).comment != null ){
        dish.comments.id(req.params.commentId).remove();
        } else {
        err = new Error("dish not found with id "+ req.param.dishId);
                        err.statusCode = 403;
                                        return next(err);
        }
    dish.save()
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err) => next(err))

})
.catch((err) => next(err));
});


module.exports = dishesRoute;