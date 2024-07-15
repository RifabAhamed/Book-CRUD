import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const colorSchema = new Schema({
  name: { type: String, required: true },
  hexCode: { type: String, required: true }
});

const Color = model('Color', colorSchema);

export default Color;