import mongoose from 'mongoose';
import { PORT, MONGO_URL } from './utils/config.js';
import app from './app.js';

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT);
    console.log('');
    console.log(`Server listening on port ${PORT}`);
  })
  .catch(() => console.log('Mongo don`t connect'));
