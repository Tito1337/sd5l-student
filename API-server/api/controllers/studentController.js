'use strict';

var mongoose = require('mongoose'),
Student = mongoose.model('Students');

exports.list_all = function(req, res) {
    console.log(req.query);
    Student.find(req.query, function(err, students) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.json(students);
  });
};

exports.create = function(req, res) {
    var new_student = new Student(req.body);
    new_student.save(function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.redirect('/students/'+student._id);
    });
};

exports.read = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.json(student);
    });
};

exports.update = function(req, res) {
    delete req.body.validated_ues;
    delete req.body.current_ues;
    Student.findOneAndUpdate(req.params.studentId, req.body, {new: true}, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.json(student);
    });
};

exports.delete = function(req, res) {
    Student.remove({_id: req.params.studentId}, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.json({ message: 'Student successfully deleted' });
    });
};

exports.read_current_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.json(student.current_ues);
  });
};

exports.add_current_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        student.current_ues.push(req.body.id, function(err, current_ues) {
            if (err) {
                res.status(400);
                res.send(err);
                return;
            }
        });

        student.save(function(err) {
            if(err) {
                res.status(400);
                res.send(err);
                return;
            }

            res.json(student.current_ues);
        });
    });
};

exports.remove_current_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        var index = student.current_ues.indexOf(req.body.id);
        if(index == -1) {
            res.status(400);
            res.json({message: 'ERROR : ID not found for this student'});
            return;
        }

        student.current_ues.splice(index, 1);
        student.save(function(err) {
            if(err) {
                res.status(400);
                res.send(err);
                return;
            }

            res.json(student.current_ues);
        });
    });
};

exports.read_validated_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        res.json(student.validated_ues);
    });
};

exports.add_validated_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        student.validated_ues.push(req.body.id, function(err, vlaidated_ues) {
            if(err) {
                res.status(400);
                res.send(err);
                return;
            }
        });

        student.save(function(err) {
            if(err) {
                res.status(400);
                res.send(err);
                return;
            }

            res.json(student.validated_ues);
        });
    });
};

exports.remove_validated_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }

        var index = student.validated_ues.indexOf(req.body.id);
        if(index == -1) {
            res.status(400);
            res.json({message: 'ERROR : ID not found for this student'});
            return;
        }

        student.validated_ues.splice(index, 1);
        student.save(function(err) {
            if(err) {
                res.status(400);
                res.send(err);
                return;
            }

            res.json(student.validated_ues);
        });
    });
};
