const moment = require('moment');
const Stories = require("../database/mongodb");
const _ = require('lodash');
exports.index = async (req, res) => {
    try {

		const myFile = req.files.file;
		const data = req.body;

		const extension = _.split(myFile.name, '.').slice(-1)[0];
		const newFileName = data.date + "." + extension;
	
		myFile.mv(`${__dirname}/../public/images/${newFileName}`, function (err) {
			if (err) {
				return res.status(500).send({ message: "Error occur" });
			}
		});

		data.image = "images/" + newFileName;

		await Stories.create(data);
		return res.send("done");
	} catch (err) {
		//如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
		res.status(500).json({ message: err.message })
	}
}