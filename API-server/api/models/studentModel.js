'use strict';
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./Students.sqlite"
  }
});
var bookshelf = require('bookshelf')(knex);

/*var ValidatedUes = require('./validatedUeModel');
var CurrentUes = require('./currentUeModel');*/

module.exports = bookshelf.Model.extend({
    tableName: 'students',
    /*validated_ues: function() {
        return this.hasMany(ValidatedUes);
    },
    current_ues: function() {
        return this.hasMany(CurrentUes);
    }*/
});