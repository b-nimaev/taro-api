// binRouter.ts
import express from 'express';
import binController from '../controllers/binController';
import authenticateToken from '../middleware/authenticateToken';

const binRouter = express.Router();

binRouter.use(authenticateToken)

binRouter.post('/', binController.init);
binRouter.get('/', binController.getData);
binRouter.put('/updateOpenaiToken', binController.updateOpenaiToken);
binRouter.put('/updateTelegramData', binController.updateTelegramData);
binRouter.put('/updatePriceData', binController.updatePriceData);
binRouter.put('/updateGreetingMessage', binController.updateGreetingMessage);
binRouter.put('/updateActionMessage', binController.updateActionMessage);

export default binRouter;
