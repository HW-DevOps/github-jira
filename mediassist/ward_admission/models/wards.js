const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ward_no: String,
    department: String,
    doctor: String,
    patient_name : String,
    mobileno : String,
    register_By: String,
    register_At: Date
})
module.exports = mongoose.model('Wards',WardSchema);
