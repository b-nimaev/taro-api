// deeplinkRouter.ts
import express from 'express';
import deeplinkController from '../controllers/deeplinkController';
import authenticateToken from '../middleware/authenticateToken';

const deeplinkRouter = express.Router();

deeplinkRouter.use(authenticateToken)

// Регистрация новой ссылки
deeplinkRouter.post('/create', deeplinkController.create);
deeplinkRouter.get('/', deeplinkController.getAllDeeplinks);

export default deeplinkRouter;
