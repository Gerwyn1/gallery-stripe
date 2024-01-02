const mongodb=require("mongodb");
const getDb = require('./database').getDb;

class Room {
    constructor(name, desc, images,art_id,id) {
        this.name = name;
        this.desc = desc;
        this.images = images instanceof Array ? images : [images];
        this.art_id = art_id
        this._id = id

        
    }

    save() {
        const db = getDb();
        let db0p;
        if(this._id){
           db0p=db
                .collection("room")
                .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
        }
        else{
            db0p=db.collection('room').insertOne(this)
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

        return db.collection('room').find().toArray()
        .then(result => {
            console.log("Result:" , result)
            return result
        }).catch(err => {
            console.log(err)
        });
    }
    static findById(roomid){
        const db=getDb();
        return db
        .collection('room')
        .find({_id:roomid})
        .next()
        .then(roomid=>{
            console.log(roomid);
            return roomid;
        })
        .catch(err=>{
            console.log(err)
        })
    }
    static findByArtId(artid) {
        const db = getDb();
        return db
            .collection('room')
            .find({ art_id: artid })
            .toArray()
            .then(arts => {
                console.log(arts);
                return arts;
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    static deleteById(artid){
        const db = getDb();
        return db
        .collection("room")
        .deleteOne({_id: new mongodb.ObjectId(artid)})
        .then(result=>{
            console.log("Deleted")
        })
        .catch(err=>{
            console.log(err);
        })
        
    }

}


module.exports = Room;
