const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserPermissionMW = require("../middlewares/UserPermissionMW");

// register: create user
router.post('/register', UserController.createUser);

// login: authenticate user
router.post("/login", UserController.authUser);

// update user by id
router.put("/update/:id", UserPermissionMW, UserController.updateUserById);

// delete user by id
router.delete("/delete/:id", UserPermissionMW, UserController.deleteUserById);

// get user by id
router.get("/:id", UserPermissionMW, UserController.getUserById);

module.exports = router;