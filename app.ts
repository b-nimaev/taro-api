import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import cors from 'cors';
import authenticateToken from './middleware/authenticateToken';
import deeplinkRouter from './routes/deeplinkRouter';
import binRouter from './routes/binRouter';

dotenv.config(); // Загружаем переменные окружения из файла .env

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/deeplink', deeplinkRouter);
app.use('/bin', binRouter);

const port = process.env.PORT || 3000;

// Экспортируем сервер, чтобы иметь возможность управлять им в тестах
export let server;

server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

if (typeof (process.env.test) === 'string' && process.env.test !== 'true') {
  // Подключение к базе данных
  mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log('Подключено к базе данных');
    })
    .catch((error) => {
      console.error('Ошибка при подключении к базе данных:', error);
    });
} 

export default server