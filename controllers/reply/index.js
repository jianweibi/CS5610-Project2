/**
 * Module dependencies.
 */

var db = require('../../db');

exports.prefix = "/story"

exports.create = function(req, res, next){
  var reply = {
    storyId: req.body.id,
    username: req.body.username,
    content: req.body.content,
    datetime: new Date()
  };
  db.insert("replies", reply, function() {
    res.redirect("/");
  });
};

exports.list = function(req, res, next) {
  console.log(req.path);
  console.log(req.query.storyId);
  db.select("replies", {storyId: req.query.storyId}, function(data) {
    console.log(data);
    res.send(data);
  });
}