'use strict';

var mongoose = require('mongoose'),
Student = mongoose.model('Students');

function handleError(err, res) {
    res.status(400);
    res.json(err);
}

exports.list_all = function(req, res) {
    Student.find(req.query, function(err, students) {
        if (err) {
            handleError(err, res);
        } else {
            res.json(students);
        }
  });
};

exports.create = function(req, res) {
    var new_student = new Student(req.body);
    new_student.save(function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.redirect('/students/'+student._id);
        }
    });
};

exports.read = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.json(student);
        }
    });
};

exports.update = function(req, res) {
    // Do not accept modifications on validated_ues and current_ues
    delete req.body.validated_ues;
    delete req.body.current_ues;

    Student.findOneAndUpdate(req.params.studentId, req.body, {new: true}, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.json(student);
        }
    });
};

exports.delete = function(req, res) {
    Student.remove({_id: req.params.studentId}, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.json({ message: 'Student successfully deleted' });
        }
    });
};

exports.read_current_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.json(student.current_ues);
        }
  });
};

exports.add_current_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            try {
                student.current_ues.push(req.body.id);
            } catch(err) {
                handleError(err, res);
                return;
            }

            student.save(function(err) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(student.current_ues);
                }
            });
        }
    });
};

exports.remove_current_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            var index = student.current_ues.indexOf(req.body.id);
            if(index == -1) {
                handleError({message: 'ERROR : ID not found for this student'}, res)
            } else {
                student.current_ues.splice(index, 1);
                student.save(function(err) {
                    if(err) {
                        handleError(err, res);
                    } else {
                        res.json(student.current_ues);
                    }
                });
            }
        }
    });
};

exports.read_validated_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.json(student.validated_ues);
        }
    });
};

exports.add_validated_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            try {
                student.validated_ues.push(req.body.id);
            } catch(err) {
                handleError(err, res);
                return;
            }

            student.save(function(err) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(student.validated_ues);
                }
            });
        }
    });
};

exports.remove_validated_ues = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            var index = student.validated_ues.indexOf(req.body.id);
            if(index == -1) {
                handleError({message: 'ERROR : ID not found for this student'}, res);
            } else {
                student.validated_ues.splice(index, 1);
                student.save(function(err) {
                    if(err) {
                        handleError(err, res);
                    } else {
                        res.json(student.validated_ues);
                    }
                });
            }
        }
    });
};
