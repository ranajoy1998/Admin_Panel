const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Aduser = mongoose.model('Aduser');

passport.use('local',
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            Aduser.findOne({ email: username },
                (err, aduser) => {
                    if (err)
                        return done(err);

                    else if (!aduser)
                        return done(null, false, { message: 'Email is not registered' });

                    else if (!aduser.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });

                    else
                        return done(null, aduser);
                });
        })
);