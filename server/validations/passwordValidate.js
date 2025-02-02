const yup = require('yup')
require('yup-password')(yup) 

module.exports = () => async (req, res, next) => {
	try {

		const linkSchema = yup.object({
			body: yup.object({
				password: yup.string()
							.password()
							.required(),
				password2: yup.string()
							.password()
							.required()
							.oneOf([yup.ref('password')], 'Passwords must match')
			}),
		});
		await linkSchema.validate({
			body: req.body,
		});
		
		return next();
	} catch (err) {
		return res.status(422).json({ type: err.name, message: err.message });
	}
};
