import { model, Schema, Document } from 'mongoose';

export interface Message extends Document {
  authorId: string
  authorName: string
  value: string
  category: 'work' | 'flood'
}

const messageSchema = new Schema({
  authorId: {
    type: String,
    required: 'authorId is required',
  },
  authorName: {
    type: String,
    required: 'authorName is required',
  },
  value: {
    type: String,
    required: 'value is required',
  },
  category: {
    type: String,
  }
});

export default model<Message>('Message', messageSchema);