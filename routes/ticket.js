const express = require("express");
const router = express.Router();
const UserAuthMW = require("../middlewares/UserAuthMW");
const TicketController = require("../controllers/TicketController");

// check if ticket already booked
router.get("/:eventID", UserAuthMW, TicketController.checkTicketBooked);

// book ticket
router.post("/:eventID", UserAuthMW, TicketController.bookTicket);

// get list of who is going to chosen event
router.get("/whoisgoing/:eventID", TicketController.getWhoIsGoing);

module.exports = router;
