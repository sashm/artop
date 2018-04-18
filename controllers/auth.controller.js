var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection('mongodb://ayalaka:artopico1234@ds040898.mlab.com:40898/artop');//connect to the db server
var patientSchema = require('../models/patient');
var pasiont = connection.model('patient', patientSchema);


//var request = require('request');

// routes
router.post('/register', function (req, res) {
    
});

module.exports = router;

