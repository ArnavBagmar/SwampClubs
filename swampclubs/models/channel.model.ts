//models/channel.model.ts
import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  description: { type: String },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.models.Channel || mongoose.model('Channel', channelSchema);