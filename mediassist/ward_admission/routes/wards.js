const express = require("express");
const router = express.Router();
const Ward = require("../services/wardService");

router.post('/', (req, res)=> {
    Ward.register(req, (result)=> {
        res.json(result);
    })
})


router.get('/:ward_no', (req, res)=> {
    console.log("request reached @get patient info side");
    Ward.get(req, (result)=> {
        res.json(result);
    })
})


router.put('/', (req, res)=> {
    Ward.update(req, (result)=> {
        res.json(result);
    })

})


module.exports = router;
