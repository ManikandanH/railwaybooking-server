const MongoClient = require("mongodb").MongoClient;

const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@railwaydev-tkkpi.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

function dbOperations(collectionName, callBack) {
    client
        .connect()
        .then((dbObject) => {
            const dbCollection = dbObject.db("InitialDB").collection(collectionName);
            callBack(dbCollection);
        })
        .catch((err) => {
            console.log(err);
            client.close();
        });
}

module.exports = dbOperations;