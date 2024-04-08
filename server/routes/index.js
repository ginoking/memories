var express = require('express');
var auth = require("../auth/auth");
var router = express.Router();
const eventController = require("../controllers/eventController");
const createController = require("../controllers/createController");
const authController = require("../controllers/authController");
const eventValidate = require("../validations/eventValidate");
const createValidate = require("../validations/createValidate");

router.post("/", auth.verifyUser, eventValidate(), eventController.index)
router.post("/create", auth.verifyUser, createValidate(), createController.index);
router.get("/logout", auth.verifyUser, authController.logout);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
