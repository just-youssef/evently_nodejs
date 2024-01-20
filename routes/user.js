const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserAuthMW = require("../middlewares/UserAuthMW");

// login: authenticate user
router.post("/auth", UserController.getOrCreateUser);

// delete user by id
router.delete("/delete/:id", UserAuthMW, UserController.deleteUserByKindeId);

// delete user by kinde_id
router.delete("/delete/kinde/:id", UserAuthMW, UserController.deleteUserByKindeId);

// get user by id
router.get("/:id", UserAuthMW, UserController.getUserById);

// get _id by kinde_id
router.get("/kinde/:id", UserAuthMW, UserController.getUserIdBykindeId);

module.exports = router;