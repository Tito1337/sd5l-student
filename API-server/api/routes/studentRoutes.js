'use strict';
module.exports = function(app) {
  var controller = require('../controllers/studentController');

 app.use('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log(req.method + ' ' + req.url);
    next();
 });

  app.route('/students')
    .get(controller.list_all)
    .options(controller.list_all)
    .post(controller.create);


  app.route('/students/:studentId')
    .get(controller.read)
    .options(controller.read)
    .put(controller.update)
    .delete(controller.delete);

  app.route('/students/:studentId/current_ues')
    .get(controller.read_current_ues)
    .options(controller.read_current_ues)
    .post(controller.add_current_ues)
    .delete(controller.remove_current_ues);

  app.route('/students/:studentId/validated_ues')
    .get(controller.read_validated_ues)
    .options(controller.read_validated_ues)
    .post(controller.add_validated_ues)
    .delete(controller.remove_validated_ues);

};