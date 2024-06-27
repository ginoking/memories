const yup = require('yup')
require('yup-password')(yup) 

module.exports = (needPassword = false) => async (req, res, next) => {
	try {

		const rules = {
			username: yup.string()
						.required()
		};

		if (needPassword) {
			rules['password'] = yup.string().password().required();
		}
		const linkSchema = yup.object({
			body: yup.object(rules),
		});
		await linkSchema.validate({
			body: req.body,
		});
		
		return next();
	} catch (err) {
		return res.status(500).json({ type: err.name, message: err.message });
	}
};
