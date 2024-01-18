import { Request, Response } from 'express';
import BinModel, { IBin } from '../models/Bin';
import logger from '../utils/logger';
import Recipient from '../models/telegram/Recipient';
import OpenAI from 'openai';
import Promt from '../models/Promt';
import Chat, { IMessage } from '../models/Chat';
interface TelegramRequestBody {
    telegramChatId: number;
}

interface TelegramRequest extends Request {
    body: TelegramRequestBody;
    user: {
        userId: string
    }
}

const telegramController = {
    create: async (req: TelegramRequest, res: Response) => {

        try {
            // Предполагается, что данные передаются в теле запроса
            const { telegramChatId } = req.body;

            const newUser = {
                telegramChatId
            };
            console.log(telegramChatId)
            const createdUser = await Recipient.create({
                telegramChatId: telegramChatId
            });
            await Chat.create({
                telegramChatId: createdUser._id
            });
            logger.info('Новый пользователь телеграмм сохранен!')

            res.status(201).json(createdUser);
        } catch (error) {
            logger.error('Ошибка при сохранении пользователя телеграмм!')
            console.error(error);
            res.status(500).json({ message: 'Ошибка при сохранении пользователя телеграмм!' });
        }
    },
    getUserByTelegramId: async (req: Request, res: Response) => {
        try {
            const { telegramChatId } = req.params;

            // Ваш код для поиска пользователя по идентификатору Telegram
            // Например, используя ваш сервис или базу данных

            const user = await Recipient.findOne({
                telegramChatId: parseFloat(telegramChatId)
            });
            console.log(user)
            if (user) {
                return res.json({ user: user });
            } else {
                return res.json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    question: async (req: Request, res: Response) => {
        try {

            const { question, telegramChatId } = req.body
            function getRandomTarotCards() {
                var tarotCards = [
                    "Шут",
                    "Маг",
                    "Жрица",
                    "Императрица",
                    "Император",
                    "Жрец",
                    "Влюбленные",
                    "Колесница",
                    "Сила",
                    "Отшельник",
                    "Фортуна",
                    "Справедливость",
                    "Повешенный",
                    "Смерть",
                    "Умеренность",
                    "Дьявол",
                    "Башня",
                    "Звезда",
                    "Луна",
                    "Солнце",
                    "Суд",
                    "Мир"
                ];

                var selectedCards = [];
                var numberOfCardsToSelect = 3;

                // Пока не выбрано нужное количество карт
                while (selectedCards.length < numberOfCardsToSelect) {
                    // Генерируем случайный индекс
                    var randomIndex = Math.floor(Math.random() * tarotCards.length);

                    // Получаем карту по случайному индексу
                    var randomCard = tarotCards[randomIndex];

                    // Проверяем, что данная карта еще не выбрана
                    if (!selectedCards.includes(randomCard)) {
                        // Добавляем выбранную карту в массив выбранных карт
                        selectedCards.push(randomCard);
                    }
                }

                return selectedCards;
            }

            // Вызываем функцию и выводим результат
            var randomSelectedCards = getRandomTarotCards();
            console.log("Случайные карты:", randomSelectedCards);
            const prompts = await Promt.find(); // Assuming your model is named 'Prompt'
            let instructions = [];
            let promts: string = `Вот промты, которым тебе надо следовать!: `
            // Проходим по всем промптам
            for (let i = 0; i < prompts.length; i++) {
                // Проверяем, есть ли в тексте промпта переменные {cart1}, {cart2}, {cart3}
                if (prompts[i].text.includes("{cart1}") || prompts[i].text.includes("{cart2}") || prompts[i].text.includes("{cart3}")) {
                    // Заменяем переменные на значения трех случайных карт
                    let replacedText = prompts[i].text
                        .replace(/\{cart1\}/, randomSelectedCards[0])
                        .replace(/\{cart2\}/, randomSelectedCards[1])
                        .replace(/\{cart3\}/, randomSelectedCards[2]);

                    // Добавляем замененный текст к строке promts
                    promts += replacedText;
                } else if (prompts[i].text.includes("{question}")) {
                    // Заменяем переменную {question}, если она есть в тексте промпта
                    promts += prompts[i].text.replace(/\{question\}/, question);
                } else {
                    // Если в тексте промпта нет переменных, добавляем его как есть
                    promts += ` ${prompts[i].text}`;
                }
            }

            console.log(promts)
            promts += `; конец промтов.`
            instructions.push({ role: 'user', content: promts });
            
            const openai = new OpenAI({ apiKey: process.env.apikey, });
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                temperature: 0.3,
                messages: instructions,
            });

            console.log(response.choices[0].message.content);
        
            const recipient = await Recipient.findOne({ telegramChatId });

            if (recipient) {
                recipient.freeSpin = Math.max(0, recipient.freeSpin - 1); // Ensure the value is non-negative
                await recipient.save();
                console.log(`Successfully decremented freeSpin for user with telegramChatId ${telegramChatId}`);
            } else {
                console.log(`User with telegramChatId ${telegramChatId} not found`);
            }

            const message: IMessage = {
                sender: 'Пользователь',
                text: question,
            }

            await Chat.findOneAndUpdate({
                telegramChatId: recipient._id
            }, {
                $push: {
                    content: message
                }
            })
            await Chat.findOneAndUpdate({
                telegramChatId: recipient._id
            }, {
                $push: {
                    content: {
                        sender: 'Бот',
                        text: response.choices[0].message.content
                    }
                }
            })

            // Now you can handle the response as needed, for example, send it back in your API response.
            return res.status(200).json({ answer: response.choices[0].message.content });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default telegramController;
