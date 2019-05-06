const mongoose = require('mongoose');

const dishes = require('./model/dishes');

const url = 'mongodb://mongodb:mongodb@localhost:27017/mongodb';
var connect = mongoose.connect(url);

    connect.then((client) =>{
        console.log("connectied to mongodb server");
        dishes.create({
            name:'himanshu6',
            description:"himanshu's dish"
        })
        .then((dish)=>{
            dish.comments.push({
            rating: 5,
            comment: "finn dish",
            author: "himanshu"
            });
            dish.comments.push({
                        rating: 3,
                        comment: "review dish",
                        author: "anandani"
                        });
            console.log("dish inserted"+ dish)
            })
        .catch((err)=>{
            console.log("Error while inserting data"+ err);
        });
    })
    .catch((err)=>{
        console.log('Error while connecting mongodb'+ err);
    })
