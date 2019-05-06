const assert = require('assert');

exports.insertDocument = (db, document, collection, callback ) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err,result) => {
        assert.equal(err, null);

        console.log("Document "+ result.result.n + "inserted into collection "+ coll);
        callback(result);
    });
};


exports.updateDocument = (db, document, update, collection, callback) =>{
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: update}, null, (err,result) =>{
        assert.equal(err, null);
        console.log("doccument update");
    });



};

exports.updateAllDocument = (db, document, update, collection, callback) =>{
    const coll = db.collection(collection);
    coll.updateMany(document, {$set: update}, null, (err,result) =>{
        assert.equal(err, null);
        console.log("doccument update");
    });
    };

exports.findDocument = (db,document, collection, callback) =>{
    const coll = db.collection(collection);
    coll.find(document).toArray((err, result) => {
        assert.equal(err, null);
        callback(result);
    });
};


exports.removeDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    coll.removeOne(document, (err,result) =>{
        assert.equal(err, null);

        console.log("deleted");
    });
};