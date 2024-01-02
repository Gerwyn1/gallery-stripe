const mongodb =require("mongodb");
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;

//database
const mongoConnect=callback =>{
    const encodedPassword = encodeURIComponent(process.env.DBPASS);
    MongoClient.connect(`mongodb+srv://gerwyn:${encodedPassword}@cluster0.h2ih3jr.mongodb.net/?
    `)
    .then(client=>{
        console.log('Connected to database');
        _db = client.db()
        callback(client)
    })
    .catch(err=>{
        console.log(err)
    })
}
const getDb = () =>{
    if(_db){
        return _db;
    }
    throw "No Database Found";
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;