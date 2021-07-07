const express = require( 'express')

const { signin, signup, login, register} = require('../controllers/user.js');
const { isAuth } = require('../middleware/auth.js');

const router = express.Router();

router.get('/login', login)
router.get('/register', register)
router.post('/signin', isAuth ,signin);
router.post('/signup', isAuth ,signup);


module.exports = router;