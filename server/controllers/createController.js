const moment = require('moment');
const Stories = require("../database/mongodb");
const _ = require('lodash');
const { Storage } = require('@google-cloud/storage');

async function uploadGCS(bucket, filename)
{
	const re = await storage.bucket(bucket).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
    });

	console.log(res);
}

exports.index = async (req, res) => {
    try {

		const myFile = req.files.file;
		const data = req.body;

		const extension = _.split(myFile.name, '.').slice(-1)[0];
		const newFileName = data.date + "." + extension;

		// uploadGCS(newFileName);
	
		myFile.mv(`${__dirname}/../public/images/${newFileName}`, function (err) {
			if (err) {
				return res.status(500).send({ message: "Error occur" });
			}
		});

		data.image = "images/" + newFileName;

		// await Stories.create(data);
		return res.send("done");
	} catch (err) {
		//如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
		res.status(500).json({ message: err.message })
	}
}