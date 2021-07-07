const express = require( 'express')

const { signin, signup, login, register} = require('../controllers/user.js');
const { isNotAuth } = require('../middleware/auth.js');

const router = express.Router();

router.get('/login', isNotAuth,login)
router.get('/register', isNotAuth, register)
router.post('/signin', isNotAuth, signin);
router.post('/signup', isNotAuth, signup);


module.exports = router;