const express = require('express');
const { likes, rating } = require('../controllers/taskInfo');
const { isNotAuth } = require('../middleware/auth');
const router = express.Router();

router.patch('/todo/:id/like', isNotAuth, likes);
router.patch('/todo/:id/rating', isNotAuth, rating);

module.exports = router;