// telegramRouter.ts
import express from 'express';
import telegramController from '../controllers/telegramController';
import authenticateToken from '../middleware/authenticateToken';

const telegramRouter = express.Router();

telegramRouter.use(authenticateToken)

telegramRouter.post('/create', telegramController.create);
telegramRouter.get('/:telegramChatId', telegramController.getUserByTelegramId);
telegramRouter.post('/question', telegramController.question);

export default telegramRouter;
