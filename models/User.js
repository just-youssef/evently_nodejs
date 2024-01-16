const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    'username': {
        type: String,
        trim: true,
        required: [true, "username field is required"],
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
});

UserSchema.methods.genAuthToken = function () {
    // generate jwt
    return jwt.sign({ userID: this._id }, process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', UserSchema);