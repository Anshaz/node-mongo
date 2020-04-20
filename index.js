const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

/*assert function allows to check the if the error is null*/
MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);
    console.log('Connected correctly to the server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({ "name": "Uthappizaa", "description": "test" },
        (err, result) => {

            assert.equal(err, null);

            console.log('After Insert: \n');
            console.log(result.ops);

            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);

                console.log('Found: \n');
                console.log(docs);

            });


        });
});