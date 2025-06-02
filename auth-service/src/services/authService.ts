import { UserModel } from '../../src/models/user';
import jwt from 'jsonwebtoken';

const registerUser = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  role: string
) => {
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new Error('User already exist');
  }
  const user = new UserModel({ firstName, lastName, username, password, role });
  await user.save();
  return user;
};

const loginUser = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error('User not found!');
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid password!');
  }
  return user;
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const authService = {
  registerUser,
  generateToken,
  loginUser,
};
