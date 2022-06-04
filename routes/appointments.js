var express = require('express');
var router = express.Router();
var DB_appointments = require('../models/appointments');

var md5 = require('md5'),
    config = require('config'),
    baseUrl = config.get('baseUrl');


router.route('/').all(function(req, res) {
    res.status(400).json({
        "status": 400,
        "message": 'Something Went Wrong'
    });
});

/*
* Function to book new appointment.
*/
router.route('/bookappointment').post(function(req, res) {

});


/*
* Listing of appointments.
*/
router.route('/appointments').get(function(req, res) {

});

module.exports = router;
