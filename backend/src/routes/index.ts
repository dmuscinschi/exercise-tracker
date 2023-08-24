import { ENDPOINTS_TYPE } from '../types';
import express from 'express';

import * as userController from '../controllers/userController';

const router = express.Router();

router.get(ENDPOINTS_TYPE.API_USERS, userController.usersList);

router.post(ENDPOINTS_TYPE.API_USER, userController.user_create_post);

router.get(ENDPOINTS_TYPE.API_USERS_BY_ID, userController.user_get);

router.post(ENDPOINTS_TYPE.API_CREATE_EXERCISES, userController.user_exercises_post);

router.get(ENDPOINTS_TYPE.API_USERS_LOGS, userController.user_logs_get);

export default router;
