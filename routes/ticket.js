const express = require("express");
const router = express.Router();
const UserPermissionMW = require("../middlewares/UserPermissionMW");
const TicketController = require("../controllers/TicketController");

// check if ticket already booked
router.get("/:eventID", UserPermissionMW, TicketController.checkTicketBooked);

// book ticket
router.post("/:eventID", UserPermissionMW, TicketController.bookTicket);

// get list of who is going to chosen event
router.get("/whoisgoing/:eventID", TicketController.getWhoIsGoing);

module.exports = router;
