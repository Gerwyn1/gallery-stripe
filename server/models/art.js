// const { Sequelize } = require('sequelize');
const mongodb=require("mongodb");
const getDb = require('./database').getDb;

class Art {
    constructor(name, rooms, desc, images,price,id) {
        this.name = name;
        this.rooms = rooms;
        this.desc = desc;
        this.images = images instanceof Array ? images : [images];
        this.price=price 
        this.bought = null
        this._id=id
    }

    save() {
        const db = getDb();
        let db0p;
        if(this._id){
           db0p=db
                .collection("arts")
                .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
        }
        else{
            db0p=db.collection('arts').insertOne(this)
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

    return db.collection('arts').find().toArray()
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
        .collection('arts')
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
        .collection("arts")
        .deleteOne({_id: new mongodb.ObjectId(artid)})
        .then(result=>{
            console.log("Deleted")
        })
        .catch(err=>{
            console.log(err);
        })
        
    }

}


module.exports = Art;
