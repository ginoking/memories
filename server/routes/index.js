var express = require('express');
var auth = require("../auth/auth");
var router = express.Router();
const eventController = require("../controllers/eventController");
const createController = require("../controllers/createController");
const authController = require("../controllers/authController");
const passkeyController = require("../controllers/passkeyController");
const eventValidate = require("../validations/eventValidate");
const createValidate = require("../validations/createValidate");
const passwordValidate = require("../validations/passwordValidate");
const loginValidate = require("../validations/loginValidate");

router.post("/", auth.verifyUser, eventValidate(), eventController.index)
router.post("/create", auth.verifyUser, createValidate(), createController.index);
router.post('/reset-password', auth.verifyUser, passwordValidate(), authController.reset);
// router.get("/logout", auth.verifyUser, authController.logout);

router.post('/signup', passwordValidate(), authController.signup);
router.post('/login', loginValidate(true), authController.login);
router.post('/check', authController.check);
router.post('/reset', passwordValidate(), authController.reset);

router.get('/passkey/register/start', auth.verifyUser, passkeyController.registerStart);
router.post('/passkey/register/finish', auth.verifyUser, passkeyController.registerFinish);

router.post('/passkey/login/start', loginValidate(false), passkeyController.loginStart);
router.post('/passkey/login/finish', passkeyController.loginFinish);

module.exports = router;
