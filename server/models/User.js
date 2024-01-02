const getDb = require('./database').getDb;
const mongodb = require("mongodb");
const { ObjectId } = require('mongodb');
class User {
    constructor(name, email, password, phone, id) {
        this.name = name
        this.first_name = null
        this.last_name = null
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.postal = null;
        this.address = null;
        this.admin = false;
        this.country = null;
        
        this._id = id

    }

    save() {
        const db = getDb();
        let db0p;
        if (this._id) {
            db0p = db
                .collection("users")
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this })
        }
        else {
            db0p = db.collection('users').insertOne(this)
        }
        return db0p
            .then(result => {
                console.log("Result:", result);
            })
            .catch(err => {
                console.log(err);
            });
    }
    static fetchAll() {
        const db = getDb();

        return db.collection('users').find().toArray()
            .then(result => {
                console.log("Result:", result)
                return result
            }).catch(err => {
                console.log(err)
            });
    }

    static findById(userid) {
        const db = getDb();
        return db
            .collection('users')
            .find({ _id: new ObjectId(userid) })
            .next()
            .then(user => {
                console.log("user", user);
                return user;
            })
            .catch(err => {
                console.log("error", err)
            })
    }
    static findByemail(useremail) {
        const db = getDb();
        return db
            .collection('users')
            .find({ email: useremail })
            .next()
            .then(user => {
                console.log(user, "null");
                return user;
            })
            .catch(err => {
                console.log(err, "err")
            })
    }
    static findByphone(userphone) {
        const db = getDb();
        return db
            .collection('users')
            .find({ phone: userphone })
            .next()
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err)
            })
    }
    static deleteById(userid) {
        const db = getDb();
        return db
            .collection("users")
            .deleteOne({ _id: new mongodb.ObjectId(userid) })
            .then(result => {
                console.log("Deleted")
            })
            .catch(err => {
                console.log(err);
            })

    }

    updateCountry(newCountry) {
        this.country = newCountry;
    }

    updateAddress(newAddress) {
        this.address = newAddress;
    }

    updatePostal(newPostal) {
        this.postal = newPostal;
    }
    createAdmin(){
        this.admin=true
    }
}
module.exports = User;
