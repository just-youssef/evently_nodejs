const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    'username': {
        type: String,
        trim: true,
        required: [true, "username field is required"],
        // validate: { validator: value => /^[a-zA-Z0-9_-]{3,20}$/.test(value) }
    },
    'email': {
        type: String,
        unique: true,
        trim: true,
        required: [true, "email field is required"],
        // validate: { validator: value => /^.+\@.+\..+$/.test(value) },
    },
    'password': {
        type: String,
        required: [true, "password field is required"],
        // validate: { validator: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) },
    },
});

UserSchema.methods.genAuthToken = function () {
    // generate jwt
    return jwt.sign({ userID: this._id }, process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', UserSchema);