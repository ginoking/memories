const moment = require('moment');
const { Storage } = require('@google-cloud/storage');
const Stories = require("../database/stories");

const getImage = async (filename, domain) => {
	if (process.env.hasOwnProperty('memoryStorageSecret')) {
		const storage = new Storage({
			credentials: JSON.parse(process.env.memoryStorageSecret)
		});
		try {
			const options = {
				version: 'v4',
				action: 'read',
				expires: Date.now() + 15 * 60 * 1000, // 15 minutes
			};
			const [url] = await storage
									.bucket('memory-image')
									.file(filename)
									.getSignedUrl(options);
			return url;
		} catch (error) {
			console.log(error);
			return "";
		}
	}
	else {
		return `${domain}/api/${filename}`;
	}
}

exports.index = async (req, res) => {
	try {

		const containEventDays = [];
		const currentDate = req.body.time;
		const type = req.body.type;

		const emptyArray = Array.from({ length: moment(currentDate).day() }, () => "");
		const numberArray = Array.from({ length: moment(currentDate).daysInMonth() }, (_, i) => (i + 1).toString());
		for (const number of emptyArray.concat(numberArray)) {
			const dateString = `${currentDate}-${(number ?? '').padStart(2, '0')}`;
			const query = {
				date: new Date(dateString),
				user_id: req.user._id,
			};

			if (type !== '') {
				query.type = type;
			}
			const event = (number !== '') ? await Stories.find(query) : null;

			if (event) {
				event.map(async (item) => {
					item.image = await getImage(item.image, req.get('origin'));
				})
			}

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