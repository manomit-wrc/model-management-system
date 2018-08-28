const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating_by_user: [
        {
            user_id : {type: Schema.Types.ObjectId, ref: 'User'},
            number_of_rating : {type : Number}
        }
    ]
});

module.exports = mongoose.model('Rating', RatingSchema);