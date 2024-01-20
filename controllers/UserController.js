const { mongoose } = require("mongoose");
const User = require("../models/User");
const asyncFunction = require("../utils/asyncFunction");

// get or create user
const getOrCreateUser = asyncFunction(async (req, res) => {
    // check if user exists
    let user = await User.findOne({ clerk_id: req.body.clerk_id }).exec();
    if (user) return res.json(user);

    user = new User({
        clerk_id: req.body.clerk_id,
        full_name: req.body.full_name,
        email: req.body.email,
    });
    console.log(user);

    // save to db
    await user.save();
    console.log("user created..");

    // send user id
    return res.status(201).json(user._id);
});

// delete user
const deleteUserById = asyncFunction(async (req, res) => {
    // check if req user is the requested user
    if (req.userID !== req.params.id) return res.status(401).json({ error: "access denied" });

    // check if user exists
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found..!" });

    // delete user
    await User.findByIdAndDelete(req.params.id);

    // return response
    return res.json({ message: "user deleted..!" })
});

// get user by id
const getUserById = asyncFunction(async (req, res) => {
    // check if req user is the requested user
    if (req.userID !== req.params.id) return res.status(401).json({ error: "access denied" });

    // check if user exists
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found..!" });

    // return response
    return res.json(user);
});

// get _id by clerk_id
const getUserIdByClerkId = asyncFunction(async (req, res) => {
    // check if req user is the requested user
    if (req.clerkID !== req.params.id) return res.status(401).json({ error: "access denied" });

    // check if user exists
    let user = await User.findOne({clerk_id: req.params.id});
    if (!user) return res.status(404).json({ error: "user not found..!" });

    // return response
    return res.json(user._id);
});

module.exports = {
    getOrCreateUser,
    deleteUserById,
    getUserById,
    getUserIdByClerkId
}