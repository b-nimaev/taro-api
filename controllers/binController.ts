import { Request, Response } from 'express';
import BinModel, { IBin } from '../models/Bin';
import logger from '../utils/logger';
interface BinRequestBody {
    name: string;
    deeplink: string;
}

interface BinRequest extends Request {
    body: BinRequestBody;
    user: {
        userId: string
    }
}

const binController = {
    init: async (req: Request, res: Response) => {

        console.log(req)

        try {
            // Предполагается, что данные передаются в теле запроса
            const { price, priceTest, openaiToken, telegramToken, telegramBotLink, telegramChannelLink } = req.body;

            // Создаем новую запись в модели Bin
            const newBin = {
                price,
                priceTest,
                openaiToken,
                telegramToken,
                telegramBotLink,
                telegramChannelLink,
            };

            const createdBin = await BinModel.create(newBin);
            logger.info('Новые данные сохранены!')

            res.status(201).json(createdBin);
        } catch (error) {
            logger.error('Ошибка при сохранении данных!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при сохранении данных!' });
        }
    },

    getData: async (req: Request, res: Response) => {
        try {

            const Bin = await BinModel.find({});
            logger.info('Данные получены!')

            res.status(200).json(Bin);
        } catch (error) {
            logger.error('Ошибка при получении данных!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении данных!' });
        }
    },
};

export default binController;
