/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import User from "../models/User";

const initializeAuth = () => {

    passport.serializeUser((user: any, done: any) => done(null, user));

    passport.deserializeUser((user: any, done: any) => done(null, user));

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email }).select('+password').exec((err, user) => {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { message: 'Email does not exist' });
            } else {

                user.validatePassword(password).then(correct => {
                    if (!correct) return done(null, false, { message: 'Your password is incorrect, please try again' });
    
                    return done(null, { id: user._id, username: user.username, email: user.email });
                }).catch(err => {
                    return done(err);
                });

            }
        });
    }));
};

export default initializeAuth;