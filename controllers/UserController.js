const User = require("../models/User");
const bcrypt = require('bcrypt');
const asyncFunction = require("../utils/asyncFunction");

// create user
const createUser = asyncFunction(async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).json({ error: { email: "email already exists"} });

    if (req.body.password != req.body.confirmPassword) return res.status(400).json({ error: { confirmPassword: "confirm password must match with password" } });

    let saltRounds = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashedPassword,
    });

    // save to db
    await user.save();
    console.log("user created..");

    // generate jwt 
    let token = user.genAuthToken();

    // send token
    res.header("x-auth-token", token);
    return res.json({ jwt: token });
});

// authenticate user
const authUser = asyncFunction(async (req, res) => {
    // check email
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).json({ error: { email: "email doesn't exists"} });

    //check password
    let valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ error: { password: "incorrect password" } });

    // generate jwt 
    let token = user.genAuthToken();

    // send token
    res.header("x-auth-token", token);
    return res.json({ jwt: token });
});

// update user
const updateUserById = asyncFunction(async (req, res) => {
    // check if req user is the requested user
    if (req.userID !== req.params.id) return res.status(401).json({ error: "access denied" });

    // check if user exists
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found..!" });

    // make updates
    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.last_name) user.last_name = req.body.last_name;
    if (req.body.department) user.department = req.body.department;

    // save updates & return response
    await user.save();
    console.log("user updated..");
    return res.json({ message: "user updated..!" });

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

module.exports = {
    createUser,
    authUser,
    updateUserById,
    deleteUserById,
    getUserById,
}