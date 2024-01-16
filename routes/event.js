const express = require("express");
const router = express.Router();
const UserPermissionMW = require("../middlewares/UserPermissionMW");
const EventController = require("../controllers/EventController");

// create event
router.post('/new', UserPermissionMW, EventController.createEvent);

// update event
router.put('/:id', UserPermissionMW, EventController.updateEvent);

// get event by id
router.get("/:id", EventController.getEventById);

// get event by id
router.delete("/:id", UserPermissionMW, EventController.deleteEventById);

// get all events
router.get("/", EventController.getAllEvents);

module.exports = router;