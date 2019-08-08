const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.registeruser = (req, res, next) => {
    var user = new User();
    user.cname = req.body.cname;
    user.cemail = req.body.cemail;
    user.password = req.body.password;
    user.cphone = req.body.cphone;
    user.caddress = req.body.caddress;
    //console.log(user);
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticateuser = (req, res, next) => {

    passport.authenticate('local1', (err, user, info) => {

        if (err) return res.status(400).json(err);

        else if (user) return res.status(200).json({ "token": user.generateJwt() });

        else return res.status(404).json(info);
    })(req, res);
}

module.exports.usrProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['cname', 'cemail', 'cphone', 'caddress']) });
        }
    );
}