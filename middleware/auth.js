const UserTaskModel = require("../models/task");

exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/login')
}

// exports.isNotAuth = (req, res, next) => {
//     if(req.isAuthenticated()) {
//         return res.redirect('/api/todo/admin')
//     }
//     next();
// }

exports.isAdmin = async (req, res, next) => {
    email = req.user.email
    requser = await UserTaskModel.find({email})
    if(req.user.role === requser.role){
        return next();
    }
    res.status(401).json({error: 'Admin resourse'})
}
