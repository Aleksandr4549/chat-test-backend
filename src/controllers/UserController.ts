import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import UserModel, { User } from '../models/User';

class UserController {
  signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const isSuchUser = await UserModel.findOne({ email });

    console.log(password)

    if (isSuchUser) {
      return res.status(400).send({ message: 'такой email уже используется' });
    } else {
      const user = new UserModel({name, email, password});
      user.save()
        .then((newUser: User) => {
          res.json({ data: newUser, message: 'success' });
        })
        .catch((e) => {
          console.log(e);
          res.status(500).json({ message: 'ошибка регистрации' });
        }) 
    }
  }

  login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    UserModel.findOne({ email }, (err: any, user: User) => {
      if (err || !user) {
        return res.status(401).json({
          message: 'Неверный логин или пароль',
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ message: 'Неверный логин или пароль' });
      } else {
        res.json({
          data: user,
          message: 'success',
        });
      }
    });
  }
};

export default UserController;