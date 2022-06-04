var express = require('express');
var router = express.Router();
var DB_user = require('../models/users');
var Promise = require("bluebird");
var DB_appointments = require('../models/appointments');
var mongoose = require('mongoose');

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
	var date = req.body.date;
	var uid = req.body.uid;

	mongoose.set('debug', true);
	var A = new DB_appointments;
	A.appointments_user_ids = mongoose.Types.ObjectId(uid);
	A.book_time = date;
	A.save();

	res.json({
        "status": 200,
        "message": 'Successfull',
        "appointment":A
	});

});


/*
* Function to login 
*/
router.route('/login').post(function(req, res) { //console.log('here::',req.body);
	
	// var A = new DB_appointments;
	// A.save();

	var name = req.body.name;
	var password = req.body.password;

	//mongoose.set('debug', true);
	DB_user.findOne({
		fullname:name
		//,password:md5(password)
	},function(err,deb_res){
		//console.log(deb_res);
		if(err){
			res.status(200)({
                "status": 1001,
                "message": 'Error in First Json.'
            });
		}else{ 

			if(deb_res==null){

				res.json({
	                "status": 1004,
	                "message": 'Unable to Login.'
	            });
			}else{

				//set session.
				//mongoose.set('debug', true);
				DB_appointments.find({
					status:1
				},function(err2,deb_res2){
					//console.log(deb_res2);	
					//error
					if(err2){
						res.json({
			               "status": 201,
                		   "message": 'Something Went Wrong - (promise 2)',
                		   "user":deb_res
			            });
					}else{
						if(deb_res2==null){
							res.json({
				                "status": 203,
				                "message": 'Data is Empty',
				                "user":deb_res
				            });
						}else{

							res.json({
				                "status": 200,
				                "message": 'Successfull',
				                "user":deb_res,
				                "appointments":deb_res2
				            });

						}
					}//else

				});//end of find.
			} //deb_res reply.
		}//end of error check.
	});//end of functions.

	// req.CheckQuery('name','Please Enter Name').notEmpty();
	// req.CheckQuery('password','Please Enter Password').notEmpty();
	// var errors = req.validationErrors(true);
	// var err_msg = '';
	// if(errors){
		
	// 	if (typeof errors.name == 'object') {
	//             err_msg = errors.name.msg;
	//         }else if (typeof errors.password == 'object') {
	//             err_msg = errors.password.msg;
	//         }

	//         res.json({
	//         	"status":1001,
	//         	"message":err_msg,
	//         	"errors":errors
	//         });
	// }


	//For Entering a user detail.
	// var U = new DB_user;
	// U.fullname = 'user2';
	// U.email = 'user2@gmail.com';
	// U.role_type = 'normal';
	// U.password = md5('srikanth');
	// U.save();

	 // res.status(200).json({
	 //        	"status":200//,
	 //        	"data":U
	 //        	"message":err_msg,
	 //        	"errors":errors
	 //    });

});


/*
* Listing of appointments.
*/
router.route('/appointments').get(function(req, res) {

});

module.exports = router;
