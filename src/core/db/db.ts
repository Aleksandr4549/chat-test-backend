import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || ' ';

console.log(uri)

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

export { db, mongoose };