const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    title_1: { type: String, required: true },
    title_2: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Banner', BannerSchema);