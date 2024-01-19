const Event = require("../models/Event");
const asyncFunction = require("../utils/asyncFunction");

// create event
const createEvent = asyncFunction(async (req, res) => {
    const event = new Event({
        organizer: req.body.organizer,
        title: req.body.title,
        date: req.body.date,
        duration: req.body.duration,
        location: req.body.location,
        desc: req.body.desc,
    });

    // save to db
    await event.save();
    console.log("event created..");

    return res.json({ eventID: event._id });
})

// update event by id
const updateEvent = asyncFunction(async (req, res) => {
    // check if event exists
    let event = await Event.findById(req.params.id).populate('organizer');
    if (!event) return res.status(404).json({ error: "event not found..!" });

    // make updates
    if (req.body.title) event.title = req.body.title;
    if (req.body.date) event.date = req.body.date;
    if (req.body.duration) event.duration = req.body.duration;
    if (req.body.location) event.location = req.body.location;
    if (req.body.desc) event.desc = req.body.desc;

    // save updates & return response
    await event.save();
    console.log("event updated..");
    return res.json({ eventID: event._id });
})

// get event by id
const getEventById = asyncFunction(async (req, res) => {
    // check if event exists
    let event = await Event.findById(req.params.id).populate('organizer', '-password');
    if (!event) return res.status(404).json({ error: "event not found..!" });

    // return response
    return res.json(event);
});

// delete event by id
const deleteEventById = asyncFunction(async (req, res) => {
    // check if event exists
    let event = await Event.findById(req.params.id).populate('organizer');
    if (!event) return res.status(404).json({ error: "event not found..!" });

    // check if req user is the organizer user
    if (req.userID !== event.organizer.clerk_id.toString()) return res.status(401).json({ error: "access denied" });

    // delete event
    await Event.findByIdAndDelete(req.params.id);

    // return response
    return res.json({ message: "event deleted..!" })
});

// get all events
const getAllEvents = asyncFunction(async (req, res) => {
    let allEvents = await Event.find({}).populate('organizer', '-password').sort({ "date": 1 });

    // return response
    return res.json(allEvents);
});

module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    updateEvent,
    deleteEventById
}