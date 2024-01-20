const { mongoose } = require("mongoose");
const User = require("../models/User");
const asyncFunction = require("../utils/asyncFunction");

// get or create user
const getOrCreateUser = asyncFunction(async (req, res) => {
    // check if user exists
    let user = await User.findOne({ kinde_id: req.body.kinde_id }).exec();
    if (user) return res.json(user._id);

    user = new User({
        kinde_id: req.body.kinde_id,
        full_name: req.body.full_name,
        email: req.body.email,
    });

    // save to db
    await user.save();
    console.log("user created..");

    // send user id
    return res.status(201).json(user._id);
});

// delete user by _id
const deleteUserById = asyncFunction(async (req, res) => {
    // check if user exists
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found..!" });

    // check if req user is the requested user
    if (req.KindeID !== user.kinde_id) return res.status(401).json({ error: "access denied" });

    // delete user
    await User.findByIdAndDelete(user._id);

    // return response
    return res.json({ message: "user deleted..!" })
});

// get user by id
const getUserById = asyncFunction(async (req, res) => {
    // check if user exists
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found..!" });

    // check if req user is the requested user
    if (req.KindeID !== user.kinde_id) return res.status(401).json({ error: "access denied" });

    // return response
    return res.json(user);
});

module.exports = {
    getOrCreateUser,
    deleteUserById,
    getUserById,
}