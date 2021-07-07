const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialPassport(passport, getUserbyEmail, getUserById) {
    // console.log(getUserByEmail, getUserById)
    const authenticateUser = async(email, password, done) => {
        const user = getUserbyEmail(email)
        // console.log(user/)
        // if (user === null) {
        //     return done(null, false, { message: 'No user with that email_id' })
        // }
        // try {
        //     if (await bcrypt.compare(password, user.password)) {
        //         return done(null, user)
        //     } else {
        //         done(null, false, { message: 'Password incorrect.!' })
        //     }
        // } catch (error) {
        //     return done(error)
        // }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    // passport.serializeUser((user, done) => { })
    // passport.deserializeUser((id, done) => { })
}

module.exports = initialPassport