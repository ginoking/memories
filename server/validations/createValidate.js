const yup = require('yup');

module.exports = () => async (req, res, next) => {
	try {
		if (!req.files) {
			console.log(req.files);
			return res.status(500).send({ msg: "file is not found" })
		}
		return next();
	} catch (err) {
		return res.status(500).json({ type: err.name, message: err.message });
	}
};
