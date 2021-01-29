var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Medition = require('./api/models/weatherModel'), //created model loading here
  bodyParser = require('body-parser'),
  cron = require('node-cron'),
  cronController = require('./api/controllers/cronController');;

  //Test cron, every 30 seconds
  //cron.schedule('*/15 * * * * *', () => {
  //    cronController.getMeditions();
  //});
  //Cron checking meditions every 5 minutes
  //cron.schedule('*/5 * * * *', () => {
  //});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin94@weather.nd1br.mongodb.net/weather', { useNewUrlParser: true });
//mongoose.connect('mongodb://admin:admin94@ds351827.mlab.com:51827/weather', { useNewUrlParser: true });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/weatherRoute'); //importing route
routes(app); //register the route

app.get('/', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
/*
app.use(function(req, res) {
  console.log('Someone get a 404 making a request to ' + req.originalUrl);
  res.status(404).send({url: req.originalUrl + ' not found'})
});*/

app.listen(port, process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0');

console.log('Weather RESTful API server started on: ' + port);
