import mongoose from 'mongoose';

const weaponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mod: { type: Number, required: true },
  attr: { type: String, required: true },
  equipped: { type: Boolean, default: false },
});

const attributesSchema = new mongoose.Schema({
  strength: { type: Number, default: 0 },
  dexterity: { type: Number, default: 0 },
  constitution: { type: Number, default: 0 },
  intelligence: { type: Number, default: 0 },
  wisdom: { type: Number, default: 0 },
  charisma: { type: Number, default: 0 },
});

const KnightSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    birthday: { type: Date, required: true },
    weapons: { type: [weaponSchema], default: [] },
    attributes: { type: attributesSchema, default: {} },
    keyAttribute: { type: String, default: 'strength' },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Knights = mongoose.model('knights', KnightSchema);

export default Knights;
