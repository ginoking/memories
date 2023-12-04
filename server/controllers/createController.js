const moment = require('moment');
const Stories = require("../database/mongodb");
exports.index = async (req, res) => {
    try {

		if (!req.files) {
			return res.status(500).send({ msg: "file is not found" })
		}
			// accessing the file
		const myFile = req.files.file;
	
		//  mv() method places the file inside public directory
		myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
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