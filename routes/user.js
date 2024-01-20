const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserAuthMW = require("../middlewares/UserAuthMW");

// login: authenticate user
router.post("/auth", UserController.getOrCreateUser);

// delete user by id
router.delete("/delete/:id", UserAuthMW, UserController.deleteUserById);

// get user by id
router.get("/:id", UserAuthMW, UserController.getUserById);

// get _id by clerk_id
router.get("/clerk/:id", UserAuthMW, UserController.getUserIdByClerkId);

module.exports = router;