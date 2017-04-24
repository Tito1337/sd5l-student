'use strict';

var mongoose = require('mongoose'),
  Student = mongoose.model('Students');

exports.list_all = function(req, res) {
  Student.find({}, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};

exports.create = function(req, res) {
  var new_student = new Student(req.body);
  new_student.save(function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};

exports.read = function(req, res) {
  Student.findById(req.params.studentId, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};

exports.update = function(req, res) {
  Student.findOneAndUpdate(req.params.studentId, req.body, {new: true}, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};

exports.delete = function(req, res) {
  Student.remove({
    _id: req.params.studentId
  }, function(err, student) {
    if (err)
      res.send(err);
    res.json({ message: 'Student successfully deleted' });
  });
};