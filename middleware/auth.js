// export const isAdmin = (req, res, next) => {
//     if(req.user.role === 0) {
//         return res.status(403).json({Error: "Admin resourse!...."});
//     }
//     next();
// }

exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/login')
}

exports.isNotAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/api/todo/admin')
    }
    next();
}