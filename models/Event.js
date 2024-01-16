const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Event', EventSchema);