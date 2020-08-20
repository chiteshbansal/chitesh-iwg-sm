const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');
const { findById } = require('./products');

class User {
    constructor(username,email){
        this.name  = username;
        this.email  = email;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this).then(result=>{
            console.log(result);
        }).catch(error=>{
            console.log(error);
        })
    }

    static findById(userId){
        const db = getDb();
        return db.collection('users').find({_id:new mongodb.ObjectID(userId)}).next().then(user=>{
            console.log(user);
            return user;
        }).catch(error=>{
            console.log(error);
        })
    }
}

module.exports = User;