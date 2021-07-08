const express = require('express')

const { adminUser,
        getAllUserTodo,
        createUserTodo,
        sortByDate,
        searchByTitle,
        searchByCategory,
        getSigleTodo,
        updateUserTodo,
        completedTask,
        deleteUserTodo } = require('../controllers/task');

// const  } = require('../middleware/auth');
const router = express.Router();

router.get('/todo/admin', adminUser)
router.get('/todo/get/:user_id', getAllUserTodo);
router.post('/todo/create/:user_id', createUserTodo);
router.get('/todo/list/:user_id', sortByDate); // this api take query in url ex: url?order=1| -1
router.get('/todo/search/:user_id', searchByTitle); // this api take query in url ex: url?tilte=you
router.get('/todo/categorySearch/:user_id', searchByCategory); //not working need to fixed
router.get('/todo/:user_id', getSigleTodo);
router.patch('/todo/update/:user_id', updateUserTodo);
router.patch('/todo/takComplete/:user_id', completedTask);
router.delete('/todo/delete/:user_id', deleteUserTodo);

module.exports = router;