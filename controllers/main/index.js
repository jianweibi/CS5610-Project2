/**
 * Module dependencies.
 */

var db = require('../../db');

exports.engine = 'pug';

exports.index = function(req, res){
  db.selectAll("stories", function(data) {
    res.render("index", {storyData: data});
  });
};
