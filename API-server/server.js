var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Student = require('./api/models/studentModel'),
    current_ue = require('./api/models/currentUeModel'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*var routes = require('./api/routes/studentRoutes');
routes(app);*/

var kalamata = require('kalamata');
var api = kalamata(app);
api.expose(Student);

app.listen(port);

console.log('Student RESTful API server started on port ' + port);