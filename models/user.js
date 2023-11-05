import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import Unauthorized from '../errors/Unauthorized.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    email: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Некорректный Email',
      },
    },
    password: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Unauthorized('Неправильные почта или пароль');
        }
        return user;
      });
    });
};

export default mongoose.model('user', userSchema);
