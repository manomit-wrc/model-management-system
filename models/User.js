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
    pincode: { type: Number },
    state: { type: Schema.Types.ObjectId, ref: 'State' },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    ethnicity: { type: Schema.Types.ObjectId, ref: 'Ethnicity'},
    catalog: [{ type: Schema.Types.ObjectId, ref: 'Catalog'}],
    discipline: [{ type: Schema.Types.ObjectId, ref: 'Discipline'}],
    eye: { type: Schema.Types.ObjectId, ref: 'Eyes'},
    hair_color: { type: Schema.Types.ObjectId, ref: 'HairColor'},
    gender: { type: String },
    videos: [
        {
            url: { type: String },
            altTag: { type: String },
            type: { type: String, default: 'video'}
        }
    ],
    images: [
        {
            src: { type: String },
            caption: { type: String, default: '' },
            likes: [
                {
                    status: { type: Boolean },
                    user: { type: Schema.Types.ObjectId, ref: 'User' }
                }
            ],
            comments: [
                {
                    description: { type: String },
                    user: { type: Schema.Types.ObjectId, ref: 'User' },
                    uploaded_at: {type: Date, default : Date.now()}
                }
            ],
            uploaded_at : { type: Date, default : Date.now()}
        }
    ],
    trust: [
        {
            social_verification: { type: Boolean },
            mobile_verification: { type: Boolean },
            reviews: { type: Number }
        }
    ],
    info: [
        {
            height: { type: String },
            dress: { type: String },
            shoes: { type: String },
            weight: { type: String },
            heap: { type: String },
            age: { type: Number },
            chest: { type: Number }
        }
    ],
    status: { type: Number, default: 0},
    reg_type: { type: String },
    activation_link: { type: String },
    social_id: { type: String },
    created_at : { type: Date, default : Date.now()}
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};