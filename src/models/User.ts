import bcrypt from 'bcrypt';

import { model, Schema, Document } from 'mongoose';

export interface User extends Document {
  name?: string
  email: string
  password: string
  avatarUrl?: string
}

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: 'email is required',
    unique: true,
  },
  password: {
    type: String,
    required: 'password is required',
  },
});

UserSchema.pre<User>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  user.password = bcrypt.hashSync(user.password, 10);
  console.log(user.password)
});

export default model<User>('User', UserSchema);