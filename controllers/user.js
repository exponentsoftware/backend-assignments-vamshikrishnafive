const errorHandler = require('../dbErrorHandlers.js');
const UserModel = require("../models/user.js");

exports.signup = async(req, res) => { 
    try {
        newUser = await new UserModel(req.body);
        await newUser.save()
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({error: errorHandler(error)})
    }
};

exports.signin = async(req, res) => { 
    // { email, password = req.body;
    try {
        await UserModel.findOne({email}, (err, user) => {
            if(err || !user ) {
                return res.status(400).json({Error: "User not found!... please signUp"});
            }
            if(!password){ 
                return res.status(404).json({Error: "Emali and password doesn't match"})
            }  
            // { _id, name, email, phone, role } = user;
            return res.status(200).json({Message: "User Found"})
        })
    } catch (error) {
        res.status(404).json({Error:"error in getting the user"})
    }
};