//=> this is required to create unique id for register patient
const mongoose = require("mongoose");

//=> This is to get instance of Patient schema created using mongoose
const Patient = require("../models/patients");

/**
 * This exposes all services used to manage the patient
 */
module.exports = {
    register(req, cb) {
        //==> get the body data
        var body = req.body;
        //==> try to find if patient with same mobile no exists
        Patient.find().where('mobileno').equals(body.mobile).exec()
        .then(result => {
            //=> if exist then return the patient information
            if(result.length > 0) {
                cb(result[0]);
            } else {//=> if not then register patient
                const patient = new Patient({
                    _id: new mongoose.Types.ObjectId,
                    name: body.name,
                    age: body.age,
                    doctor: body.doctor,
                    diagnosis: body.diagnosis,
                    mobileno: body.mobile
                });
                patient.save()
                    .then(result => {
                        cb(result);
                    })
                    .catch(err=> {
                        cb({err});
                    })
            }

        })
        .catch(err => {
            cb({err});
        });
    },
    //=> This function returns patient information using mobile no
    retrieve (req, cb) {
        Patient.find().where('mobileno').equals(req.params.mobileno).exec()
        .then(result => {
            console.log(result);
            if(result.length === 0){
                result[0] = {}
            }
            cb(result[0]);
        })
        .catch(err => {
            cb({err});
        });
    },

    //=> This function, when complete, will update patient info using his/her mobile no
    update(req, cb) {
        var body = req.body;
        const filter = { mobileno: body.mobile};
        const update = {
            name: body.name,
            age: body.age,
            doctor: body.doctor,
            diagnosis: body.diagnosis,
            mobileno: body.mobile
        };

        Patient.findOneAndUpdate(filter,update,{  new: true,
        }).exec().then(
            result => {
                console.log(result);
                cb(result);
            }
        ).catch( err => {
            cb({err})
        });
    }
}
