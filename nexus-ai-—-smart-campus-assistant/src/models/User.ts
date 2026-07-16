//USER KA DATASTRUCTURE DEFINE KRTA HAI ,MONGODB MAI KESE DATA STORE HOGA WO DEFINE KRTA HAI
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  major: string;
  role: string;
  year: string;
  interests: string[];
  bio?: string;
  createdAt: Date;
}

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  major: { type: String, default: 'Undecided' },
  role: { type: String, default: 'Student' },
  year: { type: String, default: '1st' },
  interests: [{ type: String }],
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
