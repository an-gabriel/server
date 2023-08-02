import mongoose from 'mongoose';

const baseSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

const Base = mongoose.model('base', baseSchema);

export default Base;
