var express = require('express');
var router = express.Router();
const Stories = require("../database/mongodb");

/* GET users listing. */
router.get("/", async (req, res) => {
	//使用try catch方便Debug的報錯訊息
	try {
		//找出Todo資料資料表中的全部資料
		const stories = await Stories.find();
		//將回傳的資訊轉成Json格式後回傳
		console.log(res.json(stories));;
	} catch (err) {
		//如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
		res.status(500).json({ message: err.message })
	}
})

module.exports = router;
