const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobPostSchema = new Schema({
    user_id : { type: Schema.Types.ObjectId, ref: 'User'},
    job_title: { type: String, required: true },
    job_desc : { type: String, required: true },
    job_start_date: { type: String, required: true },
    job_start_time: { type: String, required: true },
    job_end_date : { type: String, required: true },
    job_end_time : { type: String, required: true },
    state: { type: Schema.Types.ObjectId, ref: 'State' },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    city: { type: String },
    status : {type:Number},
    created_at : { type: Date, default : Date.now()}
});

module.exports = mongoose.model('Job_post', JobPostSchema);