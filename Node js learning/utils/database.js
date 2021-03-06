// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete','root','pass123',{dialect:'mysql',host:'localhost'});

// module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callBack) => {
  MongoClient.connect(
    "userMongoServeConnectionString",
    {
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callBack();
    })
    .catch((error) => {
      console.log("error is ", error);
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
