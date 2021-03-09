// mongodb database wrapper
var mongo = require("mongodb");
var client = mongo.MongoClient;

var mongoUrl =
  "mongodb+srv://user-321:northeastern5610@cluster0.3uxdm.mongodb.net/Project2?retryWrites=true&w=majority";

exports.getObjectId = function(id) {
  return new mongo.ObjectId(id);
}

exports.selectAll = function(collection, callback) {
  client.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("proj2");
    dbo
      .collection(collection)
      .find({})
      .sort({'datetime': -1})
      .toArray(function (err, docs) {
        if (err) {
          throw err;
        }
        callback(docs);
        db.close();
      });
  });
}

exports.select = function(collection, filter={}, callback) {
  client.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("proj2");
    dbo
      .collection(collection)
      .find(filter)
      .sort({'datetime': -1})
      .toArray(function (err, docs) {
        if (err) {
          throw err;
        }
        callback(docs);
        db.close();
      });
  });
}

exports.insert = function(collection, obj, callback) {
  client.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("proj2");
    dbo.collection(collection).insertOne(obj, function (err) {
      if (err) throw err;
      db.close();
      if (callback) callback();
    });
  });
}

exports.update = function(collection, filter, updateDoc, options, callback) {
  client.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("proj2");
    await dbo.collection("stories").updateOne(filter, updateDoc, options);
    db.close();
    if (callback) callback();
  });
}