// promtRouter.ts
import express from 'express';
import promtController from '../controllers/promtController';
import authenticateToken from '../middleware/authenticateToken';

const promtRouter = express.Router();

promtRouter.use(authenticateToken)

promtRouter.post('/create', promtController.create);
promtRouter.get('/', promtController.getAll);

export default promtRouter;
