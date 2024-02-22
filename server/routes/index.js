var express = require('express');
var router = express.Router();
const eventController = require("../controllers/eventController");
const createController = require("../controllers/createController");
const eventValidate = require("../validations/eventValidate");
const createValidate = require("../validations/createValidate");
const connectEnsureLogin = require('connect-ensure-login')

router.post("/", eventValidate(), eventController.index)
router.post("/create", createValidate(), createController.index);

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
})

module.exports = router;
