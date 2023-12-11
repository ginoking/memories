const moment = require('moment');
const Stories = require("../database/mongodb");
exports.index = async (req, res) => {
    try {

		const myFile = req.files.file;
	
		myFile.mv(`${__dirname}/../public/images/${myFile.name}`, function (err) {
			if (err) {
				console.log(err)
				return res.status(500).send({ msg: "Error occured" });
			}
			// returing the response with file path and name
			return res.send({name: myFile.name, path: `/${myFile.name}`});
		});
	} catch (err) {
		//如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
		res.status(500).json({ message: err.message })
	}
}