import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/User';
import logger from '../utils/logger';
import Token from '../models/Token';
import Referral from '../models/Referral';
import { ObjectId } from 'mongodb';

interface DeeplinkRequestBody {
    name: string;
    deeplink: string;
}

interface DeeplinkRequest extends Request {
    body: DeeplinkRequestBody;
    user: {
        userId: string
    }
}

const deeplinkController = {
    create: async (req: DeeplinkRequest, res: Response) => {
        try {

            const userId = req.user.userId

            await new Referral({
                referringUserId: new ObjectId(userId),
                name: req.body.name,
                value: req.body.deeplink
            }).save()

            return res.status(200).json({ message: 'Реферальная ссылка успешно добавлена!' })

        } catch (error) {
            console.error(error)
            logger.error(`Ошибка при создании реферальной ссылки, тело запроса: ${req.body}`)
            res.status(500).json({ message: `Ошибка при создании реферальной ссылки, тело запроса` })
        }
    },
    
    getAllDeeplinks: async (req: DeeplinkRequest, res: Response) => {
        try {

            const deeplinks = await Referral.find({})
            return res.status(200).json({ list: deeplinks })

        } catch (error) {
            console.error(error)
            logger.error(`Ошибка при получении реферальных ссылок, ${error}`)
            res.status(500).json({ message: `Ошибка при получении реферальных ссылок` })
        }
    }
};

export default deeplinkController;
