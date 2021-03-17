import express, { Request, Response } from "express";

import MessageModel, { Message } from '../models/Message';

class MessageController {
  getWorkMessage = async (_: Request, res: Response) => {
    try {
      const messages: Array<Message> = await MessageModel.find({}).exec();
      const workMessages = messages.filter(message => message.category === 'work');
      res.json({ data: workMessages, message: 'success' });
    } catch (err) {
      res.status(500).json({ message: 'ошибка получения сообщений' });
    }
  }

  getFloodMessage = async (_: Request, res: Response) => {
    try {
      const messages: Array<Message> = await MessageModel.find({}).exec();
      const floodMessages = messages.filter((message: Message) => message.category === 'flood');
      res.json({ data: floodMessages, message: 'success' });
    } catch (err) {
      res.status(500).json({ message: 'ошибка получения сообщений' });
    }
  }

  createWorkMessage = (req: Request, res: Response) => {
    const { authorId, authorName, value } = req.body;
   
    let category = 'work';

    const newMessage = new MessageModel({ authorId, authorName, value, category });
    newMessage.save()
      .then(mess => {
        res.json({ data: mess, message: 'success' });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ message: 'ошибка добавления сообщения' });
      })
  }

  createFloodMessage = (req: Request, res: Response) => {
    const { authorId, authorName, value } = req.body;

    let category = 'flood';
   
    const newMessage = new MessageModel({ authorId, authorName, value, category });
    newMessage.save()
      .then(mess => {
        res.json({ data: mess, message: 'success' });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ message: 'ошибка добавления сообщения' });
      })
  }


  deleteMessage = (req: Request, res: Response) => {
    const id: string = req.params.id;

    MessageModel.findById(id, (err: any, message: any) => {
      if (err || !message) {
        return res.status(404).json({ message: 'message not found' });
      } else {
        message.remove()
          .then((resolve: any) => {
            res.json({ message: 'success' });
          })
          .catch((e: any) => {
            console.log(e);
            res.status(500).json({ message: 'ошибка удаления сообщения' });
          })
      }
    });
  }
};

export default MessageController;