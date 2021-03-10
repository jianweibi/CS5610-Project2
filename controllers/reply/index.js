/**
 * Module dependencies.
 */

const db = require('../../db');

exports.prefix = '/story';

exports.create = function (req, res, next) {
  const reply = {
    storyId: req.body.id,
    username: req.body.username,
    content: req.body.content,
    datetime: new Date(),
  };
  db.insert('replies', reply, function () {
    res.redirect('/');
  });
};

exports.list = function (req, res, next) {
  db.select('replies', {storyId: req.query.storyId}, function (data) {
    res.send(data);
  });
};
