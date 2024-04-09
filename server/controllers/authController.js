var passport = require('passport');
var auth = require("../auth/auth");
const Users = require('../database/users');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info, status) => {

        if (err) { return res.json(err) }
        if (!user) { return res.json({ success: false, status: 'login fail' }) }

        // Create a token
        var token = auth.getToken({ _id: user._id });

        // Response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({ success: true, token: token, status: 'You are successfully logged in!' });

    })(req, res, next)
};


exports.signup = (req, res, next) => {
    // Create User
    Users.register(new Users({ username: req.body.username, active: true, created_at: new Date }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                // Use passport to authenticate User
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            }
        })
};

// exports.logout = (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }

//         res.json({ success: true, status: 'Logout Successful!' });
//     })
// };

exports.check = async (req, res, next) => {
    const user = await Users.findOne({username: req.body.username});
    if (user) {
        return res.json({ success: true, status: 'User exist!' });
    }
    res.json({ success: false, status: 'User not exist!' });
};

exports.reset = async (req, res, next) => {
    const user = await Users.findOne({username: req.body.username});
    await user.setPassword(req.body.password);
    await user.save();

    return res.json({ success: true, status: 'Reset Successful!' });
};