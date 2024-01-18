import { Document, Schema, model, Types } from 'mongoose';

export interface IBin extends Document {
    price: number;
    priceTest: number;
    openaiToken: string;
    telegramToken: string;
    telegramBotLink: string;
    telegramChannelLink: string;
    greeting: string;
    action: string;
}

const BinSchema = new Schema({
    price: { type: Number, default: 0 },
    priceTest: { type: Number, default: 0 },
    openaiToken: { type: String, default: '' },
    telegramToken: { type: String, default: '' },
    telegramBotLink: { type: String, default: '' },
    telegramChannelLink: { type: String, default: '' },
    
    greeting: { type: String, default: '' },
    action: { type: String, default: '' }
});

const BinModel = model<IBin>('settings', BinSchema);

export default BinModel;