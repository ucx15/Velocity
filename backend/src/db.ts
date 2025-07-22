import mongoose from 'mongoose';
import env from './utils/env.js';


const connectToDB =  async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connected ✅');
    return true;
  }

  catch (error) {
    console.error('MongoDB connection error ❌:', error);
    process.exit(1);
  }
};

export default connectToDB;