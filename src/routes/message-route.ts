import express from 'express';

import MessageController from '../controllers/MessageController';

const messageRoute = (app: express.Express) => {
  const MessageCtrl = new MessageController;

  app.get('/work', MessageCtrl.getWorkMessage);
  app.post('/work', MessageCtrl.createWorkMessage);

  app.get('/flood', MessageCtrl.getFloodMessage);
  app.post('/flood', MessageCtrl.createFloodMessage);
  
  app.delete('/messages/:id', MessageCtrl.deleteMessage);
};

export default messageRoute;