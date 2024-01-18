import { Request, Response } from 'express';
import BinModel, { IBin } from '../models/Bin';
import logger from '../utils/logger';
import Promt from '../models/Promt';
import { ObjectId } from 'mongodb';
interface PromtRequestBody {
    text: string;
    id: string;
    value: string
}

interface PromtRequest extends Request {
    body: PromtRequestBody;
    user: {
        userId: string
    }
}

const promtController = {
    create: async (req: PromtRequest, res: Response) => {

        try {
            // Предполагается, что данные передаются в теле запроса
            const { text } = req.body;

            const newPromt = {
                text
            };

            const createdPromt = await Promt.create(newPromt);
            logger.info('Новый промт сохранен!')

            res.status(201).json(createdPromt);
        } catch (error) {
            logger.error('Ошибка при сохранении промта!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при сохранении промта!' });
        }
    },

    getAll: async (req: PromtRequest, res: Response) => {

        try {

            const promts = await Promt.find();

            res.status(200).json({ promts });
            logger.info("промты получены! " + promts )
        } catch (error) {
            logger.error('Ошибка при получении промтов!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении промтов!' });
        }
    },

    edit: async (req: PromtRequest, res: Response) => {

        try {

            const { id, value} = req.body;
            const promts = await Promt.findByIdAndUpdate(new ObjectId(id), {
                $set: {
                    text: value
                }
            });

            res.status(200).json({ promts });
            logger.info("промт обновлен! " + promts)
        } catch (error) {
            logger.error('Ошибка при обновлении промта!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении промта!' });
        }
    },

    delete: async (req: PromtRequest, res: Response) => {

        try {

            const { id } = req.body;
            const promts = await Promt.findByIdAndDelete(new ObjectId(id));

            res.status(200).json({ promts });
            logger.info("промт удален! " + promts)
        } catch (error) {
            logger.error('Ошибка при удалении промта!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при удалении промта!' });
        }
    },
};

export default promtController;
