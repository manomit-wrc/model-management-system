const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    profile_id: {type: String},
    description: { type: String },
    comment_by: { type: Schema.Types.ObjectId, ref: 'User' },
    uploaded_at: {type: Date, default : Date.now()}
});

module.exports = mongoose.model('ProfileComment', schema);