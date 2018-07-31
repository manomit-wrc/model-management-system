const mongoose = require('mongoose');

const { Schema } = mongoose;

const industrySchema = new Schema({
    name: { type: String, required: true }
});

var Industry = mongoose.model('Industry', industrySchema);

module.exports = {
    Industry: Industry
};