import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

interface ICourse {
  id: Types.ObjectId; // Use Mongoose's `Types.ObjectId` here
  title: string;
  description: string;
  url: string;
  completed: boolean;
  completedAssessments: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  courses: ICourse[];
}

const courseSchema = new Schema<ICourse>({
  id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAssessments: {type: Number, default: 0}
});

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [courseSchema],
});

// Password comparison method
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
