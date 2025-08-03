import path from 'path';

import dotenv from 'dotenv';
dotenv.config({quiet: true});

const env = {
  MUSIC_DIR : process.env.MUSIC_DIR || path.join(__dirname, '../music'),
  MONGO_URI : process.env.MONGO_URI || 'mongodb://localhost:27017/velocity-music',
  PORT      : process.env.PORT      || 5000,
  LOAD_DATA : process.env.LOAD_DATA === 'true',
};

export default env;
