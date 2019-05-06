const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const username='mongodb';
const password='mongodb';
const url = "mongodb://mongodb:mongodb@127.0.0.1:27017/mongodb";
const dbname = 'mongodb';
console.log(url);
const dboper = require('./operation_course');



MongoClient.connect(url).then((client) =>{

	console.log('connected to mongoDB seccessfully');
	const db = client.db(dbname);
	const collection = db.collection('dishes');


   dboper.insertDocument(db, { name: "Vadonut", description: "Test"},"dishes")
          .then((result) => {
              console.log("Insert Document:\n", result.ops);
              return dboper.findDocuments(db, "dishes");
           })
          .then((docs) => {
                  console.log("Found Documents:\n", docs);
                  return dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes");
           })
           .then((result) => {
                  console.log("Updated Document:\n", result.result);
                  return dboper.findDocuments(db, "dishes");
           })
           .then((docs) => {
                  console.log("Found Updated Documents:\n", docs);
                  return db.dropCollection("dishes");
           })
           .then((result) => {
                     console.log("Dropped Collection: ", result);
                     client.close();
           })
           .catch((err) => {
                console.log("Error : " + err);
                client.close();
           });
	})
	.catch((err) => {
                 console.log("Error : " + err);
	});