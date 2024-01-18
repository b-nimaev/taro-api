import { Document, Schema, model, Types } from 'mongoose';

interface IPayment extends Document {
    id: String;
    url: String;
    telegramChatId: Types.ObjectId;
    value: String;
}

const PaymentSchema = new Schema({
    telegramChatId: { type: Schema.Types.ObjectId, required: true, ref: 'Recipient' },
    id: { type: String, required: true },
    url: { type: String, required: true },
}, {
    timestamps: true
});

const Payment = model<IPayment>('Payment', PaymentSchema);

export default Payment;
