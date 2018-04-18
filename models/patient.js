var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: Number,
    projectName: String,
    patientName: String,
    adresse: String,
    phone : Number,
    EMail : String,
    communicate: String,
    payments: String
});

module.exports = orderSchema;