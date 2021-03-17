import express from 'express';

import UserController from '../controllers/UserController';

const userRoute = (app: express.Express) => {
  const UserCtrl = new UserController;

  app.post('/login', UserCtrl.login);
  app.post('/signup', UserCtrl.signup);
};

export default userRoute;