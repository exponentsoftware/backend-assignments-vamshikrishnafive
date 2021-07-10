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

const  {isAdmin, isAuth, isNotAuth} = require('../middleware/auth');
const router = express.Router();

router.get('/todo/admin', isAdmin, adminUser)
router.get('/todo/get/:user_id', isAuth, getAllUserTodo);
router.post('/todo/create/:user_id', isAuth, createUserTodo);
router.get('/todo/list/:user_id', isAuth, sortByDate); // this api take query in url ex: url?order=1| -1
router.get('/todo/search/:user_id', isAuth, searchByTitle); // this api take query in url ex: url?tilte=you
router.get('/todo/categorySearch/:user_id', isAuth, searchByCategory); //not working need to fixed
router.get('/todo/:user_id', isAuth, getSigleTodo);
router.patch('/todo/update/:user_id', isAuth, updateUserTodo);
router.patch('/todo/takComplete/:user_id', isAuth, completedTask);
router.delete('/todo/delete/:user_id', isAuth, deleteUserTodo);

module.exports = router;