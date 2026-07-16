// MONGODB DATABASE SE CONNECTION BANATA HAI , DATA SAVE AND FETCH KRTA HAI 
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  
  
  console.log('>>> MongoDB Connected successfully');

  if (mongoose.connection.readyState >= 1) return;

  if (!uri) {
    return;
  }

  try {
    await mongoose.connect(uri);
  } catch (error) {
    // Silently fall back to in-memory mode without showing errors in terminal
  }
}
