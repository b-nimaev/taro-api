import { Document, Schema, model, Types } from 'mongoose';

interface IPromt extends Document {
    text: String;
    createdAt: Date;
    updatedAt: Date;
}

const PromtSchema = new Schema({
    text: { type: String, default: '' },
}, {
    timestamps: true
});

const Promt = model<IPromt>('Promt', PromtSchema);

export default Promt;
