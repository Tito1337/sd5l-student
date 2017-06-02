'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StudentSchema = new Schema({
    matricule: {
        type: String,
        Required: 'matricule is mandatory'
    },
    first_name: {
        type: String,
        Required: 'first_name is mandatory'
    },
    last_name: {
        type: String,
        Required: 'last_name is mandatory'
    },
    validated_ues: {
        type: [Number]
    },
    current_ues: {
        type: [Number]
    }
});

module.exports = mongoose.model('Students', StudentSchema);