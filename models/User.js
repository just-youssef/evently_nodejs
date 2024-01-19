const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    'clerk_id': {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    'full_name': {
        type: String,
        trim: true,
        required: [true, "full_name field is required"],
        validate: { validator: value => /^[a-zA-Z0-9_-]{3,20}$/.test(value) }
    },
    'email': {
        type: String,
        trim: true,
        required: [true, "email field is required"],
        validate: { validator: value => validator.isEmail(value) },
        unique: true,
    },
    'password': {
        type: String,
        required: [true, "password field is required"],
    },
}, { _id: false });

UserSchema.methods.genAuthToken = function () {
    // generate jwt
    return jwt.sign({ userID: this.clerk_id }, process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', UserSchema);