const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

/*assert function allows to check the if the error is null*/
MongoClient.connect(url).then((client) => {


    console.log('Connected correctly to the server');

    const db = client.db(dbname);
/*DEMONSTRATING CALLBACK HELL WHERE FUNCTION IS NESTED INSIDE ANOTHER FUNTION.
 * AFTER INTRODUCING PROMISES, CALLBACK HELL CAN BE RESOLVED AND THE
 * CODE WILL LOOK MORE EASY TO UNDERSTAND*/
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes");

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

            return client.close();
        })
        .catch((err) => console.log(err));

})
    .catch((err) => console.log(err));