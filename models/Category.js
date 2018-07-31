const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    is_new: { type: Boolean }
});

module.exports = mongoose.model('Category', CategorySchema);