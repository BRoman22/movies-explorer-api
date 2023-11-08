import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
    },
    director: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
    },
    duration: {
      type: Number,
      required: { value: true, message: 'Поле является обязательным' },
    },
    year: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
    },
    description: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
    },
    image: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: { value: true, message: 'Поле является обязательным' },
    },
    movieId: {
      type: Number,
      required: { value: true, message: 'Поле является обязательным' },
    },
    nameRU: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
    },
    nameEN: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model('movie', movieSchema);
