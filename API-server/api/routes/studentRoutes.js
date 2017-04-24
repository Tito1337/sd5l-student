'use strict';
module.exports = function(app) {
  var controller = require('../controllers/studentController');

  app.route('/students')
    .get(controller.list_all)
    .post(controller.create);


  app.route('/students/:studentId')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);
};