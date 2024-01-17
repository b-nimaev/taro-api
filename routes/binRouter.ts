// binRouter.ts
import express from 'express';
import binController from '../controllers/binController';
import authenticateToken from '../middleware/authenticateToken';

const binRouter = express.Router();

binRouter.use(authenticateToken)

binRouter.post('/', binController.init);
binRouter.get('/', binController.getData);

export default binRouter;
