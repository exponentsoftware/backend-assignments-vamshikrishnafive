exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
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

exports.isAdmin = async (req, res, next) => {
    if (req.user.roles == 0) {
        return next();
    }
    res.status(401).json({ error: 'Admin resourse' })
}
