var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = schema.Types.ObjectId;

var appointmentSchema = new schema({
	appointments_user_ids: {
        type: ObjectId,
        ref: 'users'
    },  
    book_time: {
        type: Date,
        default: ""
    },   
    created_at: {
        type: Date,
        default: ""
    },
    updated_at: {
        type: Date,
        default: ""
    },
    status:{
        type:Number,
        default:1
    }
});

// on every save, add the date
appointmentSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('appointments', appointmentSchema);