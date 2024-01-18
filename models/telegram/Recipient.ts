import { Document, Schema, Types, model } from 'mongoose';

interface Recipient extends Document {
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthdate?: Date;
  avatar?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  role?: string;
  isActive?: boolean;
  gender?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    // и так далее...
  };
  
  freeSpin?: number;
  
  subscribe: false;

  telegramUsername?: string;
  telegramChatId?: number;

  reports?: Types.ObjectId[];
  referrals?: Types.ObjectId[];

  rating: number,

  lastActivity?: Date;
  activeSockets?: string[]; // Идентификаторы активных сокетов

  createdAt: Date;
  updatedAt: Date;
}

const RecipientSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  birthdate: { type: Date },
  avatar: { type: String },
  phoneNumber: { type: String },
  rating: { type: Number, default: 100 },
  freeSpin: { type: Number, default: 3 },
  subscribe: { type: Boolean, default: false },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  role: { type: String, default: 'recipient' },

  isActive: { type: Boolean, default: false },
  lastActivity: { type: Date },
  activeSockets: [{ type: String }], // Идентификаторы активных сокетов

  gender: { type: String, enum: ['male', 'female', 'other'] },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    // и так далее...
  },
  telegramUsername: { type: String },
  telegramChatId: { type: Number, required: true, unique: true },
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
  referrals: [{ type: Schema.Types.ObjectId, ref: 'Referral' }],
}, {
    timestamps: true
});

const Recipient = model<Recipient>('Recipient', RecipientSchema);

export default Recipient;
