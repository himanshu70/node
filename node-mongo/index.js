const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const username='mongodb';
const password='mongodb';
const url = "mongodb://mongodb:mongodb@127.0.0.1:27017/mongodb";
const dbname = 'mongodb';
console.log(url);
const dbops = require('./operation');



MongoClient.connect(url, (err, client) =>{
	assert.equal(err,null);

	console.log('connected to mongoDB seccessfully');

	const db = client.db(dbname);
	const collection = db.collection('dishes');
    dbops.insertDocument(db,{"name":"himanshu","desc":"himanshu's dish","price":"120"},'dishes' ,(result) => {
        console.log("inserted"+result.result.ops);
    });

    dbops.updateDocument(db,{"name":"himanshu"}, {"desc":"himanshu's dish chnages"},'dishes', (result) =>{
        console.log("dish updated :" + result.result);
    });

    dbops.updateAllDocument(db,{"name":"himanshu"}, {"desc":"himanshu's dish chnages"},'dishes', (result) =>{
            console.log("dish updated :" + result.result);
        });

   dbops.findDocument(db,{"name":"himanshu"}, 'dishes', (result) =>{
            console.log("records found :" + result);
        });

     dbops.removeDocument(db,{"name":"himanshu"}, 'dishes', (result) =>{
                console.log("records found :" + result);
            });
/*
	collection.insert({"name":"himanshu","desc":"himanshu's dish"}, (err, result) =>{
		assert.equal(err,null);

		console.log("record inserted successfully");
		console.log("number of record updated : " + result);

	
	})
*/
})
