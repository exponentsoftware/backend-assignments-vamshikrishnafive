const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserModel = require("./models/user");

function initialPassport(passport, getUserbyEmail, getUserById) {
    // console.log(getUserByEmail, getUserById)
    const authenticateUser = async(email, password, done) => {
        const user = await UserModel.findOne({email})
        // console.log(user.id)
        // console.log(password, user.password)
        if (user === null) {
            return done(null, false, { message: 'No user with that email_id' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
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