const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    booked_profile_id : { type: String},
    booked_by : { type: String },
    title : {type: String},
    description: {type: String},
    start_date : { type: String },
    end_date : { type: String },
    start_time : { type: String },
    end_time : { type: String },
    booking_status : {type : Number, default: 1}, //1='Pending',2='Approved',3='Rejected'
    created_at : {type: Date}
});

module.exports = mongoose.model('Booking', BookingSchema);