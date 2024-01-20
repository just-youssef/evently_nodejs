const express = require("express");
const router = express.Router();
const UserAuthMW = require("../middlewares/UserAuthMW");
const EventController = require("../controllers/EventController");

// create event
router.post('/new', UserAuthMW, EventController.createEvent);

// update event
router.put('/:id', UserAuthMW, EventController.updateEvent);

// get event by id
router.get("/:id", EventController.getEventById);

// get event by id
router.delete("/:id", UserAuthMW, EventController.deleteEventById);

// get all events
router.get("/", EventController.getAllEvents);

module.exports = router;