const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const RegisterValidatorMW = require("../middlewares/RegisterValidatorMW");
const LoginValidatorMW = require("../middlewares/LoginValidatorMW");
const UserPermissionMW = require("../middlewares/UserPermissionMW");

// register: create user
router.post('/register', RegisterValidatorMW, UserController.createUser);

// login: authenticate user
router.post("/login", LoginValidatorMW, UserController.authUser);

// update user by id
router.put("/update/:id", UserPermissionMW, UserController.updateUserById);

// delete user by id
router.delete("/delete/:id", UserPermissionMW, UserController.deleteUserById);

// get user by id
router.get("/:id", UserPermissionMW, UserController.getUserById);

module.exports = router;