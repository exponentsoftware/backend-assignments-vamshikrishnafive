import express from 'express'

import { createUserTask, DeleteUserTask, FetchAllUserTask, FetchUserTaskById, updateUserTask } from '../controllers/app_controller';

const router = express.Router();

router.get('/', FetchAllUserTask);

router.get('/:id', FetchUserTaskById);

router.post('/', createUserTask);

router.patch('/update/:id', updateUserTask);

router.delete('/delete/:id', DeleteUserTask);

export default router;