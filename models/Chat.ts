import { Document, Schema, Types, model } from 'mongoose';

// Интерфейс для сообщений
export interface IMessage {
    sender: string; // Имя отправителя (пользователь или бот)
    text: string;   // Текст сообщения
    timestamp?: Date; // Временная метка сообщения
}

interface IChat extends Document {
    telegramChatId: Types.ObjectId;
    content: IMessage[];
}

// Схема для сообщений
const MessageSchema = new Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Схема для чата
const ChatSchema = new Schema({
    telegramChatId: { type: Schema.Types.ObjectId, required: true, ref: 'Recipient' },
    content: { type: [MessageSchema], default: [] },
});

// Модель для чата
const Chat = model<IChat>('Chats', ChatSchema);

export default Chat;