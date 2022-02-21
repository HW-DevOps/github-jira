'use strict';

const accountServices = require('../services/AccountService');
const authenticationServices = require('../services/AutheticationService');
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const crypto = require('crypto');




/**
 * This search api will call google service with the search string.
 */
router.post('/',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),

    function (req, res) {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = {
            username : req.body.username,
            password : req.body.password
        }

        authenticationServices.validate(user).then(function(result) {
            res.status(200).send(result)
        }, function (err){
            console.error(err);
            res.status(401).send({errors : [{error: "invalid credentials."}]})
        })

});


/**
 *
 */
router.post('/users',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    body('first_name').isLength({ min: 2 }),
    body('last_name').isLength({ min: 2 }),
    body('title').isLength({ min:1 ,max:3 }),
    body('dob').isDate(),
    body('role').isIn(['Admin','Clerk','Doctor']),

    body('department').isLength({min:5}),

    function (req, res) {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = {
            username : req.body.username,
            password : req.body.password,
            department: req.body.department,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            title: req.body.title,
            dob: req.body.dob,
            role: req.body.role
        }

        try {
            accountServices.create(user, (err, result) => {
                if(err){
                    res.status(200).send({errors: [err]});
                } else {
                    console.log(result);
                    res.status(200).send(result)
                }
            });
        } catch (err) {
            console.log(err)
            res.status(500).send({err : err})
        }



    });


router.put('/users',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    body('first_name').isLength({ min: 2 }),
    body('last_name').isLength({ min: 2 }),
    body('title').isLength({ min:1 ,max:3 }),
        body('dob').isDate(),
    body('role').isIn(['Admin','Clerk','Doctor']),

    body('department').isLength({min:5}),

    function (req, res) {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = {
            username : req.body.username,
            password : req.body.password,
            age : req.body.age,
            department: req.body.department,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            title: req.body.title,
            dob: req.body.dob,
            role: req.body.role
        }

        try {
            accountServices.update(user,function (err, result) {
                if(err){
                    res.status(200).send({errors: [err]});
                } else {
                    console.log(result);
                    res.status(200).send(result)
                }
            });
        } catch (err) {
            console.log(err)
            res.status(500).send({err : err})
        }

    });


/**
 *
 */
router.get('/users/:username',
    // username must be an email
    param('username').isEmail(),
    function (req, res) {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = {
            username : req.params.username
        }

        try {
            accountServices.get(user,function (err, result) {
                if(err){
                    res.status(200).send({errors: [err]});
                } else {
                    if(result && result.password){
                        delete result.password;
                    }
                    res.status(200).send(result)
                }
            });
        } catch (err) {
            console.log(err)
            res.status(500).send({err : err})
        }

    });

module.exports = router;

