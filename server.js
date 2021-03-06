var express = require('express'); //for routing
var http = require('http');
var path = require('path');
var app = express(); //init the server
//var port = process.env.PORT || 3000;

//initalization for using POST calls
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//read URL encoded
app.use(bodyParser.json()); //read json data


app.set('port',process.env.PORT || 3000);


//app.use(express.favicon());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);


app.use(express.static(path.join(__dirname,'app')));


//static routes init
//app.use('/app', require('./controllers/app.controller'));
app.use('/app', express.static('app'));

//database
app.use('/auth', require('./controllers/auth.controller'));


// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

//listen on port

var server = app.listen(app.get('port'), function(){
   console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});

var router = express.Router();

//var mongoose = require('mongoose'); //get DB
//var connection = mongoose.createConnection('mongodb://ayalaka:artopico1234@ds040898.mlab.com:40898/artop');//connect to the db server
//var patientSchema = require('../models/patient');
//var pasiont = connection.model('patient', patientSchema);
/*$http.get('https://api.mlab.com/api/1/databases/artop/collections/patients'
	+'?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo')
	.success(function (data, status, headers, config) {
			console.log("data",data);
	  }).error(function (data, status, headers, config) { alert(status) });*/
//var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("https://api.mlab.com/api/1/databases/artop/collections/patients"
	+"?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo")
    .then(function(response) {
        $scope.myWelcome = response.data;
        console.log("data",response);
    });
});
//var request = require('request');

// routes
router.post('/register', function (req, res) {
    
});

module.exports = router;
