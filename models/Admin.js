const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: Schema.Types.ObjectId, ref: 'State' },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    pincode: { type: String },
    mobile_no: { type: String }
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin
};