const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String},
    email: { type: String, required: true, unique: true },
    phone_number : {type: Number},
    password: { type: String },
    avatar: { type: String },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    industry: { type: Schema.Types.ObjectId, ref: 'Industry' },
    otp: { type: Number},
    city: { type: String },
    videos: [String],
    images: [String],
    trust: [
        {
            social_verification: { type: Boolean },
            mobile_verification: { type: Boolean },
            reviews: { type: Number }
        }
    ],
    info: [
        {
            ethencity: { type: String },
            gender: { type: String },
            height: { type: String },
            eyes: { type: String },
            dress: { type: String },
            shoes: { type: String }
        }
    ],
    discipline: [
        {
            lingerie: { type: String },
            actors: { type: String },
            glamour: { type: String },
            catalog: { type: String },
            commercial: { type: String },
            event: { type: String },
            foot: { type: String },
            video: { type: String },
            petite: { type: String }
        }
    ],
    status: { type: Number, default: 0},
    reg_type: { type: String },
    activation_link: { type: String },
    social_id: { type: String }
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};