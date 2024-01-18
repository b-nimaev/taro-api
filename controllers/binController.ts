import { Request, Response } from 'express';
import BinModel, { IBin } from '../models/Bin';
import logger from '../utils/logger';
interface BinRequestBody {
    name: string;
    deeplink: string;
    openaiToken: string;
    telegramToken: string;
    telegramBotLink: string;
    telegramChannelLink: string;
    price: number;
    priceTest: number;
    greeting: string;
    action: string
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

    updateOpenaiToken: async (req: BinRequest, res: Response) => {
        try {
            const { openaiToken } = req.body;

            const document = await BinModel.findOne()

            // Находим и обновляем документ по userId
            const updatedBin = await BinModel.findOneAndUpdate(
                { _id: document._id },
                { openaiToken },
                { new: true } // Возвращаем обновленный документ
            );

            if (!updatedBin) {
                return res.status(404).json({ message: 'Bin не найден' });
            }

            logger.info('Токен обновлен успешно!');
            res.status(200).json(updatedBin);
        } catch (error) {
            logger.error('Ошибка при обновлении токена!');
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении токена!' });
        }
    },

    updateTelegramData: async (req: BinRequest, res: Response) => {
        try {
            const { telegramToken, telegramBotLink, telegramChannelLink } = req.body;
            const { userId } = req.user;

            const document = await BinModel.findOne()

            // Находим и обновляем документ по userId
            const updatedBin = await BinModel.findOneAndUpdate(
                { _id: document._id },
                { telegramToken, telegramBotLink, telegramChannelLink },
                { new: true } // Возвращаем обновленный документ
            );

            if (!updatedBin) {
                return res.status(404).json({ message: 'Bin не найден' });
            }

            logger.info('Данные Telegram обновлены успешно!');
            res.status(200).json(updatedBin);
        } catch (error) {
            logger.error('Ошибка при обновлении данных Telegram!');
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении данных Telegram!' });
        }
    },

    updatePriceData: async (req: BinRequest, res: Response) => {
        try {
            const { price, priceTest } = req.body;
            const { userId } = req.user;

            const document = await BinModel.findOne()

            // Находим и обновляем документ по userId
            const updatedBin = await BinModel.findOneAndUpdate(
                { _id: document._id },
                { price, priceTest },
                { new: true } // Возвращаем обновленный документ
            );

            if (!updatedBin) {
                return res.status(404).json({ message: 'Bin не найден' });
            }

            logger.info('Данные о цене обновлены успешно!');
            res.status(200).json(updatedBin);
        } catch (error) {
            logger.error('Ошибка при обновлении данных о цене!');
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении данных о цене!' });
        }
    },

    updateGreetingMessage: async (req: BinRequest, res: Response) => {
        try {
            const { greeting } = req.body;
            const { userId } = req.user;

            const document = await BinModel.findOne()

            // Находим и обновляем документ по userId
            const updatedBin = await BinModel.findOneAndUpdate(
                { _id: document._id },
                { greeting },
                { new: true } // Возвращаем обновленный документ
            );

            if (!updatedBin) {
                return res.status(404).json({ message: 'Bin не найден' });
            }

            logger.info('Приветственное сообщение обновлено успешно!');
            res.status(200).json(updatedBin);
        } catch (error) {
            logger.error('Ошибка при обновлении приветственного сообщения!');
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении приветственного сообщения!' });
        }
    },

    updateActionMessage: async (req: BinRequest, res: Response) => {
        try {
            const { action } = req.body;

            const document = await BinModel.findOne()

            // Находим и обновляем документ по userId
            const updatedBin = await BinModel.findOneAndUpdate(
                { _id: document._id },
                { action },
                { new: true } // Возвращаем обновленный документ
            );

            if (!updatedBin) {
                return res.status(404).json({ message: 'Bin не найден' });
            }

            logger.info('Сообщение призыва к действию обновлено успешно!');
            res.status(200).json(updatedBin);
        } catch (error) {
            logger.error('Ошибка при обновлении сообщения призыва к действию!');
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении сообщения призыва к действию!' });
        }
    },
};

export default binController;
