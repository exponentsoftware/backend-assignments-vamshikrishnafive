const express = require( 'express')

const { signin, signup, login, register, registerUserPerDay, getActiveUser} = require('../controllers/user.js');
const { isNotAuth } = require('../middleware/auth.js');

const router = express.Router();

router.get('/login',login);
router.get('/register', register);
router.get('/UsersPerday', isNotAuth, registerUserPerDay);
router.get('/UsersPerWeek', isNotAuth, getActiveUser);
router.post('/signin', signin);
router.post('/signup', signup);


module.exports = router;