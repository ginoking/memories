var express = require('express');
var passport = require('passport');
var router = express.Router();
const eventController = require("../controllers/eventController");
const createController = require("../controllers/createController");
const eventValidate = require("../validations/eventValidate");
const createValidate = require("../validations/createValidate");
const connectEnsureLogin = require('connect-ensure-login')

const Users = require('../database/users');

router.post("/", eventValidate(), eventController.index)
router.post("/create", createValidate(), createController.index);

router.post('/login', function (req, res, next) {
    passport.authenticate('local', (err, user, info, status) => {
        console.log(err);
        if (err) { return res.json(err) }
        if (!user) { return res.json('/signin') }
        return res.json("good");
    })(req, res, next)
    // res.send('test');
});

// router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//     res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
//     and your session expires in ${req.session.cookie.maxAge} 
//     milliseconds.<br><br>
//     <a href="/logout">Log Out</a><br><br>
//     <a href="/secret">Members Only</a>`);
// })

module.exports = router;
