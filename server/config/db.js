import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';

dotenv.config();

const dbAddress = process.env.DB_HOST || '127.0.0.1';
const portDb = process.env.PORT_DB || 27017;
const dbName = process.env.DBNAME;
const db = `mongodb://${dbAddress}:${portDb}/${dbName}`;

mongoose.Promise = bluebird;

mongoose.connect(
  db,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

const connection = mongoose.connection;

connection.on(
  'erro',
  console.error.bind(console, 'connection error:'
));

connection.once('open', () => {
  console.log('Great success');
});
