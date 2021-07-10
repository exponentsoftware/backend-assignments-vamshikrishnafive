const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserModel = require("../models/user");

function initialPassport(passport) {
    const authenticateUser = async(email, password, done) => {
        const user = await UserModel.findOne({email})
        if (!user) {
            return done(null, false, { message: 'No user with that email_id' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                const activeUser = await UserModel.findOneAndUpdate({email}, {isActive: true}, {new: true})
                activeUser.save();
                return done(null, user)
            } else {
                done(null, false, { message: 'Password incorrect.!' })
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => {done(null, user.id)})
    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => { return done(err, user)})
    })
}

module.exports = initialPassport
