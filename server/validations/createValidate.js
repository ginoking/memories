const yup = require('yup');

module.exports = () => async (req, res, next) => {
	try {
		if (!req.files) {
			return res.status(500).send({ message: "file is not found" })
		}
		// const DATE_REGEX = /^[0-9]{4}-[0-9]{1}-[0-9]{1}$/;

		const linkSchema = yup.object({
			body: yup.object({
				date: yup.date(),
				name: yup.string().required(),
				des: yup.string().required(),
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
