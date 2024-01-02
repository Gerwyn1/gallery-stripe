// const { Sequelize } = require('sequelize');
const mongodb=require("mongodb");
const getDb = require('./database').getDb;

class Artwork {
    constructor( artist,desc, images,id) {
        
        this.artist = artist;
        this.images = images instanceof Array ? images : [images];
        this.desc=desc 
        this._id=id
    }

    save() {
        const db = getDb();
        let db0p;
        if(this._id){
           db0p=db
                .collection("artwork")
                .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
        }
        else{
            db0p=db.collection('artwork').insertOne(this)
        }
        return db0p
            .then(result => {
                console.log("Result:" ,result);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    static fetchAll() {
    const db = getDb();

    return db.collection('artwork').find().toArray()
        .then(result => {
            console.log("Result:", result);
            return result;
        })
        .catch(err => {
            console.log(err);
        });
}

    static findById(artid){
        const db=getDb();
        return db
        .collection('artwork')
        .find({_id:artid})
        .next()
        .then(art=>{
            console.log(art);
            return art;
        })
        .catch(err=>{
            console.log(err)
        })
    }
    static deleteById(artid){
        const db = getDb();
        return db
        .collection("artwork")
        .deleteOne({_id: new mongodb.ObjectId(artid)})
        .then(result=>{
            console.log("Deleted")
        })
        .catch(err=>{
            console.log(err);
        })
        
    }

}


module.exports = Artwork;
