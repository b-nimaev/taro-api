import { Document, Schema, model, Types } from 'mongoose';

interface IReferral extends Document {
  referringUserId: Types.ObjectId;
  referredUserId: Types.ObjectId[];
  name: String;
  value: String;
}

const ReferralSchema = new Schema({
  referringUserId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  referredUserId: { type: [ Schema.Types.ObjectId ], default: [] },
  name: { type: String, required: true },
  value: { type: String, required: true },
}, {
  timestamps: true
});

const Referral = model<IReferral>('Referral', ReferralSchema);

export default Referral;
