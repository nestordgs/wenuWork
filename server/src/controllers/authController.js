import userModel from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { type } from 'os';

dotenv.config()

const jwtSignUser = (user) => {
  const oneWeek = 60 * 60 * 24 * 7
  return jwt.sign(user, process.env.MY_SECRET, {
    expiresIn: oneWeek
  })
}
class AuthController {

  async register (req, res) {
    try {
      const { email, password, name } = req.body;

      const user = await userModel.findOne({ email });
      if (user) {
        const error = 'Email already exists.';
        return res.status(400).json(error);
      }

      const newUser = new userModel({
        name,
        email,
        password,
      });

      const saved = await newUser.save();

      res.send(saved);
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  };

  async login (req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        const errors = {
          message: 'Email does not exists.'
        };
        return res.status(403).send(errors);
      }

      if (!password) {
        return res.status(403).send({
          message: 'Password is invalid.',
        });
      }

      const isInvalidPassword = await user.comparePassword(password);
      if (!isInvalidPassword) {
        const errors = {
          message: 'Password is invalid.',
        };
        return res.status(403).send(errors);
      }
      user.password = undefined;
      const userJson = user.toJSON();

      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  };

  async users(req, res) {
    try {
      const users = await userModel.find();

      return res.status(200).send(users);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
};


export default new AuthController();
