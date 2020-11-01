require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_HOST;

function connectMongo(dbCollection) {

    return new Promise(function(resolve, reject){
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function(err, client) {
            if(err == null){
                const db = client.db();
                const collection = db.collection(dbCollection);
                resolve({
                    find: function(callback){
                        collection.find().limit(10).toArray(function(err, results){
                            callback(results);
                            client.close();
                        });
                    },
                    //findByID: ...
                });
            } else {
                reject(err);
            }
        });
    });
}

module.exports = connectMongo;