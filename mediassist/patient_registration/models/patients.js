const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: String,
    doctor: String,
    diagnosis: String,
    mobileno: String
})
module.exports = mongoose.model('Patient',PatientSchema);