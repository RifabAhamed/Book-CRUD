import mongoose from 'mongoose'; 
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    bookName: { 
      type: String,
      required: true,
      index: true
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Book = model('Book', bookSchema);

export default Book;
