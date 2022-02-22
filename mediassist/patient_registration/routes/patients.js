const express = require("express");
const router = express.Router();
const Patient = require("../services/patientService");

 //Register patient
 //It calls a "register" service defined in patientServices, which checks first if patient exists using his mobile no
router.post('/register', (req, res)=> {
    Patient.register(req, (result)=> {
        res.json(result);
    })
})

//Get patient info using his mobile number
router.get('/:mobileno', (req, res)=> {
    console.log("request reached @get patient info side");
    Patient.retrieve(req, (result)=> {
        res.json(result);
    })
})

//Update patient info using his mobile number
router.put('/', (req, res)=> {
    Patient.update(req, (result)=> {
        res.json(result);
    })

})


module.exports = router;
