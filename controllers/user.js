const errorHandler = require('../dbErrorHandlers.js');
const UserModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const passport = require('passport');

const initialPassport = require('../passport.config')

initialPassport(
    passport, 
    email => UserModel.findOne({email}, email === email),
    id => UserModel.findOne({_id: id}, id === id),
    )

exports.login = (req, res) => {
    res.render('login.ejs');
};

exports.register =  (req, res) => {
    res.render('register.ejs');
};

exports.signup = async(req, res) => { 
    const { name, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser = await new UserModel({name, email, phone, password: hashedPassword});
        await newUser.save()
        res.redirect('login')
        // res.status(200).json(newUser);
    } catch (error) {
        res.redirect('/api/register');
        // res.status(400).json({error: error})
    }
    // console.log(newUser)
};

exports.signin = passport.authenticate('local', {
    successRedirect: '/api/todo/admin',
    failureRedirect: '/api/login',
    failureMessage: true
})