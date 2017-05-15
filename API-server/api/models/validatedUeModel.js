'use strict';
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./Students.sqlite"
  }
});
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
  tableName: 'validated_ues'
});