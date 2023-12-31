const moment = require('moment');
const Stories = require("../database/mongodb");
exports.index = async (req, res) => {
    try {

		const containEventDays = [];
		const currentDate = req.body.time;

		const emptyArray = Array.from({ length: moment(currentDate).day() }, () => "");
		const numberArray = Array.from({ length: moment(currentDate).daysInMonth() }, (_, i) => (i+1).toString());
		for (const number of emptyArray.concat(numberArray)) {
            const dateString = `${currentDate}-${(number ?? '').padStart(2, '0')}`;
            const event = (number !== '') ? await Stories.findOne({
			  	date: new Date(dateString)
			}) : null;
		
			containEventDays.push({
				date: dateString,
				number: number,
				event: event || null
			});

		}

		res.json(containEventDays);
	} catch (err) {
		//如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
		res.status(500).json({ message: err.message })
	}
}