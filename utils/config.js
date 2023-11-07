import 'dotenv/config';

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/testDiplom',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';

export { PORT, MONGO_URL, secretKey };
