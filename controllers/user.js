const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const passport = require('passport');
const moment = require('moment')
const initialPassport = require('../middleware/passport.config')

const today = moment().startOf('day')
initialPassport(passport)


exports.login = async(req, res) => {
    res.render('login.ejs');
};

exports.register = (req, res) => {
    res.render('register.ejs');
};

exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser = await new UserModel({ name, email, phone, password: hashedPassword, isActive: true });
        await newUser.save()
        res.redirect('login')
        // res.status(200).json(newUser);
    } catch (error) {
        res.redirect('/api/register');
        // res.status(400).json({ error: error.message })
    }
    // console.log(newUser)
};

exports.signin = passport.authenticate('local', {
    successRedirect: '/api/todo/admin?page=1&limit=5',
    failureRedirect: '/',
    failureMessage: true 
})

exports.registerUserPerDay = async (req, res) => {
    try {
        const usersCount = await UserModel.find({
            createdAt: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }})
        res.status(200).json(usersCount);
    } catch (error) { res.status(404).json({ error: error.message })}
}

exports.getActiveUser = (req, res) => {
    res.send('test')
}
exports.UsersRegisterPerMonth = (req, res) => {
    res.send('test')
}
