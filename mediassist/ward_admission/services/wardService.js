
const mongoose = require("mongoose");

const Ward = require("../models/wards");

/**
 *
 * @type {{get(*, *): void, update(*, *), register(*, *=): void}}
 */
module.exports = {
    register(req, cb) {
        var body = req.body;
        Ward.find().where('ward_no').equals(body.ward_no).exec()
        .then(result => {
            if(result.length > 0) {
                cb(result[0]);
            } else {//=> if not then register patient
                const ward = new Ward({
                    _id: new mongoose.Types.ObjectId,
                    ward_no: body.ward_no,
                    department: body.department,
                    doctor: body.doctor,
                    patient_name: body.patient_name,
                    mobileno: body.mobile,
                    register_by: body.register_by,
                    register_at: new Date()

                });
                ward.save()
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
    get (req, cb) {
        Ward.find().where('ward_no').equals(req.params.ward_no).exec()
        .then(result => {
            cb(result[0]);
        })
        .catch(err => {
            cb({err});
        });
    },

    //=> This function, when complete, will update patient info using his/her mobile no
    update(req, cb) {
        var body = req.body;
        const filter = { ward_no: body.ward_no};
        const update = {
            ward_no: body.ward_no,
            department: body.department,
            doctor: body.doctor,
            patient_name: body.patient_name,
            mobileno: body.mobile,
            register_by: body.register_by
        };

        Ward.findOneAndUpdate(filter,update,{  new: true,
        }).exec().then(
            result => {
                cb(result);
            }
        ).catch( err => {
            cb({err})
        });
    }



}
