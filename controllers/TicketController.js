const Ticket = require("../models/Ticket");
const asyncFunction = require("../utils/asyncFunction");

// book ticket
const bookTicket = asyncFunction(async (req, res) => {
    let ticket = await Ticket.findOne({ user: req.userID, event: req.params.eventID }).exec();
    if (ticket) return res.status(400).json({ error: "a ticket is already booked for chosen event" });

    ticket = new Ticket({
        user: req.userID,
        event: req.params.eventID,
    });

    // save to db
    await ticket.save();
    console.log("ticket booked..");

    return res.json({ ticketID: ticket._id });
})

// check if ticket booked for a specific event
const checkTicketBooked = asyncFunction(async (req, res) => {
    let ticket = await Ticket.findOne({ user: req.userID, event: req.params.eventID }).exec();
    if (ticket) return res.status(200).json({message: 'ticked is already booked'});
    
    return res.status(404).json({error: 'not found'});
})

// get list of who is going to chosen event
const getWhoIsGoing = asyncFunction(async (req, res) => {
    let tickets = await Ticket.find({event: req.params.eventID}).populate('user', 'full_name email -clerk_id').select('-_id -__v -event');
    const whoIsGoing = tickets.map(ticket => ticket.user);

    return res.json(whoIsGoing);
})

module.exports = {
    bookTicket,
    checkTicketBooked,
    getWhoIsGoing
}