var express = require('express');
var router = express.Router();
const eventController = require("../controllers/eventController");
const createController = require("../controllers/createController");
const eventValidate = require("../validations/eventValidate");
const createValidate = require("../validations/createValidate");

router.post("/", eventValidate(), eventController.index)
router.post("/create", createValidate(), createController.index);

module.exports = router;
