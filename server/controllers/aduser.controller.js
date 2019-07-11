const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Aduser = mongoose.model('Aduser');

module.exports.register = (req, res, next) => {
    var aduser = new Aduser();
    aduser.fullName = req.body.fullName;
    aduser.email = req.body.email;
    aduser.password = req.body.password;
    aduser.save((err, doc) => {
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

module.exports.authenticate = (req, res, next) => {

    passport.authenticate('local', (err, aduser, info) => {

        if (err) return res.status(400).json(err);

        else if (aduser) return res.status(200).json({ "token": aduser.generateJwt() });

        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    Aduser.findOne({ _id: req._id },
        (err, aduser) => {
            if (!aduser)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, aduser: _.pick(aduser, ['fullName', 'email']) });
        }
    );
}