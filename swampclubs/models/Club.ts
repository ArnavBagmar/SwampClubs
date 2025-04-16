import mongoose from 'mongoose';

export interface IClub extends mongoose.Document {
  id: number;
  name: string;
  category: string;
  members: number;
  description: string;
}

const ClubSchema = new mongoose.Schema<IClub>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Academic', 'Cultural', 'Social'],
    },
    members: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Club || mongoose.model<IClub>('Club', ClubSchema);