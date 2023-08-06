var express = require('express');
var router = express.Router();
const Stories = require("../database/mongodb");
const yup = require('yup');
const moment = require('moment');


router.get("/", async (req, res) => {
	try {
		const DATE_REGEX = /^[0-9]{4}-[0-9]{2}$/;

		const linkSchema = yup.object({
			body: yup.object({
			  date: yup.string().matches(DATE_REGEX, 'birthDate must be in the format YYYY-MM-DD'),
			}),
		});

		await linkSchema.validate({
			body: req.body
		});

		const start = moment('2022-01', 'YYYY-MM-DD')
		const end = start.clone().endOf('month').format('YYYY-MM-DD');
		
		const stories = await Stories.find({
			date :{
				$gte: start,
				$lt: end
			}
		});

		res.json(stories);
	} catch (err) {
		//如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
		res.status(500).json({ message: err.message })
	}
})

module.exports = router;
