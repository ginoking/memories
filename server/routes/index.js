var express = require('express');
var router = express.Router();
const event_controller = require("../controllers/eventController");
const yup = require('yup');

const validate = () => async (req, res, next) => {
	try {
		const DATE_REGEX = /^[0-9]{4}-[0-9]{2}$/;

		const linkSchema = yup.object({
			body: yup.object({
				time: yup.string().matches(DATE_REGEX, 'time must be in the format YYYY-MM'),
			}),
		});
		await linkSchema.validate({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		return next();
	} catch (err) {
		return res.status(500).json({ type: err.name, message: err.message });
	}
};

router.post("/", validate(), event_controller.index)

module.exports = router;
