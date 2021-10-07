const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserModel = require("../models/User");

function initialPassport(passport) {
    const authenticateUser = async(email, password, done) => {
        try {
            const user = await UserModel.findOne({where : { email }})
            if (!user) {
                return done(null, false, { message: 'No user with that email_id' })
            }
            if (await bcrypt.compare(password, user.password)) {
                user.update({isActive: true})
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
        UserModel.findByPk(id).then((err, user) => { return done(err, user)})
    })
}

module.exports = initialPassport
