/**
 * Module dependencies.
 */

var db = require('../../db');

exports.prefix = "/story"

exports.create = function(req, res, next){
  req.body.id
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