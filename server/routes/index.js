var express = require('express');
var passport = require('passport');
var auth = require("../auth/auth");
var router = express.Router();
const eventController = require("../controllers/eventController");
const createController = require("../controllers/createController");
const authController = require("../controllers/authController");
const eventValidate = require("../validations/eventValidate");
const createValidate = require("../validations/createValidate");

router.post("/", auth.verifyUser, eventValidate(), eventController.index)
router.post("/create", createValidate(), createController.index);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/profile', auth.verifyUser, (req, res) => {
    // console.log(req.headers);
    return res.json("456");
});

router.get("/", (req, res) => {
    res.json("good");
})

module.exports = router;
