// bin.test.ts
import request from 'supertest';
import app from '../app'; // Предполагаем, что ваш файл app.ts находится в корне проекта

// setup.ts
import User from '../models/User';
import BinModel from '../models/Bin';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Загружаем переменные окружения из файла .env

describe('Bin Tests', () => {

    // Перед каждым тестом, давайте очищать данные в базе данных
    beforeAll(async () => {

        await mongoose.connect(process.env.DB_CONNECTION_STRING)
            .then(() => {
                console.log('Подключено к базе данных');
            })
            .catch((error) => {
                console.error('Ошибка при подключении к базе данных:', error);
            });
    });

    afterAll(async () => {
        await mongoose.disconnect()
    });

    beforeEach(async () => {
        // Удаление всех документов из коллекции Bin перед каждым тестом
        await BinModel.deleteMany({});
    });

    it('should create a new bin with valid data', async () => {

        const userData = {
            email: 'alexandrbnimaev@gmail.com',
            password: 'adminadmin',
        };

        // Аутентификация пользователя
        const auth = await request(app)
            .post('/auth/login')
            .send(userData);

        expect(auth.status).toBe(200);
        expect(auth.body).toHaveProperty('token');
        expect(auth.body).toHaveProperty('userId');

        const binData = {
            price: 100,
            priceTest: 50,
            openaiToken: 'your_openai_token',
            telegramToken: 'your_telegram_token',
            telegramBotLink: 'your_telegram_bot_link',
            telegramChannelLink: 'your_telegram_channel_link',
        };

        // Отправляем POST-запрос для создания нового bin
        const response = await request(app)
            .post('/bin')
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send(binData);

        // Проверяем успешный ответ сервера
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.price).toBe(binData.price);
        expect(response.body.priceTest).toBe(binData.priceTest);
        expect(response.body.openaiToken).toBe(binData.openaiToken);
        expect(response.body.telegramToken).toBe(binData.telegramToken);
        expect(response.body.telegramBotLink).toBe(binData.telegramBotLink);
        expect(response.body.telegramChannelLink).toBe(binData.telegramChannelLink);
    });

    it('should get data from Bin', async () => {
        const userData = {
            email: 'alexandrbnimaev@gmail.com',
            password: 'adminadmin',
        };

        // Аутентификация пользователя
        const auth = await request(app)
            .post('/auth/login')
            .send(userData);

        expect(auth.status).toBe(200);
        expect(auth.body).toHaveProperty('token');
        expect(auth.body).toHaveProperty('userId');

        const binData = {
            price: 100,
            priceTest: 50,
            openaiToken: 'your_openai_token',
            telegramToken: 'your_telegram_token',
            telegramBotLink: 'your_telegram_bot_link',
            telegramChannelLink: 'your_telegram_channel_link',
        };

        // Отправляем POST-запрос для создания нового bin
        const responseCreate = await request(app)
            .post('/bin')
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send(binData);

        expect(responseCreate.status).toBe(201);
        expect(responseCreate.body).toHaveProperty('_id');

        // Отправляем GET-запрос для получения данных из Bin
        const responseGet = await request(app)
            .get('/bin')
            .set('Authorization', `Bearer ${auth.body.token}`);

        // Проверяем успешный ответ сервера
        expect(responseGet.status).toBe(200);
        expect(responseGet.body.length).toBeGreaterThanOrEqual(1); // Проверяем, что возвращается хотя бы одна запись

        const bin = responseGet.body[0];
        expect(bin).toHaveProperty('_id');
        expect(bin.price).toBe(binData.price);
        expect(bin.priceTest).toBe(binData.priceTest);
        expect(bin.openaiToken).toBe(binData.openaiToken);
        expect(bin.telegramToken).toBe(binData.telegramToken);
        expect(bin.telegramBotLink).toBe(binData.telegramBotLink);
        expect(bin.telegramChannelLink).toBe(binData.telegramChannelLink);
    });

});
