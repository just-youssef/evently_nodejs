const jwt = require('jsonwebtoken');
const User = require("../models/User");

module.exports = async(req, res, nxt) => {
    // get token
    let token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: "access denied" });
    // decode token
    try {
        let payload=jwt.decode(token);

        // if token user is not authenticated
        let user = await User.findOne({ kinde_id: payload.sub }).exec();
        if(!user) return res.status(401).json({ error: "access denied" });

        // if user is authenticated
        req.userID = user._id
        req.kindeID = user.kinde_id
        nxt();
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({ error: "invalid token" });
    }
}