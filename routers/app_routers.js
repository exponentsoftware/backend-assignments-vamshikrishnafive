import express from 'express'

import { completedTask, createUserTask, DeleteUserTask, FetchAllUserTask, FetchUserTaskById, searchByCategory, searchByTitle, sortByDate, updateUserTask } from '../controllers/app_controller';

const router = express.Router();

router.get('/', FetchAllUserTask);
router.get('/sortByDate', sortByDate);
router.get('/search', searchByTitle);
router.get('/categorySearch', searchByCategory);
router.post('/', createUserTask);

router.get('/:id', FetchUserTaskById);
router.patch('/update/:id', updateUserTask);
router.patch('/takComplete/:id', completedTask);
router.delete('/delete/:id', DeleteUserTask);

export default router;