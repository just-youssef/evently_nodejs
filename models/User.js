const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    clerk_id: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: [true, "full_name field is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email field is required"],
        validate: { validator: value => validator.isEmail(value) },
        unique: true,
    },
});

module.exports = mongoose.model('User', UserSchema);