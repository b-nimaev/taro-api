// telegramRouter.ts
import express from 'express';
import telegramController from '../controllers/telegramController';
import authenticateToken from '../middleware/authenticateToken';

const telegramRouter = express.Router();

telegramRouter.use(authenticateToken)

telegramRouter.post('/create', telegramController.create);
telegramRouter.get('/all-recipients', telegramController.getRecipients);
telegramRouter.get('/:telegramChatId', telegramController.getUserByTelegramId);
telegramRouter.post('/question', telegramController.question);
telegramRouter.post('/new-payment', telegramController.createPaymentOrder);
telegramRouter.post('/update-subscribe', telegramController.updateSubscribe);
telegramRouter.get('/dialog/:telegramChatId', telegramController.getDialog)

export default telegramRouter;
